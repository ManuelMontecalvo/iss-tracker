import { TelemetryPanel } from '../TelemetryPanel';
import { SpeedGauge } from '../SpeedGauge';
import { AltitudeGauge } from '../AltitudeGauge';
import { Radar } from '../Radar';

export function TelemetryQuadrant({ data }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <TelemetryPanel
        latitude={data.latitude}
        longitude={data.longitude}
        velocity={data.velocity}
        altitude={data.altitude}
      />

      <SpeedGauge velocity={data.velocity} variant="digital" />

      <AltitudeGauge 
        altitude={data.altitude} 
        variant="digital" 
        className="alt-gauge-right"
      />

      <Radar />
    </div>
  );
}
