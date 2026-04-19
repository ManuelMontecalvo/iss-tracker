import { useEffect, useState, useRef } from 'react';

const YT_URL = "https://www.youtube.com/embed/sWasdbDVNvc?autoplay=1&mute=1";

export function NasaLive() {
  const [src, setSrc] = useState(YT_URL);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const retryCountRef = useRef(0);
  const iframeLoadedRef = useRef(false);

  const reloadIframe = (reason = "auto") => {
    setIsReconnecting(true);
    iframeLoadedRef.current = false;
    const ts = Date.now();
    setSrc(`${YT_URL}&ts=${ts}&reason=${reason}`);
  };

  // Evento online/offline
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      retryCountRef.current = 0;
      reloadIframe("online");
    };

    const handleOffline = () => {
      setIsOffline(true);
      setIsReconnecting(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Quando l’iframe ha caricato il player YouTube
  const handleIframeLoad = () => {
    iframeLoadedRef.current = true;

    // Aspetta 1 secondo per sicurezza
    setTimeout(() => {
      // Se l’iframe ha caricato → togli overlay
      if (iframeLoadedRef.current) {
        setIsReconnecting(false);
      }
    }, 1000);
  };

  // Retry intelligente
  useEffect(() => {
    if (!isReconnecting || isOffline) return;

    const timeout = setTimeout(() => {
      if (iframeLoadedRef.current) {
        // Player caricato → tutto ok
        setIsReconnecting(false);
        return;
      }

      // Player non caricato → retry
      retryCountRef.current += 1;

      if (retryCountRef.current <= 10) {
        reloadIframe("retry");
      } else {
        // Troppi tentativi → aspetta prossimo evento online
        setIsReconnecting(false);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [src, isReconnecting, isOffline]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <iframe
        key={src}
        width="100%"
        height="100%"
        src={src}
        title="NASA Live Stream"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        onLoad={handleIframeLoad}
        style={{ backgroundColor: "black" }}
      ></iframe>

      {(isOffline || isReconnecting) && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top, rgba(0,0,0,0.9), rgba(0,0,0,0.98))",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#00eaff",
            fontFamily: "Share Tech Mono, monospace",
            fontSize: "0.9rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ marginBottom: "0.75rem", opacity: 0.8 }}>
            NASA LIVE FEED
          </div>

          <div style={{ marginBottom: "0.5rem" }}>
            {isOffline ? "CONNECTION LOST" : "RECONNECTING…"}
          </div>

          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "2px solid rgba(0,234,255,0.4)",
              borderTopColor: "#00eaff",
              animation: "spin 1s linear infinite",
            }}
          ></div>
        </div>
      )}
    </div>
  );
}
