import test from 'node:test';
import assert from 'node:assert/strict';
import { EXPRESSIONS, getSimulationState, normalizeProgress } from './blue-state.mjs';

test('expone las nueve expresiones oficiales sin duplicados', () => {
  assert.deepEqual(EXPRESSIONS, ['normal', 'feliz', 'curioso', 'sorprendido', 'pensando', 'concentrado', 'triste', 'emocionado', 'investigador']);
  assert.equal(new Set(EXPRESSIONS).size, 9);
});

test('la secuencia simulada distingue investigador, éxito y error', () => {
  assert.equal(getSimulationState('running').expression, 'investigador');
  assert.equal(getSimulationState('success').expression, 'feliz');
  assert.equal(getSimulationState('error').expression, 'triste');
  assert.match(getSimulationState('running').message, /simulado/);
  assert.throws(() => getSimulationState('toString'), RangeError);
});

test('acepta solo porcentajes reales válidos; no inventa progreso', () => {
  for (const value of [null, undefined, NaN, Infinity, -1, 101, '50']) assert.equal(normalizeProgress(value), null);
  for (const value of [0, 12.5, 100]) assert.equal(normalizeProgress(value), value);
});
