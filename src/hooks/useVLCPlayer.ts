/**
 * Hook useVLCPlayer
 * Phase 1, Semaine 3 : Contrôles de lecture avancés
 */

import { useRef, useState, useCallback, useEffect } from 'react';
import type {
  VLCPlayerRef,
  MediaSource,
  PlayerState,
  ProgressData,
  VLCError,
} from '../types';

export interface UseVLCPlayerOptions {
  /** Source média */
  source: MediaSource;
  /** Lecture automatique */
  autoPlay?: boolean;
  /** Lecture en boucle */
  loop?: boolean;
  /** Son coupé */
  muted?: boolean;
  /** Volume initial (0-100) */
  volume?: number;
  /** Vitesse de lecture */
  rate?: number;
  /** Callback de progression */
  onProgress?: (data: ProgressData) => void;
  /** Callback de changement d'état */
  onStateChange?: (state: PlayerState) => void;
  /** Callback d'erreur */
  onError?: (error: VLCError) => void;
}

export interface UseVLCPlayerReturn {
  /** Référence vers le lecteur */
  playerRef: { current: VLCPlayerRef | null };
  /** État actuel du lecteur */
  state: PlayerState;
  /** Position actuelle en millisecondes */
  currentTime: number;
  /** Durée totale en millisecondes */
  duration: number;
  /** Volume actuel */
  volume: number;
  /** Son coupé */
  muted: boolean;
  /** Vitesse de lecture */
  rate: number;
  /** Contrôles du lecteur */
  controls: {
    play: () => Promise<void>;
    pause: () => Promise<void>;
    stop: () => Promise<void>;
    seek: (time: number) => Promise<void>;
    seekForward: (seconds?: number) => Promise<void>;
    seekBackward: (seconds?: number) => Promise<void>;
    setVolume: (volume: number) => Promise<void>;
    setMuted: (muted: boolean) => Promise<void>;
    setRate: (rate: number) => Promise<void>;
  };
  /** Erreur actuelle */
  error: VLCError | null;
}

export const useVLCPlayer = (
  options: UseVLCPlayerOptions
): UseVLCPlayerReturn => {
  const {
    muted = false,
    volume = 100,
    rate = 1.0,
    onStateChange,
    onError,
  } = options;

  const playerRef = useRef<VLCPlayerRef>(null);

  // État local (Phase 1, Semaine 3 - état complet)
  const [state, setState] = useState<PlayerState>('idle');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, _setDuration] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(volume);
  const [currentMuted, setCurrentMuted] = useState(muted);
  const [currentRate, setCurrentRate] = useState(rate);
  const [error, setError] = useState<VLCError | null>(null);

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
        const vlcError = err as VLCError;
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
        const vlcError = err as VLCError;
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
        const vlcError = err as VLCError;
        setError(vlcError);
        onError?.(vlcError);
      }
    }, [onError]),

    seek: useCallback(
      async (time: number) => {
        try {
          if (playerRef.current) {
            await playerRef.current.seek(time);
            setCurrentTime(time);
            setError(null);
          }
        } catch (err) {
          const vlcError = err as VLCError;
          setError(vlcError);
          onError?.(vlcError);
        }
      },
      [onError]
    ),

    seekForward: useCallback(
      async (seconds = 10) => {
        try {
          if (playerRef.current) {
            await playerRef.current.seekForward(seconds);
            setError(null);
          }
        } catch (err) {
          const vlcError = err as VLCError;
          setError(vlcError);
          onError?.(vlcError);
        }
      },
      [onError]
    ),

    seekBackward: useCallback(
      async (seconds = 10) => {
        try {
          if (playerRef.current) {
            await playerRef.current.seekBackward(seconds);
            setError(null);
          }
        } catch (err) {
          const vlcError = err as VLCError;
          setError(vlcError);
          onError?.(vlcError);
        }
      },
      [onError]
    ),

    setVolume: useCallback(
      async (newVolume: number) => {
        try {
          if (playerRef.current) {
            await playerRef.current.setVolume(newVolume);
            setCurrentVolume(newVolume);
            setError(null);
          }
        } catch (err) {
          const vlcError = err as VLCError;
          setError(vlcError);
          onError?.(vlcError);
        }
      },
      [onError]
    ),

    setMuted: useCallback(
      async (newMuted: boolean) => {
        try {
          if (playerRef.current) {
            await playerRef.current.setMuted(newMuted);
            setCurrentMuted(newMuted);
            setError(null);
          }
        } catch (err) {
          const vlcError = err as VLCError;
          setError(vlcError);
          onError?.(vlcError);
        }
      },
      [onError]
    ),

    setRate: useCallback(
      async (newRate: number) => {
        try {
          if (playerRef.current) {
            await playerRef.current.setRate(newRate);
            setCurrentRate(newRate);
            setError(null);
          }
        } catch (err) {
          const vlcError = err as VLCError;
          setError(vlcError);
          onError?.(vlcError);
        }
      },
      [onError]
    ),
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
    error,
  };
};
