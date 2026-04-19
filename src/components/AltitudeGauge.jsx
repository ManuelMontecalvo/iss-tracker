import { useMemo, memo } from 'react';
import { calculateGaugeFill } from '../utils';
import { MAX_ALTITUDE } from '../constants';

/**
 * Altimetro circolare futuristico
 * Scala: 0-500 km
 * 
 * Optimizzato con memo: non re-render se altitude non cambia significativamente
 */
function AltitudeGaugeComponent({ altitude, variant = 'neo', className = '' }) {
  // Calculate gauge fill for altitude
  const fillDegrees = useMemo(() => {
    return calculateGaugeFill(altitude, MAX_ALTITUDE);
  }, [altitude]);

  // Define colors based on variant
  const getAccentColor = (variant) => {
    switch (variant) {
      case 'digital': return '#ff6b35';
      case 'holo': return '#00eaff';
      default: return '#00eaff';
    }
  };

  const accentColor = getAccentColor(variant);

  return (
    <div className={`hud-gauge style-${variant} alt-gauge ${className}`.trim()}>
      <div className="gauge-circle">
        <div 
          className="gauge-fill" 
          style={{
            background: `conic-gradient(${accentColor} ${fillDegrees}deg, transparent 0deg)`
          }}
        ></div>
        <div className="gauge-cover">
          <div className="gauge-label">ALTITUDE</div>
          <div className="gauge-value">
            <span className="gauge-number">{altitude.toFixed(1)}</span>
            <span className="gauge-unit">km</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const AltitudeGauge = memo(AltitudeGaugeComponent);
