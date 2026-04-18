import { Map } from '../Map';

export function MapQuadrant({ data }) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Map
        latitude={data.latitude}
        longitude={data.longitude}
        velocity={data.velocity}
        altitude={data.altitude}
        footprint={data.footprint}
      />
    </div>
  );
}
