"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useVLCPlayer = void 0;
var _react = require("react");
/**
 * Hook useVLCPlayer
 * Phase 1, Semaine 3 : Contrôles de lecture avancés
 */

const useVLCPlayer = options => {
  const {
    muted = false,
    volume = 100,
    rate = 1.0,
    onStateChange,
    onError
  } = options;
  const playerRef = (0, _react.useRef)(null);

  // État local (Phase 1, Semaine 3 - état complet)
  const [state, setState] = (0, _react.useState)('idle');
  const [currentTime, setCurrentTime] = (0, _react.useState)(0);
  const [duration, _setDuration] = (0, _react.useState)(0);
  const [currentVolume, setCurrentVolume] = (0, _react.useState)(volume);
  const [currentMuted, setCurrentMuted] = (0, _react.useState)(muted);
  const [currentRate, setCurrentRate] = (0, _react.useState)(rate);
  const [error, setError] = (0, _react.useState)(null);

  // Contrôles (Phase 1, Semaine 3 - contrôles avancés)
  const controls = {
    play: (0, _react.useCallback)(async () => {
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
    pause: (0, _react.useCallback)(async () => {
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
    stop: (0, _react.useCallback)(async () => {
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
    seek: (0, _react.useCallback)(async time => {
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
    seekForward: (0, _react.useCallback)(async (seconds = 10) => {
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
    seekBackward: (0, _react.useCallback)(async (seconds = 10) => {
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
    setVolume: (0, _react.useCallback)(async newVolume => {
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
    setMuted: (0, _react.useCallback)(async newMuted => {
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
    setRate: (0, _react.useCallback)(async newRate => {
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
  (0, _react.useEffect)(() => {
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
exports.useVLCPlayer = useVLCPlayer;
//# sourceMappingURL=useVLCPlayer.js.map