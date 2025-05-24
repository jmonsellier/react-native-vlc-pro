"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _VLCPlayerNative = _interopRequireDefault(require("./VLCPlayerNative"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /**
 * Composant VLCPlayer principal
 * Utilise le module natif VLCPlayerNative avec une interface simplifiée
 */
const VLCPlayer = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
  const nativeRef = (0, _react.useRef)(null);

  // Transférer toutes les méthodes de référence au composant natif
  (0, _react.useImperativeHandle)(ref, () => ({
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
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, props.style]
  }, /*#__PURE__*/_react.default.createElement(_VLCPlayerNative.default, _extends({
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
const styles = _reactNative.StyleSheet.create({
  container: {
    backgroundColor: '#000000'
  },
  player: {
    flex: 1
  }
});
VLCPlayer.displayName = 'VLCPlayer';
var _default = exports.default = VLCPlayer;
//# sourceMappingURL=VLCPlayer.js.map