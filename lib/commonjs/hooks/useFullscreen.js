"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactNative = require("react-native");
/**
 * Hook useFullscreen pour react-native-vlc-pro
 * Phase 2, Semaine 6 : Mode plein écran natif
 */

const useFullscreen = (options = {}) => {
  const {
    hideStatusBar = true,
    orientation = 'auto',
    onFullscreenChange
  } = options;
  const [isFullscreen, setIsFullscreen] = (0, _react.useState)(false);
  const [screenDimensions, setScreenDimensions] = (0, _react.useState)(() => {
    const {
      width,
      height
    } = _reactNative.Dimensions.get('window');
    return {
      width,
      height
    };
  });

  // Écouter les changements de dimensions
  (0, _react.useEffect)(() => {
    const subscription = _reactNative.Dimensions.addEventListener('change', ({
      window
    }) => {
      setScreenDimensions({
        width: window.width,
        height: window.height
      });
    });
    return () => subscription?.remove();
  }, []);

  // Gérer la barre de statut
  (0, _react.useEffect)(() => {
    if (_reactNative.Platform.OS === 'ios') {
      _reactNative.StatusBar.setHidden(isFullscreen && hideStatusBar, 'slide');
    } else {
      _reactNative.StatusBar.setHidden(isFullscreen && hideStatusBar);
    }
  }, [isFullscreen, hideStatusBar]);

  // Callback de changement d'état
  (0, _react.useEffect)(() => {
    onFullscreenChange?.(isFullscreen);
  }, [isFullscreen, onFullscreenChange]);
  const enterFullscreen = (0, _react.useCallback)(() => {
    setIsFullscreen(true);
  }, []);
  const exitFullscreen = (0, _react.useCallback)(() => {
    setIsFullscreen(false);
  }, []);
  const toggleFullscreen = (0, _react.useCallback)(() => {
    setIsFullscreen(prev => !prev);
  }, []);
  return {
    isFullscreen,
    toggleFullscreen,
    enterFullscreen,
    exitFullscreen,
    screenDimensions
  };
};
var _default = exports.default = useFullscreen;
//# sourceMappingURL=useFullscreen.js.map