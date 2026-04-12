import { useState, useEffect, useCallback, useRef } from 'react';
import { API_URL, UPDATE_INTERVAL_MS } from '../constants';

/**
 * Hook personalizzato per ottenere i dati real-time dell'ISS
 * Aggiorna ogni 1 secondo con optimizzazioni:
 * - Evita fetch sovrapposti
 * - Non aggiorna state se i dati non cambiano
 * - Usa useCallback per la funzione fetch
 */
export function useISSData() {
  const [data, setData] = useState({
    latitude: 0,
    longitude: 0,
    altitude: 0,
    velocity: 0,
    footprint: 2200,
    timestamp: Date.now(),
    error: null,
    loading: true
  });

  // Ref per evitare fetch sovrapposti
  const isFetchingRef = useRef(false);
  // Ref per tracciare l'ultimo stato per confronto
  const lastDataRef = useRef(null);

  // Funzione fetch memoizzata
  const fetchISS = useCallback(async () => {
    // Evita fetch sovrapposti
    if (isFetchingRef.current) {
      return;
    }

    isFetchingRef.current = true;

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const issData = await response.json();

      // Crea il nuovo oggetto dati
      const newData = {
        latitude: issData.latitude,
        longitude: issData.longitude,
        altitude: issData.altitude,
        velocity: issData.velocity,
        footprint: issData.footprint || 2200,
        timestamp: Date.now(),
        error: null,
        loading: false
      };

      // Confronta con l'ultimo dato
      // Se i valori significativi non cambiano, non aggiornare state
      const lastData = lastDataRef.current;
      const hasSignificantChange =
        !lastData ||
        Math.abs(newData.latitude - lastData.latitude) > 0.001 ||
        Math.abs(newData.longitude - lastData.longitude) > 0.001 ||
        Math.abs(newData.altitude - lastData.altitude) > 0.01 ||
        Math.abs(newData.velocity - lastData.velocity) > 0.1 ||
        newData.footprint !== lastData.footprint;

      // Aggiorna solo se c'è un cambio significativo
      if (hasSignificantChange) {
        lastDataRef.current = newData;
        setData(newData);
      }
    } catch (err) {
      console.error('Errore fetch ISS:', err);
      // Aggiorna error state
      setData(prev => ({
        ...prev,
        error: err.message,
        loading: false
      }));
    } finally {
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    // Fetch immediato al mount
    fetchISS();

    // Aggiornamento periodico ogni 1 secondo
    const intervalId = setInterval(fetchISS, UPDATE_INTERVAL_MS);

    // Cleanup
    return () => {
      clearInterval(intervalId);
    };
  }, [fetchISS]);

  return data;
}
