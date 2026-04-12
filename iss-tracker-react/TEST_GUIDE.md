# 🧪 Test Guide - Mappa Leaflet Migliorata

## ✅ Checklist di Test Manuale

Usa questa checklist per verificare tutte le feature implementate.

---

## 🎯 Test 1: Footprint Circle Visibile

### Come Testare
1. Avvia l'app: `npm run dev`
2. Apri http://localhost:5173/
3. Osserva la mappa

### Cosa Dovresti Vedere
- ✅ Attorno al marker ISS (punto blu al centro) c'è un **cerchio cyan semi-trasparente**
- ✅ Il cerchio è **abbastanza grande** (raggio varia ma almeno 1000+ km)
- ✅ Il colore è **cyan leggero** (non troppo scuro)
- ✅ Quando la ISS si muove, il cerchio la segue

### Debugging
Se **NON vedi il cerchio:**
1. Apri DevTools → Console
2. Cerca errori Leaflet
3. Verifica: `footprintCircleRef.current !== null`
4. Controlla che `footprint` dato sia > 0

---

## 🎯 Test 2: Trail Fluido (Interpolazione)

### Come Testare
1. Osserva il trail della ISS (linea cyan dietro il marker)
2. Guarda il movimento per **almeno 10 secondi**
3. **Importante**: Nota il movimento seconda per seconda

### Cosa Dovresti Vedere (SENZA Interpolazione)
```
A ────────────── B ────────────── C
(Movimento a scatti, trail salta da un punto all'altro)
```

### Cosa EFFETTIVAMENTE Vedi (CON Interpolazione)
```
A → i1 → i2 → i3 → i4 → i5 → B → i1 → ...
(Movimento fluido, trail disegna ogni pixel del percorso)
```

### Test Specifico
1. Zoom sulla mappa fino a **zoom level 5-6**
2. Guarda il trail da vicino
3. Dovresti vedere **5 segmenti intermedi** tra ogni coppia di update
4. Il movimento dovrebbe sembrare **naturale, non a scatti**

### Debugging
Se il trail sembra **a scatti**:
1. Aumenta `interpolationSteps` da 5 a 10
2. Ricarica la pagina
3. Dovrebbe essere più fluido

---

## 🎯 Test 3: requestAnimationFrame - Timing 60 FPS

### Come Testare
1. Apri DevTools → Performance
2. Clicca **Record** (⏺️)
3. Aspetta **5-10 secondi**
4. Clicca **Stop** (⏹️)
5. Analizza il filmato

### Cosa Dovresti Vedere
- ✅ Nessun **purple frame** (que sarebbero JS blocking)
- ✅ Solo **green bar** (compositing veloce)
- ✅ FPS costante a **58-60**
- ✅ Nessuno "jank" visibile (scatti)

### Cosa NON Dovresti Vedere
- ❌ Purple blocks (JS time alta)
- ❌ Yellow blocks (rendering time)
- ❌ Frame drops sotto 50 FPS
- ❌ Sbalzi visibili nel trail

### Debugging
Se vedi performance scadente:
1. Riduci `interpolationSteps` da 5 a 3
2. Riduci `MAX_TRAIL_POINTS` da 300 a 200
3. Controlla se altri tab consumano CPU

---

## 🎯 Test 4: No Re-render (useRef Optimization)

### Come Testare
1. Apri DevTools → Rendering (tab)
2. Attiva **"Highlight Rendering updates"** ✅
3. Guarda la mappa per 10 secondi
4. Conta quanti **flash rossi** vedi

### Cosa Dovresti Vedere
- ✅ **ZERO flash rossi** (nessun re-render React)
- ✅ Solo la **mappa Leaflet si aggiorna** (non il React)
- ✅ Il resto dell'UI (pannelli) rimane stabile

### Cosa NON Dovresti Vedere
- ❌ Flashe rosse continue sul map container
- ❌ Tutta la pagina che "lampeggia"
- ❌ Re-render frequenti

### Codice di Verifica (Console)
```javascript
// Aggiungi questo nel Map.jsx temporaneamente:
useEffect(() => {
  console.log('Map component rendered!');
}, []); // Solo al mount

// Dovresti vedere SOLO "Map component rendered!" una volta
// Non dovrebbe repetere ogni secondo
```

---

## 🎯 Test 5: Mappa Inizializzata Una Sola Volta

### Come Testare
1. Apri DevTools → Console
2. Aggiungi un `console.log` in Map.jsx primo useEffect:
```javascript
useEffect(() => {
  console.log('MAP INITIALIZED'); // ← Aggiungi questa riga
  if (!mapContainerRef.current || mapInstanceRef.current) {
    return;
  }
  // ... resto del codice
}, []);
```
3. Ricarica la pagina
4. Controlla il console

### Cosa Dovresti Vedere
- ✅ "MAP INITIALIZED" **una sola volta**
- ✅ Non appare mai più durante l'uso

### Cosa NON Dovresti Vedere
- ❌ "MAP INITIALIZED" multiple volte
- ❌ La mappa che "flasheggia" o reinizializza

---

## 🎯 Test 6: Stile e Colori Mantenuti

### Come Testare
1. Guarda il screenshot iniziale vs adesso
2. Compara i colori del trail
3. Osserva il tema generale

### Cosa Dovresti Vedere
- ✅ Trail **CYAN** (colore originale) ✓
- ✅ Footprint Circle **CYAN LEGGERO** ✓
- ✅ Marker ISS **BLU/CYAN** ✓
- ✅ Nessun colore **verde, rosso, o arancione**
- ✅ Theme **dark mode** mantenuto

### Colori CSS
```css
#00EAFF = Cyan             /* Primary accent */
#050810 = Dark BG          /* Background */
#0b1220 = Dark Panel BG    /* Pannelli */
```

---

## 📊 Test Comparativo: Performance

### Scenario: Registra Performance per 30 Secondi

#### Test di Baseline
1. Apri DevTools → Performance
2. Clicca Record
3. Aspetta 30 secondi
4. Clicca Stop
5. Nota:
   - **FPS Medio**
   - **Memory Usage**
   - **Network Activity**

#### Metriche Attese
| Metrica | Target | Accettabile |
|---------|--------|-------------|
| FPS Medio | 58-60 | 55+ |
| Memory | <50 MB | <80 MB |
| Network | 1 req/s | 2 req/s |
| CPU | 3-4% | <10% |

---

## 🐛 Troubleshooting Test

### "Footprint non si vede"
```
⚙️ Soluzione:
1. Apri console
2. Cerca errori
3. Verifica: window.L (Leaflet caricato?)
4. Riscarica pagina (CTRL+SHIFT+R)
```

### "Trail non fluido"
```
⚙️ Soluzione:
1. Aumenta interpolationSteps (5 → 10)
2. Verifica browser moderno (Chrome 90+)
3. Controlla CPU / RAM disponibile
4. Chiudi altri tab
```

### "Performance bassa (lag visibile)"
```
⚙️ Soluzione:
1. Riduci interpolationSteps (5 → 3)
2. Riduci MAX_TRAIL_POINTS (300 → 150)
3. Zoom out sulla mappa
4. Chiudi DevTools
```

### "Footprint circle scomparisce"
```
⚙️ Soluzione:
1. Verifica che footprint !== 0
2. Controlla API response in console
3. Verifica setRadius() in Map.jsx
```

---

## 📱 Test Cross-Browser

### Chrome/Edge (Dominante)
```
✅ Footprint: Perfetto
✅ Trail: Fluido 60 FPS
✅ Performance: Ottimale
```

### Firefox
```
✅ Footprint: Buono
✅ Trail: Fluido 55+ FPS
⚠️ Performance: Leggermente più lento di Chrome
```

### Safari (macOS/iOS)
```
✅ Footprint: Buono
⚠️ Trail: 48-55 FPS (più lento)
⚠️ Performance: Richiede ottimizzazione interpolation
```

> Se usi Safari, riduci `interpolationSteps` a 3-4

---

## 🎮 Test Interattivo

### Cosa Fare Mentre Guardi
1. **Zoom In** (scroll + click mappa)
   - Trail dovrebbe restare fluido
   - Footprint dovrebbe scalare correttamente

2. **Pan/Scroll** (drag mappa)
   - Nessun lag
   - Mappa responsive

3. **Aspetta 5 Minuti**
   - Trail dovrebbe avere ~1500 segmenti
   - Memory cresce ma rimane stabile
   - Nessun crash

4. **Ricarica Pagina**
   - Trail scompare (reset)
   - Mappa si reinizializza
   - Nessun errore in console

---

## ✅ Finale: Accept Criteria Checklist

Spunta ogni voce per considerare i test **PASSATI**:

```
□ Footprint circle visibile e dinamico
□ Trail fluido con interpolazione (non a scatti)
□ FPS mantenuto a 58-60 durante spostamento
□ Zero re-render React (nessun rendering flash)
□ Mappa inizializzata una sola volta
□ Colori e tema mantenuti (cyan)
□ Nessun errore in console
□ Performance stabile dopo 5+ minuti
□ Trail ha lunghezza massima ragionevole
□ Footprint si muove con ISS
□ No memory leak (memory stabile nel tempo)
□ Cross-browser compatible (almeno Chrome/Firefox)
```

Se **tutte le caselle sono spuntate** → **TEST PASSATO** ✅

---

**Buon testing! 🧪🗺️**
