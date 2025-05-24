/**
 * Hook useVLCPlayer
 * Phase 1, Semaine 3 : Contrôles de lecture avancés
 */

import { useRef, useState, useCallback, useEffect } from 'react';
export const useVLCPlayer = options => {
  const {
    muted = false,
    volume = 100,
    rate = 1.0,
    onStateChange,
    onError
  } = options;
  const playerRef = useRef(null);

  // État local (Phase 1, Semaine 3 - état complet)
  const [state, setState] = useState('idle');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, _setDuration] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(volume);
  const [currentMuted, setCurrentMuted] = useState(muted);
  const [currentRate, setCurrentRate] = useState(rate);
  const [error, setError] = useState(null);

  // Contrôles (Phase 1, Semaine 3 - contrôles avancés)
  const controls = {
    play: useCallback(async () => {
      try {
        if (playerRef.current) {
          await playerRef.current.play();
          setState('playing');
          setError(null);
        }
      } catch (err) {
        const vlcError = err;
        setError(vlcError);
        onError?.(vlcError);
      }
    }, [onError]),
    pause: useCallback(async () => {
      try {
        if (playerRef.current) {
          await playerRef.current.pause();
          setState('paused');
          setError(null);
        }
      } catch (err) {
        const vlcError = err;
        setError(vlcError);
        onError?.(vlcError);
      }
    }, [onError]),
    stop: useCallback(async () => {
      try {
        if (playerRef.current) {
          await playerRef.current.stop();
          setState('stopped');
          setCurrentTime(0);
          setError(null);
        }
      } catch (err) {
        const vlcError = err;
        setError(vlcError);
        onError?.(vlcError);
      }
    }, [onError]),
    seek: useCallback(async time => {
      try {
        if (playerRef.current) {
          await playerRef.current.seek(time);
          setCurrentTime(time);
          setError(null);
        }
      } catch (err) {
        const vlcError = err;
        setError(vlcError);
        onError?.(vlcError);
      }
    }, [onError]),
    seekForward: useCallback(async (seconds = 10) => {
      try {
        if (playerRef.current) {
          await playerRef.current.seekForward(seconds);
          setError(null);
        }
      } catch (err) {
        const vlcError = err;
        setError(vlcError);
        onError?.(vlcError);
      }
    }, [onError]),
    seekBackward: useCallback(async (seconds = 10) => {
      try {
        if (playerRef.current) {
          await playerRef.current.seekBackward(seconds);
          setError(null);
        }
      } catch (err) {
        const vlcError = err;
        setError(vlcError);
        onError?.(vlcError);
      }
    }, [onError]),
    setVolume: useCallback(async newVolume => {
      try {
        if (playerRef.current) {
          await playerRef.current.setVolume(newVolume);
          setCurrentVolume(newVolume);
          setError(null);
        }
      } catch (err) {
        const vlcError = err;
        setError(vlcError);
        onError?.(vlcError);
      }
    }, [onError]),
    setMuted: useCallback(async newMuted => {
      try {
        if (playerRef.current) {
          await playerRef.current.setMuted(newMuted);
          setCurrentMuted(newMuted);
          setError(null);
        }
      } catch (err) {
        const vlcError = err;
        setError(vlcError);
        onError?.(vlcError);
      }
    }, [onError]),
    setRate: useCallback(async newRate => {
      try {
        if (playerRef.current) {
          await playerRef.current.setRate(newRate);
          setCurrentRate(newRate);
          setError(null);
        }
      } catch (err) {
        const vlcError = err;
        setError(vlcError);
        onError?.(vlcError);
      }
    }, [onError])
  };

  // Gestion des événements (Phase 1, Semaine 3)
  useEffect(() => {
    if (onStateChange) {
      onStateChange(state);
    }
  }, [state, onStateChange]);
  return {
    playerRef,
    state,
    currentTime,
    duration,
    volume: currentVolume,
    muted: currentMuted,
    rate: currentRate,
    controls,
    error
  };
};
//# sourceMappingURL=useVLCPlayer.js.map