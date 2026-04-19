import { useMemo, memo } from 'react';
import { calculateGaugeFill } from '../utils';
import { MAX_VELOCITY } from '../constants';

/**
 * Tachimetro circolare futuristico
 * Scala: 0-30000 km/h
 * 
 * Optimizzato con memo: non re-render se velocity non cambia significativamente
 */
function SpeedGaugeComponent({ velocity, variant = 'neo', className = '' }) {
  // Calculate gauge fill for velocity
  const fillDegrees = useMemo(() => {
    return calculateGaugeFill(velocity, MAX_VELOCITY);
  }, [velocity]);

  // Define colors based on variant
  const getAccentColor = (variant) => {
    switch (variant) {
      case 'digital': return '#00eaff';
      case 'holo': return '#00eaff';
      default: return '#00eaff';
    }
  };

  const accentColor = getAccentColor(variant);

  return (
    <div className={`hud-gauge style-${variant} speed-gauge ${className}`.trim()}>
      <div className="gauge-circle">
        <div 
          className="gauge-fill" 
          style={{
            background: `conic-gradient(${accentColor} ${fillDegrees}deg, transparent 0deg)`
          }}
        ></div>
        <div className="gauge-cover">
          <div className="gauge-label">VELOCITY</div>
          <div className="gauge-value">
            <span className="gauge-number">{velocity.toFixed(0)}</span>
            <span className="gauge-unit">km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const SpeedGauge = memo(SpeedGaugeComponent);
