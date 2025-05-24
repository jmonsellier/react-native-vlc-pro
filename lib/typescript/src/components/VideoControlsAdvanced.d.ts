/**
 * Composant VideoControls avancé pour react-native-vlc-pro
 * Phase 2, Semaine 5 : Interface utilisateur complète avec thèmes étendus
 */
import React from 'react';
import type { VLCPlayerTheme, CustomTheme, ControlsConfig, AccessibilityConfig, AudioTrack, SubtitleTrack } from '../types';
export interface VideoControlsAdvancedProps {
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
    /** Pistes audio disponibles */
    audioTracks?: AudioTrack[];
    /** Pistes de sous-titres disponibles */
    subtitleTracks?: SubtitleTrack[];
    /** Piste audio sélectionnée */
    selectedAudioTrack?: number;
    /** Piste de sous-titres sélectionnée */
    selectedSubtitleTrack?: number;
    onPlay?: () => void;
    onPause?: () => void;
    onSeek?: (time: number) => void;
    onSeekForward?: (seconds: number) => void;
    onSeekBackward?: (seconds: number) => void;
    onVolumeChange?: (volume: number) => void;
    onMuteToggle?: () => void;
    onRateChange?: (rate: number) => void;
    onFullscreenToggle?: () => void;
    onAudioTrackSelect?: (trackId: number) => void;
    onSubtitleTrackSelect?: (trackId: number) => void;
}
declare const VideoControlsAdvanced: React.FC<VideoControlsAdvancedProps>;
export default VideoControlsAdvanced;
//# sourceMappingURL=VideoControlsAdvanced.d.ts.map