# ISS HUD - Architettura React

## Panoramica Progetto

Applicazione React moderna e scalabile che traccia l'International Space Station (ISS) in tempo reale usando Vite, Leaflet e CSS personalizzato.

## Struttura di Cartelle

```
iss-tracker-react/
├── src/
│   ├── components/           # Componenti React riutilizzabili
│   │   ├── Map.jsx          # Mappa Leaflet con trail animato
│   │   ├── TelemetryPanel.jsx   # Pannello HUD principale
│   │   ├── SpeedGauge.jsx       # Tachimetro circolare
│   │   ├── AltitudeGauge.jsx    # Altimetro circolare
│   │   ├── Radar.jsx            # Radar animato
│   │   └── index.js             # Export barrel file
│   │
│   ├── hooks/               # Hook React personalizzati
│   │   └── useISSData.js    # Hook per fetch dati ISS (aggiornamento 1s)
│   │
│   ├── styles/              # File CSS separati per tema
│   │   ├── hud.css          # Stilistica HUD completa
│   │   └── map.css          # Stili personalizzati Leaflet
│   │
│   ├── App.jsx              # Componente principale (orchestratore)
│   ├── App.css              # Stili globali
│   ├── main.jsx             # Entry point Vite
│   └── index.css            # Reset CSS globale
│
├── public/                  # Asset statici
├── package.json             # Dependencies (con leaflet)
├── vite.config.js           # Configurazione Vite
└── index.html               # Template HTML
```

## Componenti

### `App.jsx` - Orchestratore Principale
- Usa lo hook `useISSData` per ottenere i dati ISS
- Compone tutti i componenti in overlay sulla mappa
- Gestisce il layout principale

### `useISSData.js` - Hook Custom
```javascript
const data = useISSData();
// Restituisce: { latitude, longitude, altitude, velocity, timestamp, error, loading }
// Aggiorna ogni 1 secondo dalla API https://api.wheretheiss.at/v1/satellites/25544
```

### `components/Map.jsx`
- Inizializza Leaflet una sola volta (useRef)
- Aggiorna marker ISS in tempo reale
- Mantiene il trail animato con fade effect
- Tema scuro (CARTO Dark Matter)

### `components/TelemetryPanel.jsx`
- Pannello HUD stile futuristico
- Mostra Lat, Lon, Velocità, Altitudine
- Indicatore di collegamento con pulsante animato

### `components/SpeedGauge.jsx`
- Gauge circolare per la velocità
- Scala: 0-30,000 km/h
- Glow effect sui bordi

### `components/AltitudeGauge.jsx`
- Gauge circolare per l'altitudine
- Scala: 0-500 km
- Glow effect sui bordi

### `components/Radar.jsx`
- Radar circolare animato
- Sweep radiale continuo
- Anelli laser in stile HUD militare

## Styling

### `hud.css`
- **Tema**: Colori futuristici con accenti cyan (#00eaff)
- **Font**: Share Tech Mono (monospazio futuristico)
- **Animazioni**: Pulse su indicatori, sweep su radar, fade su trail
- **Glass-morphism**: Backdrop blur su pannelli
- **Responsive**: Adattamento per tablet e mobile

### `map.css`
- Personalizzazione Leaflet per tema scuro
- Stili per trail segments
- Override dei controlli nativi Leaflet

## Flusso Dati

```
useISSData Hook
    ↓ (fetch ogni 1 secondo)
  ↓
App Component
  ├→ Map (lat, lon, velocity, altitude)
  ├→ TelemetryPanel (lat, lon, velocity, altitude)
  ├→ SpeedGauge (velocity)
  ├→ AltitudeGauge (altitude)
  └→ Radar (static)
```

## Installation & Setup

1. **Installa dipendenze**
   ```bash
   npm install
   ```

2. **Avvia dev server**
   ```bash
   npm run dev
   ```

3. **Build per produzione**
   ```bash
   npm run build
   ```

4. **Preview build**
   ```bash
   npm run preview
   ```

## Migliori Pratiche Implementate

✅ **No CDN** - Leaflet importato via npm, non CDN  
✅ **No document.getElementById** - Tutto React-based con useRef  
✅ **Single Map Initialize** - La mappa si crea solo una volta grazie a useRef + useEffect  
✅ **Memoized Calculations** - useMemo per gauge calculations per evitare re-render inutili  
✅ **Cleanup Effects** - Intervalli e listeners puliti al unmount  
✅ **Responsive Design** - Media queries per mobile/tablet  
✅ **CSS Modules-Ready** - Facile convertire a CSS modules se necessario  
✅ **Zero TypeScript** - Pure JavaScript come richiesto  

## Personalizzazioni Possibili

- **Colori**: Modifica `--accent` e palette in `hud.css` e `App.css`
- **Scale Gaugz**: Modifica `MAX_TRAIL_POINTS` in `Map.jsx` e i moltiplicatori `/ 30000` e `/ 500`
- **Font**: Aggiungi/cambia in `App.css` @import
- **Update Interval**: Modifica `UPDATE_INTERVAL_MS` in `useISSData.js`
- **Tile Layer**: Cambia URL CARTO nel `Map.jsx`

## Dependencies

- **react** ^19.2.4 - UI Framework
- **react-dom** ^19.2.4 - DOM Rendering
- **leaflet** ^1.9.4 - Mapping Library
- **vite** ^8.0.4 - Build Tool

## DevDependencies

- eslint, @vitejs/plugin-react, e altri strumenti di sviluppo

## Nessuna Dipendenza Extra Richiesta

Non ci sono dipendenze extra inutili:
- ✅ No recharts/chart.js (gauge custom CSS)
- ✅ No socket.io (API REST pura)
- ✅ No Redux/Zustand (React Hooks sufficienti)
- ✅ No CSS-in-JS (CSS files separati)

---

**Creato con ❤️ per il tracciamento dell'ISS**
