/**
 * Barrel file per le costanti dell'applicazione
 * Esporta tutte le costanti dalle sottocartelle
 */

export { API_URL, UPDATE_INTERVAL_MS } from './api';
export { 
  MAX_TRAIL_POINTS, 
  MAP_ZOOM_LEVEL, 
  MAP_MIN_ZOOM, 
  MAP_MAX_ZOOM,
  ISS_MARKER_SIZE,
  TRAIL_BASE_WEIGHT,
  TRAIL_MAX_WEIGHT
} from './map';
export { MAX_VELOCITY, MAX_ALTITUDE } from './gauges';
