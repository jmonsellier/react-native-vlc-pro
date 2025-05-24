/**
 * Hook useFullscreen pour react-native-vlc-pro
 * Phase 2, Semaine 6 : Mode plein écran natif
 */
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
declare const useFullscreen: (options?: UseFullscreenOptions) => UseFullscreenReturn;
export default useFullscreen;
//# sourceMappingURL=useFullscreen.d.ts.map