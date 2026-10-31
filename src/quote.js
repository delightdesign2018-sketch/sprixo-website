import './main.js';
import './careers.css';

const form = document.querySelector('#quote-form');
const button = form?.querySelector('[type="submit"]');
const label = button?.querySelector('.sprixo-fill-btn__content');
const status = document.querySelector('#quote-status');

const services = ['Logo Design', 'Branding', 'Print Media', 'Advertisement Designs', 'Website Design'];
const serviceIndex = new URLSearchParams(window.location.search).get('service');
if (form && services[Number(serviceIndex)] && Number.isInteger(Number(serviceIndex))) form.service.value = services[Number(serviceIndex)];

let pending = false;
let tokenRequest;
async function getToken() {
  const response = await fetch(form.action, { credentials: 'same-origin', cache: 'no-store' });
  const result = await response.json();
  if (!response.ok || !result.token) throw new Error('The quote service is unavailable. Please try again later.');
  return result.token;
}
function prepareToken() { tokenRequest = getToken().catch(() => null); }
prepareToken();

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (pending || !form.reportValidity()) return;
  pending = true; button.disabled = true; form.setAttribute('aria-busy', 'true');
  label.textContent = 'Sending…'; status.textContent = 'Sending your quote request…'; delete status.dataset.state;
  try {
    const token = await tokenRequest || await getToken();
    const fields = new FormData(form); const payload = Object.fromEntries(fields); payload.consent = fields.has('consent');
    const response = await fetch(form.action, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token }, body: JSON.stringify(payload) });
    const result = await response.json().catch(() => null);
    if (!response.ok || result?.success !== true) throw new Error(result?.message || 'Your quote request could not be sent. Please try again.');
    form.reset(); status.dataset.state = 'success'; status.textContent = result.message;
  } catch (error) { status.dataset.state = 'error'; status.textContent = error instanceof TypeError ? 'Unable to connect. Check your connection and try again.' : error.message; }
  finally { pending = false; button.disabled = false; form.removeAttribute('aria-busy'); label.textContent = 'Request a quote'; prepareToken(); }
});
