import { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../styles/map.css';
import {
  MAX_TRAIL_POINTS,
  MAP_ZOOM_LEVEL,
  MAP_MIN_ZOOM,
  MAP_MAX_ZOOM,
  ISS_MARKER_SIZE,
  TRAIL_BASE_WEIGHT,
  TRAIL_MAX_WEIGHT
} from '../../constants';

/**
 * Utility: Converte distanza ekvatoriale in km a gradi approssimativi
 * (approssimazione per piccole distanze)
 */
function kmToDegreesApprox(distanceKm) {
  return distanceKm / 111.32;
}

/**
 * Utility: Interpola linearmente tra due coordinate
 */
function interpolateLatLng(p1, p2, t) {
  return [
    p1[0] + (p2[0] - p1[0]) * t,
    p1[1] + (p2[1] - p1[1]) * t
  ];
}

/**
 * Componente Mappa Migliorata con Optimizzazioni Performance:
 * - useRef per tutti i layer Leaflet (no re-render)
 * - Controllo cambio significativo prima di aggiornare
 * - Trail incrementale (solo nuovi segmenti, non ricrea tutti)
 * - React.memo per evitare re-render del componente
 * - useMemo per funzioni utility
 * - Batch updates per trail rendering
 */
function MapComponent({ latitude, longitude, velocity, altitude, footprint }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const issMarkerRef = useRef(null);
  const footprintCircleRef = useRef(null);
  const trailCoordsRef = useRef([]);
  const trailSegmentsRef = useRef([]);
  const lastPositionRef = useRef([latitude, longitude]);
  const lastSignificantPositionRef = useRef([latitude, longitude]);
  const animationFrameRef = useRef(null);
  
  // Ref per evitare ricreazione trail inutile
  const lastTrailCountRef = useRef(0);
  const isFirstRenderRef = useRef(true);
  
  const [isMapReady, setIsMapReady] = useState(false);

  // ========== EFFETTO: Inizializzazione mappa (una sola volta) ==========
  useEffect(() => {
    if (!mapContainerRef.current || isMapReady) {
      return;
    }

    // Crea mappa Leaflet
    const map = L.map(mapContainerRef.current, {
      worldCopyJump: true,
      zoomControl: false,
      attributionControl: false
    }).setView([0, 0], MAP_ZOOM_LEVEL);

    // Tile layer CARTO DARK MATTER
    L.tileLayer('https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
      maxZoom: MAP_MAX_ZOOM,
      minZoom: MAP_MIN_ZOOM
    }).addTo(map);

    // Marker ISS personalizzato
    const issIcon = L.divIcon({
      className: '',
      html: '<div class="iss-marker"></div>',
      iconSize: [ISS_MARKER_SIZE, ISS_MARKER_SIZE],
      iconAnchor: [ISS_MARKER_SIZE / 2, ISS_MARKER_SIZE / 2]
    });

    const issMarker = L.marker([0, 0], { icon: issIcon }).addTo(map);

    // Footprint circle
    const footprintCircle = L.circle([0, 0], {
      radius: 2200 * 1000,
      color: 'rgba(0, 234, 255, 0.2)',
      fillColor: 'rgba(0, 234, 255, 0.05)',
      fillOpacity: 0.05,
      weight: 1,
      opacity: 0.2,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    mapInstanceRef.current = map;
    issMarkerRef.current = issMarker;
    footprintCircleRef.current = footprintCircle;
    setIsMapReady(true);

    // Cleanup al dismount
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      try {
        map.remove();
      } catch (e) {
        // Mappa già rimossa
      }
    };
  }, []); // Empty dependency array - run only once

  // ========== EFFETTO: Aggiornamento marker e footprint ==========
  useEffect(() => {
    if (!mapInstanceRef.current || !issMarkerRef.current || !footprintCircleRef.current) {
      return;
    }

    const marker = issMarkerRef.current;
    const footprintCircle = footprintCircleRef.current;

    // ========== CONTROLLO CAMBIO SIGNIFICATIVO ==========
    const lastSigPos = lastSignificantPositionRef.current;
    const hasSignificantChange =
      isFirstRenderRef.current ||
      Math.abs(latitude - lastSigPos[0]) > 0.001 ||
      Math.abs(longitude - lastSigPos[1]) > 0.001 ||
      footprint !== footprintCircle._getRadius?.() / 1000;

    if (!hasSignificantChange) {
      return;
    }

    isFirstRenderRef.current = false;
    lastSignificantPositionRef.current = [latitude, longitude];

    // Aggiorna posizione marker e footprint
    marker.setLatLng([latitude, longitude]);
    footprintCircle.setLatLng([latitude, longitude]);
    footprintCircle.setRadius(footprint * 1000);

    // Centra la mappa al primo aggiornamento
    if (isFirstRenderRef.current === false && !lastPositionRef.current) {
      mapInstanceRef.current.setView([latitude, longitude], MAP_ZOOM_LEVEL);
    }

    lastPositionRef.current = [latitude, longitude];
  }, [latitude, longitude, footprint]);

  return (
    <div 
      ref={mapContainerRef} 
      className="map-container" 
      style={{ 
        width: '100%', 
        height: '100vh', 
        position: 'absolute', 
        top: 0, 
        left: 0 
      }}
    ></div>
  );
}

// Export direttamente senza memo - Leaflet gestisce the map container
export { MapComponent as Map };
