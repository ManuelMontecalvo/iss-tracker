# ISS HUD Quick Reference

## 🚀 Avvio Veloce
```bash
cd iss-tracker-react
npm install          # Prima volta
npm run dev          # http://localhost:5173/
```

## 📂 File Importanti

| File | Descrizione |
|------|-------------|
| `src/App.jsx` | Componente principale orchestratore |
| `src/hooks/useISSData.js` | Hook che fetcha dati ISS ogni 1s (con footprint) |
| `src/components/map/Map.jsx` | Mappa Leaflet con trail interpolato + footprint circle |
| `src/styles/hud.css` | Tutti gli stili HUD |
| `src/constants/` | Costanti (API, map, gauges) |
| `src/utils/` | Funzioni utility (gauge, formatting) |
| `vite.config.js` | Config build |
| `package.json` | Dipendenze |

## 🎨 CSS Variables

```css
:root {
  --accent: #00eaff;          /* Colore principale (cyan) */
  --text-main: #e5f4ff;       /* Testo principale */
  --bg-main: #050810;         /* Sfondo principale */
  --bg-panel: #0b1220;        /* Sfondo pannelli */
  --warning: #ff3b3b;         /* Colore allarme */
}
```

## 🔧 Modifiche Comuni

### 1. Cambiare Colore Tema
**File**: `src/styles/hud.css` (linea 11)
```css
--accent: #ff00ff;  /* Magenta al posto del cyan */
```

### 2. Aumentare Frequenza Update
**File**: `src/constants/api.js`
```javascript
export const UPDATE_INTERVAL_MS = 500; // Ogni 500ms invece di 1000ms
```

### 3. Modificare Interpolazione Trail (Fluidity)
**File**: `src/components/map/Map.jsx` (linea 125)
```javascript
const interpolationSteps = 10; // Più alto = trail più fluido (era 5)
```

### 4. Cambiare Footprint Size Massimo
**File**: `src/constants/map.js`
```javascript
export const MAX_FOOTPRINT = 3000; // Raggio massimo footprint in km
```

### 5. Cambiare Font
**File**: `src/App.css` (linea 4)
```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap');
font-family: 'IBM Plex Mono', monospace;
```

### 6. Cambiare Scale Gauge
**File**: `src/constants/gauges.js`
```javascript
export const MAX_VELOCITY = 25000;  // 0-25000 km/h (era 30000)
export const MAX_ALTITUDE = 600;    // 0-600 km (era 500)
```

### 7. Cambiare Zoom e Trail Punti
**File**: `src/constants/map.js`
```javascript
export const MAP_ZOOM_LEVEL = 4;        // Zoom iniziale (era 3)
export const MAX_TRAIL_POINTS = 500;    // Punti trail (era 300)
```

## 🎯 React Patterns Usati

### useISSData Hook
```javascript
const issData = useISSData();
// issData = { 
//   latitude, longitude, altitude, velocity, 
//   footprint, timestamp, error, loading 
// }
```

### Map con useRef (inizializza una sola volta)
```javascript
const mapInstanceRef = useRef(null);

useEffect(() => {
  if (mapInstanceRef.current) return; // Già inizializzato
  
  const map = L.map(container);
  mapInstanceRef.current = map;
}, []); // [] = run una sola volta
```

### Gauge con useMemo
```javascript
const fillDegrees = useMemo(() => {
  return calculateGaugeFill(velocity, MAX_VELOCITY);
}, [velocity]); // Ricalcola solo se velocity cambia
```

## 📱 Media Queries Breakpoint

```css
/* Large Desktop */
/* (no media query) */

/* Tablet */
@media (max-width: 1200px) { ... }

/* Small Tablet / Large Phone */
@media (max-width: 768px) { ... }
```

## 🔌 Import/Export Pattern

```javascript
// components/index.js
export { Map } from './map';
export { TelemetryPanel } from './TelemetryPanel';

// constants/index.js
export { API_URL, UPDATE_INTERVAL_MS } from './api';
export { MAX_TRAIL_POINTS, ... } from './map';

// utils/index.js
export { calculateGaugeFill, ... } from './gaugeCalculations';

// App.jsx
import { Map, TelemetryPanel } from './components';
import { API_URL } from './constants';
import { calculateGaugeFill } from './utils';
```

## 🐛 Debug Utilities

### Console Log API Response
**File**: `src/hooks/useISSData.js`
```javascript
console.log('ISS Data:', issData);
```

### Visualizzare Re-render
```javascript
console.log('Map Component Rendered', latitude, longitude);
```

### Check Trail Performance
```javascript
console.log('Trail Points:', trailCoordsRef.current.length);
```

## 📊 Animazioni CSS Chiave

| Animazione | File | Durata |
|-----------|------|--------|
| `pulse` | hud.css | 1.4s |
| `sweep` | hud.css | 3s |
| `trail fade` | Map.jsx | requestAnimationFrame |
| `transition` | gauge | 0.3s |

## 🎬 Lifecycle Component - Map

```javascript
// 1. Inizializzazione (una sola volta)
useEffect(() => {
  if (!mapContainerRef.current || mapInstanceRef.current) return;
  
  const map = L.map(mapContainerRef.current);
  mapInstanceRef.current = map;
  setIsMapReady(true);
}, []); // [] = run UNA sola volta

// 2. Aggiornamento position + trail (con RAF)
useEffect(() => {
  // Interpola trail
  // Aggiorna marker
  // Cancella vecchi segmenti
  // requestAnimationFrame per renderizzare
  
  return () => cancelAnimationFrame(animationFrameRef.current);
}, [latitude, longitude, footprint]);
```

## 🗺️ Leaflet Esempi

```javascript
// Creare mappa
const map = L.map(container).setView([0, 0], 3);

// Aggiungere tile layer
L.tileLayer('https://.../{z}/{x}/{y}.png').addTo(map);

// Creare marker
const marker = L.marker([lat, lon], { icon }).addTo(map);

// Aggiornare posizione
marker.setLatLng([newLat, newLon]);

// Creare circle (footprint)
const circle = L.circle([lat, lon], {
  radius: 2200 * 1000, // Metri
  color: 'cyan',
  fillOpacity: 0.05
}).addTo(map);

// Creare polyline (trail)
const line = L.polyline([[lat1, lon1], [lat2, lon2]]).addTo(map);

// Rimuovere layer
map.removeLayer(layer);
```

## 🚨 Common Errors

| Errore | Causa | Soluzione |
|--------|-------|-----------|
| "Cannot read property 'setLatLng'" | Marker non inizializzato | Verifica: `if (!issMarkerRef.current)` |
| "Leaflet not defined" | Import mancante | `import L from 'leaflet'` |
| "API call failed" | Rete giù | Controlla console network |
| "Map container not found" | Ref non corretto | Verifica `mapContainerRef` |
| "Trail non fluido" | Interpolazione bassa | Aumenta `interpolationSteps` in Map.jsx |
| "Performance bassa" | Trail troppo lungo | Riduci `MAX_TRAIL_POINTS` in constants |

## 🔗 API ISS Response

```javascript
// Endpoint
https://api.wheretheiss.at/v1/satellites/25544

// Risposta
{
  "name": "iss",
  "latitude": 45.12,
  "longitude": -75.43,
  "altitude": 408.5,
  "velocity": 27600,
  "visibility": "eclipsed",
  "footprint": 2200,    // <-- Raggio di copertura in km
  "timestamp": 1630714200
}
```

## 📝 Convenzioni Progetto

- **Componenti**: PascalCase (`Map.jsx`, `TelemetryPanel.jsx`)
- **Hooks**: camelCase (`useISSData.js`)
- **CSS Classes**: kebab-case (`.hud-panel`, `.speed-gauge`)
- **Variabili**: camelCase (`mapInstanceRef`, `issData`)
- **Costanti**: UPPER_SNAKE_CASE (`MAX_TRAIL_POINTS`, `UPDATE_INTERVAL_MS`)

## 🎯 Checklist Deployment

- [ ] `npm run lint` passa
- [ ] `npm run build` completa senza errori
- [ ] Tests (se presenti) passano
- [ ] API key aggiunta (se necessaria)
- [ ] Variabili ambiente configurate
- [ ] Build `dist/` pronto per upload
- [ ] Trail Interpolazione testata
- [ ] Footprint circle visibile su mappa

---

**Keep it simple, keep it lit! ✨**
