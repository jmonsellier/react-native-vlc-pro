"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /**
 * Composant VLCPlayer natif
 * Phase 1, Semaine 2 : Intégration des vues natives iOS/Android
 */
// Import de la vue native
const VLCPlayerNativeView = (0, _reactNative.requireNativeComponent)('VLCPlayerView');
const VLCPlayerNative = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
  const nativeRef = (0, _react.useRef)(null);

  // Gestionnaire de promesses pour les méthodes d'information
  const pendingPromises = (0, _react.useRef)(new Map());

  // Gestionnaires d'événements pour les réponses
  const handleGetCurrentTime = event => {
    const resolve = pendingPromises.current.get('getCurrentTime');
    if (resolve && event.nativeEvent?.currentTime !== undefined) {
      resolve(event.nativeEvent.currentTime);
      pendingPromises.current.delete('getCurrentTime');
    }
    props.onGetCurrentTime?.(event.nativeEvent);
  };
  const handleGetDuration = event => {
    const resolve = pendingPromises.current.get('getDuration');
    if (resolve && event.nativeEvent?.duration !== undefined) {
      resolve(event.nativeEvent.duration);
      pendingPromises.current.delete('getDuration');
    }
    props.onGetDuration?.(event.nativeEvent);
  };
  const handleGetState = event => {
    const resolve = pendingPromises.current.get('getState');
    if (resolve && event.nativeEvent?.state !== undefined) {
      resolve(event.nativeEvent.state);
      pendingPromises.current.delete('getState');
    }
    props.onGetState?.(event.nativeEvent);
  };
  const handleGetVolume = event => {
    const resolve = pendingPromises.current.get('getVolume');
    if (resolve && event.nativeEvent?.volume !== undefined) {
      resolve(event.nativeEvent.volume);
      pendingPromises.current.delete('getVolume');
    }
    props.onGetVolume?.(event.nativeEvent);
  };
  const handleIsMuted = event => {
    const resolve = pendingPromises.current.get('isMuted');
    if (resolve && event.nativeEvent?.muted !== undefined) {
      resolve(event.nativeEvent.muted);
      pendingPromises.current.delete('isMuted');
    }
    props.onIsMuted?.(event.nativeEvent);
  };
  const handleGetRate = event => {
    const resolve = pendingPromises.current.get('getRate');
    if (resolve && event.nativeEvent?.rate !== undefined) {
      resolve(event.nativeEvent.rate);
      pendingPromises.current.delete('getRate');
    }
    props.onGetRate?.(event.nativeEvent);
  };
  const handleFullscreenChange = event => {
    props.onFullscreenChange?.(event.nativeEvent);
  };
  const handlePictureInPictureChange = event => {
    props.onPictureInPictureChange?.(event.nativeEvent);
  };

  // Implémentation des méthodes de référence
  (0, _react.useImperativeHandle)(ref, () => {
    const seek = async time => {
      const nodeHandle = (0, _reactNative.findNodeHandle)(nativeRef.current);
      if (nodeHandle) {
        _reactNative.UIManager.dispatchViewManagerCommand(nodeHandle, 'seek', [time]);
      }
    };
    const getCurrentTime = async () => {
      const nodeHandle = (0, _reactNative.findNodeHandle)(nativeRef.current);
      if (nodeHandle) {
        return new Promise(resolve => {
          pendingPromises.current.set('getCurrentTime', resolve);
          _reactNative.UIManager.dispatchViewManagerCommand(nodeHandle, 'getCurrentTime', []);

          // Timeout de sécurité
          setTimeout(() => {
            if (pendingPromises.current.has('getCurrentTime')) {
              pendingPromises.current.delete('getCurrentTime');
              resolve(0);
            }
          }, 1000);
        });
      }
      return 0;
    };
    return {
      // Contrôles de lecture
      play: async () => {
        const nodeHandle = (0, _reactNative.findNodeHandle)(nativeRef.current);
        if (nodeHandle) {
          _reactNative.UIManager.dispatchViewManagerCommand(nodeHandle, 'play', []);
        }
      },
      pause: async () => {
        const nodeHandle = (0, _reactNative.findNodeHandle)(nativeRef.current);
        if (nodeHandle) {
          _reactNative.UIManager.dispatchViewManagerCommand(nodeHandle, 'pause', []);
        }
      },
      stop: async () => {
        const nodeHandle = (0, _reactNative.findNodeHandle)(nativeRef.current);
        if (nodeHandle) {
          _reactNative.UIManager.dispatchViewManagerCommand(nodeHandle, 'stop', []);
        }
      },
      seek,
      seekForward: async (seconds = 10) => {
        try {
          const currentTime = await getCurrentTime();
          const newTime = currentTime + seconds * 1000;
          await seek(newTime);
        } catch (error) {
          console.error('VLCPlayerNative: seekForward error:', error);
        }
      },
      seekBackward: async (seconds = 10) => {
        try {
          const currentTime = await getCurrentTime();
          const newTime = Math.max(0, currentTime - seconds * 1000);
          await seek(newTime);
        } catch (error) {
          console.error('VLCPlayerNative: seekBackward error:', error);
        }
      },
      // Contrôles audio/vidéo
      setVolume: async volume => {
        const nodeHandle = (0, _reactNative.findNodeHandle)(nativeRef.current);
        if (nodeHandle) {
          _reactNative.UIManager.dispatchViewManagerCommand(nodeHandle, 'setVolume', [volume]);
        } else {
          console.warn('VLCPlayerNative: nativeRef.current is null, cannot setVolume');
        }
      },
      setMuted: async muted => {
        const nodeHandle = (0, _reactNative.findNodeHandle)(nativeRef.current);
        if (nodeHandle) {
          _reactNative.UIManager.dispatchViewManagerCommand(nodeHandle, 'setMuted', [muted]);
        } else {
          console.warn('VLCPlayerNative: nativeRef.current is null, cannot setMuted');
        }
      },
      setRate: async rate => {
        const nodeHandle = (0, _reactNative.findNodeHandle)(nativeRef.current);
        if (nodeHandle) {
          _reactNative.UIManager.dispatchViewManagerCommand(nodeHandle, 'setRate', [rate]);
        } else {
          console.warn('VLCPlayerNative: nativeRef.current is null, cannot setRate');
        }
      },
      // Pistes
      setSubtitleTrack: async trackId => {
        // TODO: Phase 2 - Implémenter setSubtitleTrack
        console.log(`VLCPlayerNative: setSubtitleTrack(${trackId}) - À implémenter en Phase 2`);
      },
      setAudioTrack: async trackId => {
        // TODO: Phase 2 - Implémenter setAudioTrack
        console.log(`VLCPlayerNative: setAudioTrack(${trackId}) - À implémenter en Phase 2`);
      },
      // Interface
      toggleFullscreen: async () => {
        const nodeHandle = (0, _reactNative.findNodeHandle)(nativeRef.current);
        if (nodeHandle) {
          _reactNative.UIManager.dispatchViewManagerCommand(nodeHandle, 'toggleFullscreen', []);
        } else {
          console.warn('VLCPlayerNative: nativeRef.current is null, cannot toggleFullscreen');
        }
      },
      enterPictureInPicture: async () => {
        const nodeHandle = (0, _reactNative.findNodeHandle)(nativeRef.current);
        if (nodeHandle) {
          _reactNative.UIManager.dispatchViewManagerCommand(nodeHandle, 'enterPictureInPicture', []);
        } else {
          console.warn('VLCPlayerNative: nativeRef.current is null, cannot enterPictureInPicture');
        }
      },
      takeSnapshot: async () => {
        // TODO: Phase 2 - Implémenter takeSnapshot
        console.log('VLCPlayerNative: takeSnapshot() - À implémenter en Phase 2');
        return '';
      },
      // Informations
      getState: async () => {
        const nodeHandle = (0, _reactNative.findNodeHandle)(nativeRef.current);
        if (nodeHandle) {
          return new Promise(resolve => {
            pendingPromises.current.set('getState', resolve);
            _reactNative.UIManager.dispatchViewManagerCommand(nodeHandle, 'getState', []);
            setTimeout(() => {
              if (pendingPromises.current.has('getState')) {
                pendingPromises.current.delete('getState');
                resolve('idle');
              }
            }, 1000);
          });
        }
        return 'idle';
      },
      getCurrentTime,
      getDuration: async () => {
        const nodeHandle = (0, _reactNative.findNodeHandle)(nativeRef.current);
        if (nodeHandle) {
          return new Promise(resolve => {
            pendingPromises.current.set('getDuration', resolve);
            _reactNative.UIManager.dispatchViewManagerCommand(nodeHandle, 'getDuration', []);
            setTimeout(() => {
              if (pendingPromises.current.has('getDuration')) {
                pendingPromises.current.delete('getDuration');
                resolve(0);
              }
            }, 1000);
          });
        }
        return 0;
      },
      getMediaInfo: async () => {
        // TODO: Phase 1, Semaine 4 - Implémenter getMediaInfo
        console.log('VLCPlayerNative: getMediaInfo() - À implémenter en Phase 1, Semaine 4');
        return {
          duration: 0
        };
      },
      getVolume: async () => {
        const nodeHandle = (0, _reactNative.findNodeHandle)(nativeRef.current);
        if (nodeHandle) {
          return new Promise(resolve => {
            pendingPromises.current.set('getVolume', resolve);
            _reactNative.UIManager.dispatchViewManagerCommand(nodeHandle, 'getVolume', []);
            setTimeout(() => {
              if (pendingPromises.current.has('getVolume')) {
                pendingPromises.current.delete('getVolume');
                resolve(props.volume || 100);
              }
            }, 1000);
          });
        }
        return props.volume || 100;
      },
      isMuted: async () => {
        const nodeHandle = (0, _reactNative.findNodeHandle)(nativeRef.current);
        if (nodeHandle) {
          return new Promise(resolve => {
            pendingPromises.current.set('isMuted', resolve);
            _reactNative.UIManager.dispatchViewManagerCommand(nodeHandle, 'isMuted', []);
            setTimeout(() => {
              if (pendingPromises.current.has('isMuted')) {
                pendingPromises.current.delete('isMuted');
                resolve(props.muted || false);
              }
            }, 1000);
          });
        }
        return props.muted || false;
      },
      getRate: async () => {
        const nodeHandle = (0, _reactNative.findNodeHandle)(nativeRef.current);
        if (nodeHandle) {
          return new Promise(resolve => {
            pendingPromises.current.set('getRate', resolve);
            _reactNative.UIManager.dispatchViewManagerCommand(nodeHandle, 'getRate', []);
            setTimeout(() => {
              if (pendingPromises.current.has('getRate')) {
                pendingPromises.current.delete('getRate');
                resolve(props.rate || 1.0);
              }
            }, 1000);
          });
        }
        return props.rate || 1.0;
      }
    };
  });
  return /*#__PURE__*/_react.default.createElement(VLCPlayerNativeView, _extends({
    ref: nativeRef
  }, props, {
    onGetCurrentTime: handleGetCurrentTime,
    onGetDuration: handleGetDuration,
    onGetState: handleGetState,
    onGetVolume: handleGetVolume,
    onIsMuted: handleIsMuted,
    onGetRate: handleGetRate,
    onFullscreenChange: handleFullscreenChange,
    onPictureInPictureChange: handlePictureInPictureChange
  }));
});
VLCPlayerNative.displayName = 'VLCPlayerNative';
var _default = exports.default = VLCPlayerNative;
//# sourceMappingURL=VLCPlayerNative.js.map