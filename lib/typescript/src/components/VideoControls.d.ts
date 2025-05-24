/**
 * Composant VideoControls pour react-native-vlc-pro
 * Phase 2, Semaine 5 : Interface utilisateur intégrée avec thèmes étendus
 */
import React from 'react';
import type { VLCPlayerTheme, CustomTheme, ControlsConfig, AccessibilityConfig } from '../types';
export interface VideoControlsProps {
    /** État de lecture actuel */
    isPlaying: boolean;
    /** Temps actuel en millisecondes */
    currentTime: number;
    /** Durée totale en millisecondes */
    duration: number;
    /** Volume actuel (0-100) */
    volume: number;
    /** État muet */
    isMuted: boolean;
    /** Vitesse de lecture */
    playbackRate: number;
    /** Mode plein écran */
    isFullscreen?: boolean;
    /** Visibilité des contrôles */
    visible?: boolean;
    /** Thème (dark/light/custom) */
    theme?: VLCPlayerTheme;
    /** Configuration de thème personnalisé */
    customTheme?: CustomTheme;
    /** Configuration des contrôles visibles */
    controlsConfig?: ControlsConfig;
    /** Configuration d'accessibilité */
    accessibilityConfig?: AccessibilityConfig;
    onPlay?: () => void;
    onPause?: () => void;
    onSeek?: (time: number) => void;
    onSeekForward?: (seconds: number) => void;
    onSeekBackward?: (seconds: number) => void;
    onVolumeChange?: (volume: number) => void;
    onMuteToggle?: () => void;
    onRateChange?: (rate: number) => void;
    onFullscreenToggle?: () => void;
}
declare const VideoControls: React.FC<VideoControlsProps>;
export default VideoControls;
//# sourceMappingURL=VideoControls.d.ts.map