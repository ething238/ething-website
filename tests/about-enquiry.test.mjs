import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import vm from 'node:vm'

const source = readFileSync(new URL('../src/lib/aboutEnquiry.js', import.meta.url), 'utf8')
  .replace("import { sendWeb3FormsEmail } from './web3forms.js'", '')
  .replace("import { trackEvent } from './tracking.js'", '')
  .replace('export async function submitAboutEnquiry', 'async function submitAboutEnquiry')
  + '\nmodule.exports = submitAboutEnquiry'
const lead = { name:'Test Visitor', email:'visitor@example.invalid', phone:'+1 202 555 0100', company:'Example Company', hiringNeed:'Software Engineering', attribution:{utm_source:'test',gclid:'example-click'} }
function fixture(result = {ok:true}, throws = false) {
  const emails=[],events=[],module={exports:{}}
  vm.runInNewContext(source,{module,sendWeb3FormsEmail:async payload=>{emails.push(payload);if(throws)throw new Error('private service details');return result},trackEvent:(name,params)=>events.push({name,params})})
  return {emails,events,submit:module.exports}
}
test('all five required fields and valid email are checked before delivery', async()=>{
  const f=fixture()
  for(const key of ['name','email','phone','company','hiringNeed'])assert.equal((await f.submit({...lead,[key]:' '})).ok,false)
  assert.equal((await f.submit({...lead,email:'invalid'})).ok,false)
  assert.equal(f.emails.length,0)
})
test('email contains all form details, source page and campaign attribution',async()=>{
  const f=fixture();assert.equal((await f.submit(lead)).ok,true)
  assert.equal(f.emails.length,1)
  assert.equal(f.emails[0].email,lead.email)
  for(const value of [lead.name,lead.email,lead.phone,lead.company,lead.hiringNeed,'/about_us','utm_source: test','gclid: example-click'])assert.ok(f.emails[0].message.includes(value))
})
test('successful delivery fires one success and one lead conversion without personal details',async()=>{
  const f=fixture();await f.submit(lead)
  assert.equal(f.events.map(x=>x.name).join(','),'lead_form_submit,lead_form_success,generate_lead')
  for(const event of f.events){assert.equal(event.params.landing_page,'/about_us');assert.equal(event.params.form_name,'about_enquiry');assert.doesNotMatch(JSON.stringify(event.params),/visitor@|Test Visitor|Example Company|555/)}
})
test('missing configuration and service failures cannot report a conversion',async()=>{
  for(const error of ['not_configured','submission_failed','network_error']){const f=fixture({ok:false,error});assert.equal((await f.submit(lead)).ok,false);assert.equal(f.events.map(x=>x.name).join(','),'lead_form_submit,lead_form_error')}
})
test('unexpected delivery exceptions become a safe failure',async()=>{
  const f=fixture({},true);const result=await f.submit(lead);assert.equal(result.ok,false);assert.equal(result.error,'network_error');assert.equal(f.events.filter(x=>x.name==='generate_lead').length,0)
})
test('subject strips visitor-controlled line breaks',async()=>{
  const f=fixture();await f.submit({...lead,hiringNeed:'Developer\r\nBcc: other@example.invalid'});assert.doesNotMatch(f.emails[0].subject,/[\r\n]/)
})
