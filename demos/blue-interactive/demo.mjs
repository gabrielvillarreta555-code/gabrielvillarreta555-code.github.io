import './blue-character.mjs';
import { getSimulationState } from './blue-state.mjs';

const workspace = document.querySelector('.workspace');
const blue = document.getElementById('blue');
const message = document.getElementById('message');
const progress = document.getElementById('progress');
const start = document.getElementById('start');
const simulateError = document.getElementById('simulate-error');
const reset = document.getElementById('reset');
const expression = document.getElementById('expression');
let timer;

function showState(name) {
  const state = getSimulationState(name);
  workspace.dataset.state = name;
  document.getElementById('sample').setAttribute('aria-busy', String(name === 'running'));
  blue.setAttribute('expression', state.expression);
  blue.toggleAttribute('success', name === 'success');
  expression.value = state.expression;
  expression.disabled = name === 'running';
  message.textContent = state.message;
  progress.hidden = name !== 'running';
  start.hidden = name !== 'idle';
  reset.hidden = name === 'idle' || name === 'running';
  simulateError.hidden = name !== 'idle' && name !== 'running';
  simulateError.textContent = name === 'running' ? 'Simular error ahora' : 'Simular error';
}
start.addEventListener('click', () => {
  clearTimeout(timer);
  showState('running');
  timer = window.setTimeout(() => showState('success'), 4000);
});
simulateError.addEventListener('click', () => { clearTimeout(timer); showState('error'); });
reset.addEventListener('click', () => { clearTimeout(timer); showState('idle'); });
expression.addEventListener('change', () => { blue.removeAttribute('success'); blue.setAttribute('expression', expression.value); });
showState('idle');
