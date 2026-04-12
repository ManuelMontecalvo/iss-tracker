import { useMemo, memo } from 'react';
import '../styles/hud.css';
import { calculateGaugeFill } from '../utils';
import { MAX_ALTITUDE } from '../constants';

/**
 * Altimetro circolare futuristico
 * Scala: 0-500 km
 * 
 * Optimizzato con memo: non re-render se altitude non cambia significativamente
 */
function AltitudeGaugeComponent({ altitude }) {
  // Calcola il riempimento del gauge
  const fillDegrees = useMemo(() => {
    return calculateGaugeFill(altitude, MAX_ALTITUDE);
  }, [altitude]);

  return (
    <div className="hud-gauge alt-gauge">
      <div className="gauge-circle">
        <div 
          className="gauge-fill" 
          style={{
            background: `conic-gradient(var(--accent) ${fillDegrees}deg, transparent 0deg)`
          }}
        ></div>
        <div className="gauge-cover">
          <div className="gauge-label">ALTITUDINE</div>
          <div className="gauge-value">{altitude.toFixed(1)} km</div>
        </div>
      </div>
    </div>
  );
}

export const AltitudeGauge = memo(AltitudeGaugeComponent);
