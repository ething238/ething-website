import fs from 'node:fs'
import vm from 'node:vm'
import test from 'node:test'
import assert from 'node:assert/strict'

const configuration=JSON.parse(fs.readFileSync('config/gtm/GTM-T9DHQSVJ.json','utf8')).containerVersion
const parameter=(tag,key)=>tag.parameter.find(p=>p.key===key)?.value
const triggerFor=tag=>configuration.trigger.find(t=>t.triggerId===tag.firingTriggerId[0])

test('replacement GTM preserves Ads destinations and uses confirmed leads for its lead action',()=>{
  assert.equal(configuration.container.publicId,'GTM-T9DHQSVJ')
  const ads=configuration.tag.filter(t=>t.type==='awct')
  assert.equal(ads.length,2)
  assert.ok(ads.every(t=>parameter(t,'conversionId')==='18230390699'))
  const lead=ads.find(t=>parameter(t,'conversionLabel')==='IeipCJLh2b8cEKvf9vRD')
  const legacy=ads.find(t=>parameter(t,'conversionLabel')==='Lvr0CKzirNEcEKvf9vRD')
  const event=t=>triggerFor(t).customEventFilter[0].parameter.find(p=>p.key==='arg1').value
  assert.equal(event(lead),'generate_lead')
  assert.equal(event(legacy),'conversion')
  assert.ok(!configuration.trigger.some(t=>t.type==='FORM_SUBMISSION'))
  assert.deepEqual(configuration.tag.filter(t=>t.type==='googtag').map(t=>parameter(t,'tagId')),['AW-18230390699'])
})

test('new triggers are restricted to the production domain and Apollo is blocked there',()=>{
  for(const trigger of configuration.trigger){
    const regex=new RegExp(trigger.filter[0].parameter.find(p=>p.key==='arg1').value)
    for(const host of ['ethingsolutions.com','www.ethingsolutions.com'])assert.ok(regex.test(host))
    for(const host of ['localhost','127.0.0.1','preview.example.test','unrelated.example'])assert.ok(!regex.test(host))
  }
  const apollo=configuration.tag.find(t=>t.name==='Apollo')
  assert.ok(apollo.blockingTriggerId.includes(configuration.trigger.find(t=>t.type==='INIT').triggerId))
  assert.notEqual(apollo.paused,true,'other domains retain their previous Apollo behavior')
})

test('confirmed lead dispatch has one GA4 event and leaves Ads conversion delivery to GTM',()=>{
  const source=fs.readFileSync('src/lib/tracking.js','utf8').replaceAll('import.meta.env','env').replaceAll('export ','')+'\nmodule.exports={trackLeadConversion};'
  const module={exports:{}},calls=[],window={dataLayer:[],gtag:(...args)=>calls.push(args)}
  vm.runInNewContext(source,{module,window,env:{VITE_GOOGLE_ADS_CONVERSION_ID:'AW-18230390699',VITE_GOOGLE_ADS_CONVERSION_LABEL:'IeipCJLh2b8cEKvf9vRD'}})
  module.exports.trackLeadConversion('confirmed-form')
  assert.equal(window.dataLayer.filter(e=>e.event==='generate_lead').length,1)
  assert.deepEqual(calls.map(args=>args.slice(0,2)),[['event','generate_lead']])
})

test('Calendly confirmations validate origin, deduplicate bookings and exclude contact values',()=>{
  const code=parameter(configuration.tag.find(t=>t.name==='eThing - Calendly event bridge'),'html').replace(/^<script>|<\/script>$/g,'')
  const handlers=[],calls=[],window={location:{pathname:'/hire-ai-developers'},dataLayer:[],addEventListener:(name,fn)=>handlers.push(fn),gtag:(...args)=>calls.push(args)}
  vm.runInNewContext(code,{window});vm.runInNewContext(code,{window})
  assert.equal(handlers.length,1)
  const scheduled=id=>({event:'calendly.event_scheduled',payload:{event:{uri:'https://api.calendly.com/events/'+id},invitee:{email:'private@example.test'}}})
  handlers[0]({origin:'https://unrelated.example',data:scheduled('fake')})
  handlers[0]({origin:'https://calendly.com',data:null})
  handlers[0]({origin:'https://calendly.com',data:{event:'calendly.event_type_viewed'}})
  assert.equal(calls.length,0)
  for(const id of ['booking-one','booking-one','booking-two'])handlers[0]({origin:'https://calendly.com',data:scheduled(id)})
  assert.equal(window.dataLayer.filter(e=>e.event==='invitee_meeting_scheduled').length,2)
  assert.equal(calls.length,2)
  assert.ok(calls.every(args=>args[1]==='invitee_meeting_scheduled'&&args[2].send_to==='G-2W7W1TB2H4'))
  assert.doesNotMatch(JSON.stringify({events:window.dataLayer,calls}),/private@example|api.calendly.com|booking-one|booking-two/)
})

test('Clarity migration keeps the same project and does not load a second instance',()=>{
  const code=parameter(configuration.tag.find(t=>t.name==='eThing - Existing Clarity project'),'html').replace(/^<script>|<\/script>$/g,'')
  const loaded=[],window={},document={createElement:()=>({}),head:{appendChild:s=>loaded.push(s)}}
  vm.runInNewContext(code,{window,document});vm.runInNewContext(code,{window,document})
  assert.equal(loaded.length,1)
  assert.equal(loaded[0].src,'https://www.clarity.ms/tag/x7qri3eadq')
  vm.runInNewContext(code,{window:{clarity(){}},document})
  assert.equal(loaded.length,1)
})
