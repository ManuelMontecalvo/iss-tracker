# 🛰️ ISS HUD - International Space Station Real-Time Tracker

Una moderna applicazione React che traccia l'International Space Station (ISS) in tempo reale on una mappa interattiva, pannello HUD futuristico e gauge circolari.

## ✨ Caratteristiche

- **🗺️ Mappa Interattiva**: Mappa Leaflet con tema scuro CARTO
- **📍 Marker ISS**: Posizione aggiornata in tempo reale ogni 1 secondo
- **✈️ Trail Animato**: Traccia della rotta ISS con effetto fade e glow
- **📊 Telemetria Live**: Pannello HUD con Latitudine, Longitudine, Velocità, Altitudine
- **⚡ Gauge Dinamici**: Tachimetro e Altimetro circolari con animazione
- **🎯 Radar**: Radar circolare animato stile militare HUD
- **🔌 Zero CDN**: Tutto importato da npm (Leaflet, React, etc.)
- **⚙️ React Modern**: Hooks, useRef, useEffect, useMemo
- **📱 Responsive**: Adattato per desktop, tablet, mobile
- **🎨 Futuristico**: Tema cyan neon con glass-morphism

## 🚀 Quick Start

```bash
# 1. Installa dipendenze
npm install

# 2. Avvia dev server
npm run dev

# 3. Apri browser
# http://localhost:5173/
```

Vedi [SETUP.md](./SETUP.md) per istruzioni dettagliate.

## 📂 Struttura Progetto

```
src/
├── App.jsx                          # App principale
├── components/
│   ├── Map.jsx                      # Mappa Leaflet + trail
│   ├── TelemetryPanel.jsx           # Pannello HUD telemetria
│   ├── SpeedGauge.jsx               # Tachimetro circolare
│   ├── AltitudeGauge.jsx            # Altimetro circolare
│   ├── Radar.jsx                    # Radar animato
│   └── index.js                     # Export barrel
├── hooks/
│   └── useISSData.js                # Hook custom API ISS
├── styles/
│   ├── hud.css                      # Stilistica HUD
│   └── map.css                      # Stili Leaflet
└── ...
```

Vedi [ARCHITECTURE.md](./ARCHITECTURE.md) per dettagli completi.

## 🔧 Stack Tecnologico

| Tool | Version | Uso |
|------|---------|-----|
| **React** | 19 | UI Framework |
| **React DOM** | 19 | Rendering DOM |
| **Leaflet** | 1.9.4 | Mappa interattiva |
| **Vite** | 8 | Build tool |
| **ESLint** | 9 | Code linting |

## 📡 API Utilizata

- **Endpoint**: `https://api.wheretheiss.at/v1/satellites/25544`
- **Aggiornamento**: Ogni 1 secondo
- **Dati**: latitude, longitude, altitude, velocity
- **Gratuita**: No autenticazione richiesta

## 🎨 Tema Stilistico

- **Accent Color**: #00eaff (Cyan neon)
- **Background**: Gradiente radiale (scuro)
- **Font**: Share Tech Mono (monospazio futuristico)
- **Effetti**: Glow, pulse, sweep, fade
- **Glass Effect**: Backdrop blur su pannelli

## 📋 Componenti Principali

### `Map.jsx`
Gestisce la mappa Leaflet:
- Inizializzazione una sola volta (useRef)
- Marker ISS aggiornato in tempo reale
- Trail con segmenti che fade out
- Visualizzazione automatica della mappa sulla ISS

### `TelemetryPanel.jsx`
Pannello HUD telemetria:
- Latitudine, Longitudine, Velocità, Altitudine
- Indicatore di collegamento con pulsante animato
- Stile futuristico con bordi glow

### `SpeedGauge.jsx` & `AltitudeGauge.jsx`
Gauge circolari:
- Percentuale di riempimento conic-gradient
- Scale: 0-30000 km/h (velocità), 0-500 km (altitudine)
- Animazioni smooth

### `Radar.jsx`
Radar circolare:
- Anelli laser
- Sweep rotante infinito
- Centro illuminato

### `useISSData.js`
Hook personalizzato:
- Fetch da API ogni 1 secondo
- Cleanup automatico al unmount
- State: {lat, lon, alt, speed, timestamp, error, loading}

## 🛠️ Comandi Disponibili

```bash
npm run dev       # Dev server con HMR
npm run build     # Build produttivo
npm run lint      # Esegui ESLint
npm run preview   # Preview build
```

## 📦 Build & Deploy

### Build Produttivo
```bash
npm run build
# Output: dist/
```

### Deploy (Vercel)
```bash
npm install vercel -g
vercel
```

### Deploy (Netlify)
```bash
npm install netlify-cli -g
netlify deploy --prod --dir dist
```

## 🎓 Principi di Progettazione

✅ **Zero Documento.getElementById** - Tutto React-based  
✅ **No CDN** - Dipendenze da npm, offline-ready  
✅ **Single Map Initialize** - useRef + useEffect per init unica  
✅ **Hooks Moderni** - useState, useEffect, useRef, useMemo  
✅ **Responsive Design** - Media queries per tutti i breakpoint  
✅ **CSS Separato** - Modularità e manutenibilità  
✅ **Zero TypeScript** - Pure JavaScript come richiesto  

## 🎯 Customizzazioni

### Cambiare Colore Tema
`src/styles/hud.css`:
```css
:root {
  --accent: #00ff00; /* cambiam questo */
}
```

### Cambiare Font
`src/App.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');
font-family: 'Courier Prime', monospace;
```

### Aumentare Frequenza Update
`src/hooks/useISSData.js`:
```javascript
const UPDATE_INTERVAL_MS = 500; // 2 update al secondo
```

### Cambiare Tile Layer Map
`src/components/Map.jsx`:
```javascript
L.tileLayer('https://osm.org/{z}/{x}/{y}.png', {...})
```

## 🐛 Troubleshooting

| Problema | Soluzione |
|----------|-----------|
| npm non trovato | Installa [Node.js](https://nodejs.org/) |
| Porta 5173 in uso | `npm run dev -- --port 3000` |
| Mappa non carica | Controlla `api.wheretheiss.at` raggiungibilità |
| Trail sparisce | Controlla `MAX_TRAIL_POINTS` in Map.jsx |

## 📚 Documentazione

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Architettura dettagliata
- **[SETUP.md](./SETUP.md)** - Guida di setup
- **[React Docs](https://react.dev/)** - React 19
- **[Leaflet Docs](https://leafletjs.com/)** - Leaflet API
- **[API ISS](https://wheretheiss.at/w/developer)** - API documentation

## 📄 Licenza

Progetto open source. Libero di usare, modificare e distribuire.

## 🙏 Credit

- Mappa: [Leaflet](https://leafletjs.com/)
- Dati ISS: [Where The ISS At](https://wheretheiss.at/)
- Framework: [React](https://react.dev/)
- Build: [Vite](https://vitejs.dev/)

---

**Creato con ❤️ per lo spazio**

🚀 Happy tracking! 🛰️✨
