import { useMemo, memo } from 'react';
import '../styles/hud.css';
import { calculateGaugeFill } from '../utils';
import { MAX_VELOCITY } from '../constants';

/**
 * Tachimetro circolare futuristico
 * Scala: 0-30000 km/h
 * 
 * Optimizzato con memo: non re-render se velocity non cambia significativamente
 */
function SpeedGaugeComponent({ velocity }) {
  // Calcola il riempimento del gauge
  const fillDegrees = useMemo(() => {
    return calculateGaugeFill(velocity, MAX_VELOCITY);
  }, [velocity]);

  return (
    <div className="hud-gauge speed-gauge">
      <div className="gauge-circle">
        <div 
          className="gauge-fill" 
          style={{
            background: `conic-gradient(var(--accent) ${fillDegrees}deg, transparent 0deg)`
          }}
        ></div>
        <div className="gauge-cover">
          <div className="gauge-label">VELOCITÀ</div>
          <div className="gauge-value">{velocity.toFixed(0)} km/h</div>
        </div>
      </div>
    </div>
  );
}

export const SpeedGauge = memo(SpeedGaugeComponent);
