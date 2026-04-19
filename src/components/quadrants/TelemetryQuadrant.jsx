import './css/TelemetryQuadrant.css';
import { TelemetryPanel } from '../TelemetryPanel';
import { SpeedGauge } from '../SpeedGauge';
import { AltitudeGauge } from '../AltitudeGauge';

export function TelemetryQuadrant({ data }) {
  return (
    <div className="telemetry-container">
      
      <div className="telemetry-top">
        <TelemetryPanel
          latitude={data.latitude}
          longitude={data.longitude}
          velocity={data.velocity}
          altitude={data.altitude}
        />
      </div>

      <div className="telemetry-bottom">
        <SpeedGauge velocity={data.velocity} variant="digital" />
        <AltitudeGauge altitude={data.altitude} variant="digital" />
      </div>

    </div>
  );
}
