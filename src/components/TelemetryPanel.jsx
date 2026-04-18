import { memo } from 'react';
import '../styles/hud.css';
import { formatCoordinate, formatVelocity, formatAltitude } from '../utils';

/**
 * Pannello HUD principale con telemetria in tempo reale
 * Mostra: Lat, Lon, Velocità, Altitudine
 * 
 * Optimizzato con memo: non re-render se props non cambiano significativamente
 */
function TelemetryPanelComponent({ latitude, longitude, velocity, altitude }) {
  return (
    <div className="hud-panel">
      <div className="hud-title">ISS – LIVE TELEMETRY</div>
      <div className="hud-divider"></div>
      
      <div className="hud-grid">
        <div>
          <div className="hud-label">Latitude</div>
          <div className="hud-value">{formatCoordinate(latitude)}</div>
        </div>
        <div>
          <div className="hud-label">Longitude</div>
          <div className="hud-value">{formatCoordinate(longitude)}</div>
        </div>
        <div>
          <div className="hud-label">Velocity</div>
          <div className="hud-value">{formatVelocity(velocity)}</div>
        </div>
        <div>
          <div className="hud-label">Altitude</div>
          <div className="hud-value">{formatAltitude(altitude)}</div>
        </div>
      </div>

      <div className="hud-status">
        <span className="hud-dot"></span>
        LINK: ISS / UPDATE <span className="interval-label">1s</span>
      </div>
    </div>
  );
}

export const TelemetryPanel = memo(TelemetryPanelComponent);
