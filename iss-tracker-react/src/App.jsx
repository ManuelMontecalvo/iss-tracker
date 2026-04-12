import { useISSData } from './hooks/useISSData';
import { Map, TelemetryPanel, SpeedGauge, AltitudeGauge, Radar } from './components';
import './styles/hud.css';
import './App.css';

/**
 * App principale - orchestrata tutti i componenti
 * - Gestisce il fetch dei dati ISS via hook custom
 * - Posiziona i componenti in overlay sulla mappa
 * - Responsive e senza dipendenze da DOM diretto
 */
function App() {
  // Hook custom che aggiorna ogni 1 secondo
  const issData = useISSData();

  return (
    <div className="app">
      {/* Mappa Leaflet (background) */}
      <Map 
        latitude={issData.latitude} 
        longitude={issData.longitude}
        velocity={issData.velocity}
        altitude={issData.altitude}
        footprint={issData.footprint}
      />

      {/* Grid overlay HUD */}
      <div className="hud-grid-overlay"></div>

      {/* Pannello telemetria (alto-sinistra) */}
      <TelemetryPanel
        latitude={issData.latitude}
        longitude={issData.longitude}
        velocity={issData.velocity}
        altitude={issData.altitude}
      />

      {/* Tachimetro velocità (alto-destra) */}
      <SpeedGauge velocity={issData.velocity} />

      {/* Altimetro (alto-destra, a sinistra del tachimetro) */}
      <AltitudeGauge altitude={issData.altitude} />

      {/* Radar (basso-destra) */}
      <Radar />
    </div>
  );
}

export default App;
