# 📁 Nuova Struttura del Progetto ISS HUD

## ✅ Restructuring Completato

Il progetto è stato reorganizzato in modo **scalabile e pulito** con separazione delle responsabilità.

---

## 📂 Nuova Struttura delle Cartelle

```
src/
├── App.jsx                          # Componente principale
├── App.css                          # Stili globali
├── index.css                        # CSS di reset
├── main.jsx                         # Entry point
│
├── components/                      # 📦 Componenti React
│   ├── index.js                     # Barrel file (export centrali)
│   ├── TelemetryPanel.jsx           # Pannello HUD telemetria
│   ├── SpeedGauge.jsx               # Tachimetro
│   ├── AltitudeGauge.jsx            # Altimetro
│   ├── Radar.jsx                    # Radar animato
│   │
│   └── map/                         # Sottocartella componenti mappa
│       ├── index.js                 # Barrel file map
│       └── Map.jsx                  # Componente mappa (Leaflet + trail)
│
├── hooks/                           # 🪝 Custom React Hooks
│   └── useISSData.js                # Hook fetch dati ISS (aggiorna ogni 1s)
│
├── constants/                       # ⚙️ Costanti centrali
│   ├── index.js                     # Barrel file (esporta tutto)
│   ├── api.js                       # Costanti API (URL, intervalli)
│   ├── map.js                       # Costanti mappa (zoom, trail, marker)
│   └── gauges.js                    # Costanti gauge (scale max)
│
├── utils/                           # 🔧 Funzioni di utilità
│   ├── index.js                     # Barrel file (esporta tutto)
│   ├── gaugeCalculations.js         # Funzioni calcolo gauge (percent, gradi, ecc)
│   └── formatting.js                # Funzioni formattazione dati
│
├── styles/                          # 🎨 Fogli di stile
│   ├── hud.css                      # Stili HUD (pannelli, gauge, radar)
│   └── map.css                      # Stili mappa (trail, marker)
│
└── assets/                          # 🖼️ Asset statici
```

---

## 🔄 Imports Aggiornati

### App.jsx (Entry point)
```javascript
import { useISSData } from './hooks/useISSData';
import { Map, TelemetryPanel, SpeedGauge, AltitudeGauge, Radar } from './components';
```

### useISSData.js
```javascript
import { API_URL, UPDATE_INTERVAL_MS } from '../constants';
```

### Map.jsx
```javascript
import {
  MAX_TRAIL_POINTS,
  MAP_ZOOM_LEVEL,
  MAP_MIN_ZOOM,
  MAP_MAX_ZOOM,
  ISS_MARKER_SIZE,
  TRAIL_BASE_WEIGHT,
  TRAIL_MAX_WEIGHT
} from '../../constants';
```

### SpeedGauge.jsx & AltitudeGauge.jsx
```javascript
import { calculateGaugeFill } from '../utils';
import { MAX_VELOCITY, MAX_ALTITUDE } from '../constants';
```

### TelemetryPanel.jsx
```javascript
import { formatCoordinate, formatVelocity, formatAltitude } from '../utils';
```

---

## 📌 Costanti Disponibili

### `src/constants/api.js`
```javascript
export const API_URL = 'https://api.wheretheiss.at/v1/satellites/25544';
export const UPDATE_INTERVAL_MS = 1000; // 1 secondo
```

### `src/constants/map.js`
```javascript
export const MAX_TRAIL_POINTS = 300;        // ~5 minuti
export const MAP_ZOOM_LEVEL = 3;            // Zoom iniziale
export const MAP_MIN_ZOOM = 2;
export const MAP_MAX_ZOOM = 7;
export const ISS_MARKER_SIZE = 18;
export const TRAIL_BASE_WEIGHT = 2;
export const TRAIL_MAX_WEIGHT = 4;
```

### `src/constants/gauges.js`
```javascript
export const MAX_VELOCITY = 30000;  // km/h scala massima
export const MAX_ALTITUDE = 500;    // km scala massima
```

---

## 🔧 Utility Disponibili

### `src/utils/gaugeCalculations.js`
```javascript
calculateGaugePercent(value, maxValue)   // → numero 0-1
percentToDegrees(percent)                // → numero 0-360
calculateGaugeFill(value, maxValue)      // → numero 0-360 (all-in-one)
```

### `src/utils/formatting.js`
```javascript
formatCoordinate(coord, decimals = 2)    // → "45.12"
formatVelocity(velocity, decimals = 1)   // → "27600.5 km/h"
formatAltitude(altitude, decimals = 1)   // → "408.5 km"
```

---

## 🎯 Vantaggi della Nuova Struttura

✅ **Separazione delle responsabilità** - Ogni cartella ha un ruolo chiaro  
✅ **Facile scalabilità** - Aggiungere nuove feature è immediato  
✅ **Barrel files** - Import semplificati via `index.js`  
✅ **Riusabilità** - Utility e costanti non sono hardcoded  
✅ **Manutenibilità** - Facile trovare e modificare codice  
✅ **Testing** - Componenti isolati, facili da testare  
✅ **Performance** - memoization mantenuta (`useMemo`)  

---

## 🚀 Come Aggiungere Nuove Feature

### Aggiungere un nuovo componente HUD
1. Crea file in `src/components/MioComponente.jsx`
2. Importa costanti da `src/constants`
3. Importa utility da `src/utils`
4. Aggiungi export in `src/components/index.js`
5. Usa in `App.jsx`

### Aggiungere una nuova costante
1. Crea file in `src/constants/myCategory.js`
2. Aggiungi export in `src/constants/index.js`
3. Importa dove serve: `import { MIA_COSTANTE } from '../constants'`

### Aggiungere una nuova funzione di utilità
1. Crea o modifica file in `src/utils/`
2. Aggiungi export in `src/utils/index.js`
3. Importa dove serve: `import { myFunction } from '../utils'`

---

## ✨ Prossimi Passi (Opzionali)

- **Aggiungere cartella `src/pages`** - Se il progetto cresce (routing, multiple views)
- **Aggiungere cartella `src/services`** - Per logica complessa di API o data fetching
- **Aggiungere cartella `src/__tests__`** - Per unit test dei componenti
- **Aggiungere `.env` file** - Per gestire variabili d'ambiente (API_URL, ecc)

---

## 📝 Note Importanti

⚠️ **La logica rimane identica** - Solo la struttura è stata reorganizzata  
⚠️ **Nessuna dipendenza aggiunta** - Stesso `package.json`  
⚠️ **CSS rimane lo stesso** - Nessuna modifica ai stili  
⚠️ **L'app funziona esattamente come prima** - Solo più pulita e scalabile!

---

**Struttura pronta per produzione! 🎉**
