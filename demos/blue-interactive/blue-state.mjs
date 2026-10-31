/** Estado visual independiente de cualquier herramienta o servicio. */
export const EXPRESSIONS = Object.freeze([
  'normal', 'feliz', 'curioso', 'sorprendido', 'pensando',
  'concentrado', 'triste', 'emocionado', 'investigador',
]);

export const SIMULATION = Object.freeze({
  idle: Object.freeze({ expression: 'curioso', message: 'Estoy listo para explorar esta imagen de prueba.' }),
  running: Object.freeze({ expression: 'investigador', message: 'Demostración en curso. El movimiento es simulado.' }),
  success: Object.freeze({ expression: 'feliz', message: '¡Demostración completada! No se analizó ningún archivo.' }),
  error: Object.freeze({ expression: 'triste', message: 'Este es un error simulado. Puedes intentarlo de nuevo.' }),
});

export function getSimulationState(name) {
  if (!Object.hasOwn(SIMULATION, name)) throw new RangeError('Estado de demostración desconocido.');
  return SIMULATION[name];
}

/** Solo para datos de progreso que proporcione una herramienta real. */
export function normalizeProgress(value) {
  if (value === null || value === undefined || typeof value !== 'number' || !Number.isFinite(value)) return null;
  return value >= 0 && value <= 100 ? value : null;
}
