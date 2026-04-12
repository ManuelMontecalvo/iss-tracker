/**
 * Funzioni di utilità per la formattazione dei dati
 */

/**
 * Formatta coordinate con numero di decimali specificato
 * @param {number} coord - Coordinata (latitudine o longitudine)
 * @param {number} decimals - Numero di decimali (default: 2)
 * @returns {string} Coordinata formattata
 */
export function formatCoordinate(coord, decimals = 2) {
  return coord.toFixed(decimals);
}

/**
 * Formatta velocità con unità
 * @param {number} velocity - Velocità in km/h
 * @param {number} decimals - Numero di decimali (default: 1)
 * @returns {string} Velocità formattata con unità
 */
export function formatVelocity(velocity, decimals = 1) {
  return `${velocity.toFixed(decimals)} km/h`;
}

/**
 * Formatta altitudine con unità
 * @param {number} altitude - Altitudine in km
 * @param {number} decimals - Numero di decimali (default: 1)
 * @returns {string} Altitudine formattata con unità
 */
export function formatAltitude(altitude, decimals = 1) {
  return `${altitude.toFixed(decimals)} km`;
}
