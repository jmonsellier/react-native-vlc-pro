function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Composant VLCPlayer principal
 * Utilise le module natif VLCPlayerNative avec une interface simplifiée
 */

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import VLCPlayerNative from './VLCPlayerNative';
const VLCPlayer = /*#__PURE__*/forwardRef((props, ref) => {
  const nativeRef = useRef(null);

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
    seek: async time => {
      return nativeRef.current?.seek(time) || Promise.resolve();
    },
    seekForward: async seconds => {
      return nativeRef.current?.seekForward(seconds) || Promise.resolve();
    },
    seekBackward: async seconds => {
      return nativeRef.current?.seekBackward(seconds) || Promise.resolve();
    },
    // Contrôles audio/vidéo
    setVolume: async volume => {
      return nativeRef.current?.setVolume(volume) || Promise.resolve();
    },
    setMuted: async muted => {
      return nativeRef.current?.setMuted(muted) || Promise.resolve();
    },
    setRate: async rate => {
      return nativeRef.current?.setRate(rate) || Promise.resolve();
    },
    // Pistes
    setSubtitleTrack: async trackId => {
      return nativeRef.current?.setSubtitleTrack(trackId) || Promise.resolve();
    },
    setAudioTrack: async trackId => {
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
      return nativeRef.current?.getState() || Promise.resolve('idle');
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
    }
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
  const handleError = error => {
    console.log('VLCPlayer: onError', error);
    props.onError?.(error);
  };
  const handleProgress = progress => {
    // Log moins fréquent pour éviter le spam
    if (progress.currentTime % 5000 < 100) {
      console.log('VLCPlayer: onProgress', Math.round(progress.currentTime / 1000) + 's');
    }
    props.onProgress?.(progress);
  };
  const handleBuffer = bufferData => {
    console.log('VLCPlayer: onBuffer', bufferData);
    props.onBuffer?.(bufferData);
  };
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, props.style]
  }, /*#__PURE__*/React.createElement(VLCPlayerNative, _extends({
    ref: nativeRef
  }, props, {
    style: styles.player,
    onReady: handleReady,
    onPlay: handlePlay,
    onPause: handlePause,
    onStop: handleStop,
    onEnd: handleEnd,
    onError: handleError,
    onProgress: handleProgress,
    onBuffer: handleBuffer
  })));
});
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000'
  },
  player: {
    flex: 1
  }
});
VLCPlayer.displayName = 'VLCPlayer';
export default VLCPlayer;
//# sourceMappingURL=VLCPlayer.js.map