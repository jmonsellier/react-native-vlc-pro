/**
 * Hook useFullscreen pour react-native-vlc-pro
 * Phase 2, Semaine 6 : Mode plein écran natif
 */

import { useState, useCallback, useEffect } from 'react';
import { Dimensions, StatusBar, Platform } from 'react-native';

export interface UseFullscreenOptions {
  /** Masquer la barre de statut en plein écran */
  hideStatusBar?: boolean;
  /** Orientation forcée en plein écran */
  orientation?: 'landscape' | 'portrait' | 'auto';
  /** Callback appelé lors du changement */
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

export interface UseFullscreenReturn {
  /** État actuel du plein écran */
  isFullscreen: boolean;
  /** Basculer en plein écran */
  toggleFullscreen: () => void;
  /** Entrer en plein écran */
  enterFullscreen: () => void;
  /** Sortir du plein écran */
  exitFullscreen: () => void;
  /** Dimensions de l'écran */
  screenDimensions: {
    width: number;
    height: number;
  };
}

const useFullscreen = (options: UseFullscreenOptions = {}): UseFullscreenReturn => {
  const {
    hideStatusBar = true,
    orientation = 'auto',
    onFullscreenChange,
  } = options;

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [screenDimensions, setScreenDimensions] = useState(() => {
    const { width, height } = Dimensions.get('window');
    return { width, height };
  });

  // Écouter les changements de dimensions
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenDimensions({
        width: window.width,
        height: window.height,
      });
    });

    return () => subscription?.remove();
  }, []);

  // Gérer la barre de statut
  useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBar.setHidden(isFullscreen && hideStatusBar, 'slide');
    } else {
      StatusBar.setHidden(isFullscreen && hideStatusBar);
    }
  }, [isFullscreen, hideStatusBar]);

  // Callback de changement d'état
  useEffect(() => {
    onFullscreenChange?.(isFullscreen);
  }, [isFullscreen, onFullscreenChange]);

  const enterFullscreen = useCallback(() => {
    setIsFullscreen(true);
  }, []);

  const exitFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  return {
    isFullscreen,
    toggleFullscreen,
    enterFullscreen,
    exitFullscreen,
    screenDimensions,
  };
};

export default useFullscreen; 