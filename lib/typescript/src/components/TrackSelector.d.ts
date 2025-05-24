/**
 * Composant TrackSelector pour react-native-vlc-pro
 * Phase 2, Semaine 6 : Gestion des pistes audio/sous-titres
 */
import React from 'react';
import type { AudioTrack, SubtitleTrack, VLCPlayerTheme, CustomTheme } from '../types';
export interface TrackSelectorProps {
    /** Pistes audio disponibles */
    audioTracks: AudioTrack[];
    /** Pistes de sous-titres disponibles */
    subtitleTracks: SubtitleTrack[];
    /** Piste audio sélectionnée */
    selectedAudioTrack?: number;
    /** Piste de sous-titres sélectionnée */
    selectedSubtitleTrack?: number;
    /** Visibilité du sélecteur */
    visible: boolean;
    /** Thème */
    theme?: VLCPlayerTheme;
    /** Thème personnalisé */
    customTheme?: CustomTheme;
    onAudioTrackSelect?: (trackId: number) => void;
    onSubtitleTrackSelect?: (trackId: number) => void;
    onClose?: () => void;
}
declare const TrackSelector: React.FC<TrackSelectorProps>;
export default TrackSelector;
//# sourceMappingURL=TrackSelector.d.ts.map