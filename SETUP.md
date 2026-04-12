# ISS HUD - Guida di Avvio Rapido

## 🚀 Setup Iniziale

### 1. Installa Node.js
Se non lo hai già, installa [Node.js](https://nodejs.org/) (versione 16+).

### 2. Installa Dipendenze
Dalla cartella `iss-tracker-react/`:
```bash
npm install
```

Questo installerà:
- React 19
- React DOM 19
- Leaflet 1.9.4
- Vite (build tool)
- ESLint e altre dev tools

### 3. Avvia Server di Sviluppo
```bash
npm run dev
```

Avrà output tipo:
```
  VITE v8.0.4  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Apri `http://localhost:5173/` nel browser.

### 4. Verifica il Funzionamento
- 🗺️ Dovresti vedere la mappa con la ISS
- 📍 Pannello HUD in alto a sinistra con Lat/Lon/Velocità/Altitudine
- ⚡ Tachimetro e altimetro in alto a destra
- 🎯 Radar animato in basso a destra
- ✨ Trail dell'ISS aggiornato ogni 1 secondo

## 📦 Build per Produzione

Compila il bundle ottimizzato:
```bash
npm run build
```

Output sarà in `dist/`. Pronto per deployment.

Preview locale del build:
```bash
npm run preview
```

## 🔧 Comandi Disponibili

```bash
npm run dev       # Dev server con HMR (Hot Module Replacement)
npm run build     # Build ottimizzato per produzione
npm run lint      # Esegui ESLint
npm run preview   # Preview del build produttivo
```

## 📝 Struttura di File Importante

```
src/
├── App.jsx              ← Componente principale
├── components/
│   └── *.jsx            ← Componenti React
├── hooks/
│   └── useISSData.js    ← Hook custom per API
├── styles/
│   ├── hud.css          ← Stilistica HUD
│   └── map.css          ← Stili Leaflet
```

## 🎨 Personalizzazioni Comuni

### Cambiare i Colori
Modifica le variabili CSS in `src/styles/hud.css`:
```css
:root {
  --accent: #00eaff;      /* Cambiam questo! */
  --bg-main: #050810;     /* O questo */
  --warning: #ff3b3b;
}
```

### Cambiare il Font
In `src/App.css`, modifica l'import:
```css
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap');
```

### Aumentare la Frequenza di Update
In `src/hooks/useISSData.js`:
```javascript
const UPDATE_INTERVAL_MS = 500; // invece di 1000
```

## 🐛 Troubleshooting

### "npm: comando non trovato"
→ Installa [Node.js](https://nodejs.org/)

### Porta 5173 già in uso
```bash
npm run dev -- --port 3000
```

### Mappa non carica
→ Controlla la console (F12) per errori di rete
→ Verifica che la API `api.wheretheiss.at` sia raggiungibile

### Trail non anima
→ Verifica che `useISSData.js` aggiorna regolarmente (watch network tab)

## 🌍 Deploy

### Vercel
```bash
npm install vercel -g
vercel
```

### Netlify
```bash
npm install netlify-cli -g
netlify deploy --prod --dir dist
```

### GitHub Pages
1. Aggiorna `vite.config.js`:
   ```javascript
   export default defineConfig({
     base: '/iss-hud/',
   })
   ```
2. Fai build: `npm run build`
3. Deploy `dist/` su GitHub Pages

## ℹ️ Note di Sviluppo

- **HMR Attivo**: Modifiche ai file vengono riflesse live nel browser
- **Strict Mode**: React StrictMode attivo in sviluppo (utile per debug)
- **No CDN**: Tutto importato da npm, ideale per offlineing
- **Tree-Shakeable**: Build finale contiene solo codice usato

## 📚 Risorse Utili

- [React 19 Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Leaflet Docs](https://leafletjs.com/)
- [API ISS](https://wheretheiss.at/w/developer)

---

**Happy hacking! 🛰️✨**
