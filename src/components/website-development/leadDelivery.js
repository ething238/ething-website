import { web3formsAccessKey } from './web3formsConfig.js';

export const leadDeliveryError = 'Your request was not sent. Please email support@ething.in or call +91 70119 56780.';
export const leadDeliveryTimeout = 'We could not confirm whether your request was sent. Please email support@ething.in or call +91 70119 56780.';

function responseMessage(result) {
  const message = typeof result?.message === 'string' ? result.message.trim() : '';
  // Only display brief, plain messages from the delivery API.
  return message && message.length <= 300 && !/[<>]|unexpected token|syntaxerror|doctype/i.test(message) ? message : leadDeliveryError;
}

export async function readLeadDeliveryResponse(response) {
  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error(leadDeliveryError);
  }
  if (!result || typeof result !== 'object' || Array.isArray(result)) throw new Error(leadDeliveryError);
  if (!response.ok || result.success !== true) throw new Error(responseMessage(result));
  return { ok: true, success: true };
}

export async function submitLeadRequest(lead) {
  const accessKey = typeof web3formsAccessKey === 'string' ? web3formsAccessKey.trim() : '';
  if (!accessKey) throw new Error(leadDeliveryError);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);
  const subject = `New engineering enquiry: ${String(lead.hiringNeed || 'Website enquiry').replace(/[\r\n]/g, ' ').slice(0, 100)}`;
  try {
    let response;
    try {
      response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'content-type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...lead, access_key: accessKey, subject }), signal: controller.signal,
      });
    } catch {
      throw new Error(controller.signal.aborted ? leadDeliveryTimeout : leadDeliveryError);
    }
    try {
      return await readLeadDeliveryResponse(response);
    } catch (error) {
      if (controller.signal.aborted) throw new Error(leadDeliveryTimeout);
      throw error;
    }
  } finally {
    clearTimeout(timeout);
  }
}
