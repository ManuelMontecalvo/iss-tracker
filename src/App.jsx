import { useISSData } from './hooks/useISSData';
import { FourQuadrantLayout } from './components/layout/FourQuadrantLayout';

import { NasaLive } from './components/quadrants/NasaLive';
import { TelemetryQuadrant } from './components/quadrants/TelemetryQuadrant';
import { MapQuadrant } from './components/quadrants/MapQuadrant';
import { MissionEvents } from './components/quadrants/MissionEvents';

import './styles/map.css';
import './styles/global.css';
import './styles/components.css';
import './styles/layout.css';


function App() {
  const data = useISSData();

  return (
    <div className="app">
      <FourQuadrantLayout
        topLeft={<NasaLive />}
        topRight={<TelemetryQuadrant data={data} />}
        bottomLeft={<MapQuadrant data={data} />}
        bottomRight={<MissionEvents />}
      />
    </div>
  );
}

export default App;
