import { memo } from 'react';
import '../styles/hud.css';

/**
 * Radar circolare animato (stile HUD militare)
 * 
 * Optimizzato con memo: non ha props, quindi non re-render mai
 */
function RadarComponent() {
  return (
    <div className="hud-radar">
      <div className="hud-radar-sweep"></div>
      <div className="hud-radar-center"></div>
      <div className="hud-radar-ring"></div>
      <div className="hud-radar-ring"></div>
      <div className="hud-radar-ring"></div>
    </div>
  );
}

export const Radar = memo(RadarComponent);
