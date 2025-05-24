/**
 * Composant VLCPlayer principal
 * Utilise le module natif VLCPlayerNative avec une interface simplifiée
 */

import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import VLCPlayerNative from './VLCPlayerNative';
import type { VLCPlayerProps, VLCPlayerRef } from '../types';

const VLCPlayer = forwardRef<VLCPlayerRef, VLCPlayerProps>((props, ref) => {
  const nativeRef = useRef<VLCPlayerRef>(null);

  // Transférer toutes les méthodes de référence au composant natif
  useImperativeHandle(ref, () => ({
    // Contrôles de lecture
    play: async () => {
      return nativeRef.current?.play() || Promise.resolve();
    },
    pause: async () => {
      return nativeRef.current?.pause() || Promise.resolve();
    },
    stop: async () => {
      return nativeRef.current?.stop() || Promise.resolve();
    },
    seek: async (time: number) => {
      return nativeRef.current?.seek(time) || Promise.resolve();
    },
    seekForward: async (seconds?: number) => {
      return nativeRef.current?.seekForward(seconds) || Promise.resolve();
    },
    seekBackward: async (seconds?: number) => {
      return nativeRef.current?.seekBackward(seconds) || Promise.resolve();
    },

    // Contrôles audio/vidéo
    setVolume: async (volume: number) => {
      return nativeRef.current?.setVolume(volume) || Promise.resolve();
    },
    setMuted: async (muted: boolean) => {
      return nativeRef.current?.setMuted(muted) || Promise.resolve();
    },
    setRate: async (rate: number) => {
      return nativeRef.current?.setRate(rate) || Promise.resolve();
    },

    // Pistes
    setSubtitleTrack: async (trackId: number) => {
      return nativeRef.current?.setSubtitleTrack(trackId) || Promise.resolve();
    },
    setAudioTrack: async (trackId: number) => {
      return nativeRef.current?.setAudioTrack(trackId) || Promise.resolve();
    },

    // Interface
    toggleFullscreen: async () => {
      return nativeRef.current?.toggleFullscreen() || Promise.resolve();
    },
    enterPictureInPicture: async () => {
      return nativeRef.current?.enterPictureInPicture() || Promise.resolve();
    },
    takeSnapshot: async () => {
      return nativeRef.current?.takeSnapshot() || Promise.resolve('');
    },

    // Informations
    getState: async () => {
      return nativeRef.current?.getState() || Promise.resolve('idle' as const);
    },
    getCurrentTime: async () => {
      return nativeRef.current?.getCurrentTime() || Promise.resolve(0);
    },
    getDuration: async () => {
      return nativeRef.current?.getDuration() || Promise.resolve(0);
    },
    getMediaInfo: async () => {
      return nativeRef.current?.getMediaInfo() || Promise.resolve({
        title: '',
        duration: 0,
        videoTracks: [],
        audioTracks: [],
        subtitleTracks: []
      });
    },
    getVolume: async () => {
      return nativeRef.current?.getVolume() || Promise.resolve(100);
    },
    isMuted: async () => {
      return nativeRef.current?.isMuted() || Promise.resolve(false);
    },
    getRate: async () => {
      return nativeRef.current?.getRate() || Promise.resolve(1.0);
    },
  }), []);

  // Gestionnaires d'événements avec logs pour debug
  const handleReady = () => {
    console.log('VLCPlayer: onReady');
    props.onReady?.();
  };

  const handlePlay = () => {
    console.log('VLCPlayer: onPlay');
    props.onPlay?.();
  };

  const handlePause = () => {
    console.log('VLCPlayer: onPause');
    props.onPause?.();
  };

  const handleStop = () => {
    console.log('VLCPlayer: onStop');
    props.onStop?.();
  };

  const handleEnd = () => {
    console.log('VLCPlayer: onEnd');
    props.onEnd?.();
  };

  const handleError = (error: any) => {
    console.log('VLCPlayer: onError', error);
    props.onError?.(error);
  };

  const handleProgress = (progress: any) => {
    // Log moins fréquent pour éviter le spam
    if (progress.currentTime % 5000 < 100) {
      console.log('VLCPlayer: onProgress', Math.round(progress.currentTime / 1000) + 's');
    }
    props.onProgress?.(progress);
  };

  const handleBuffer = (bufferData: any) => {
    console.log('VLCPlayer: onBuffer', bufferData);
    props.onBuffer?.(bufferData);
  };

  return (
    <View style={[styles.container, props.style]}>
      <VLCPlayerNative
        ref={nativeRef}
        {...props}
        style={styles.player}
        onReady={handleReady}
        onPlay={handlePlay}
        onPause={handlePause}
        onStop={handleStop}
        onEnd={handleEnd}
        onError={handleError}
        onProgress={handleProgress}
        onBuffer={handleBuffer}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
  },
  player: {
    flex: 1,
  },
});

VLCPlayer.displayName = 'VLCPlayer';

export default VLCPlayer;
