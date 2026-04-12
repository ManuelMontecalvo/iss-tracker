/**
 * Funzioni di utilità per il calcolo dei gauge
 */

/**
 * Calcola la percentuale di riempimento di un gauge (0-1)
 * @param {number} value - Valore attuale
 * @param {number} maxValue - Valore massimo della scala
 * @returns {number} Percentuale da 0 a 1
 */
export function calculateGaugePercent(value, maxValue) {
  return Math.min(value / maxValue, 1);
}

/**
 * Converte una percentuale (0-1) in gradi (0-360) per conic-gradient
 * @param {number} percent - Percentuale da 0 a 1
 * @returns {number} Gradi da 0 a 360
 */
export function percentToDegrees(percent) {
  return percent * 360;
}

/**
 * Calcola il riempimento di un gauge in una sola funzione
 * @param {number} value - Valore attuale
 * @param {number} maxValue - Valore massimo della scala
 * @returns {number} Gradi conic-gradient (0-360)
 */
export function calculateGaugeFill(value, maxValue) {
  const percent = calculateGaugePercent(value, maxValue);
  return percentToDegrees(percent);
}
