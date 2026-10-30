import './main.js';
import './careers.css';

const form = document.querySelector('#careers-form');
const button = form.querySelector('[type="submit"]');
const label = button.querySelector('.sprixo-fill-btn__content');
const status = document.querySelector('#careers-status');
let pending = false;
let tokenRequest;

async function getToken() {
  const response = await fetch(form.action, { credentials: 'same-origin', cache: 'no-store' });
  const result = await response.json();
  if (!response.ok || !result.token) throw new Error('The application service is unavailable. Please try again later.');
  return result.token;
}

function prepareToken() {
  tokenRequest = getToken().catch(() => null);
}

prepareToken();
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (pending || !form.reportValidity()) return;
  pending = true;
  button.disabled = true;
  form.setAttribute('aria-busy', 'true');
  label.textContent = 'Sending…';
  status.textContent = 'Sending your application…';
  delete status.dataset.state;

  try {
    const token = await tokenRequest || await getToken();
    const fields = new FormData(form);
    const payload = Object.fromEntries(fields);
    payload.consent = fields.has('consent');
    const response = await fetch(form.action, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify(payload),
    });
    let result;
    try { result = await response.json(); }
    catch { throw new Error('The application service is unavailable. Please try again later.'); }
    if (!response.ok || result.success !== true) {
      throw new Error(result.message || 'Your application could not be sent. Please try again.');
    }
    form.reset();
    status.dataset.state = 'success';
    status.textContent = result.message;
  } catch (error) {
    status.dataset.state = 'error';
    status.textContent = error instanceof TypeError
      ? 'Unable to connect. Check your connection and try again.' : error.message;
  } finally {
    pending = false;
    button.disabled = false;
    form.removeAttribute('aria-busy');
    label.textContent = 'Send application';
    prepareToken();
  }
});
