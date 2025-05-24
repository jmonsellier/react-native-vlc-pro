/**
 * Types pour les événements du lecteur VLC
 */
export interface ProgressData {
    /** Position actuelle en millisecondes */
    currentTime: number;
    /** Durée totale en millisecondes */
    duration: number;
    /** Position en pourcentage (0-1) */
    position: number;
    /** Temps restant en millisecondes */
    remainingTime: number;
}
export interface LoadData {
    /** Durée du média en millisecondes */
    duration: number;
    /** Largeur de la vidéo */
    width?: number;
    /** Hauteur de la vidéo */
    height?: number;
    /** Ratio d'aspect */
    aspectRatio?: string;
    /** Framerate */
    fps?: number;
    /** Bitrate */
    bitrate?: number;
    /** Indique si le média peut être lu */
    canPlayFast: boolean;
    /** Indique si le média peut être lu lentement */
    canPlaySlow: boolean;
    /** Indique si le média peut être mis en pause */
    canPause: boolean;
    /** Indique si le média peut être recherché */
    canSeek: boolean;
}
export interface BufferData {
    /** Pourcentage de buffer (0-100) */
    bufferPercentage: number;
    /** Temps de buffer en millisecondes */
    bufferTime: number;
    /** Indique si le lecteur est en train de buffering */
    isBuffering: boolean;
}
export interface VLCError {
    /** Code d'erreur */
    code: number;
    /** Message d'erreur */
    message: string;
    /** Domaine de l'erreur */
    domain?: string;
    /** Informations additionnelles */
    userInfo?: Record<string, unknown>;
}
export interface SeekData {
    /** Position de destination en millisecondes */
    targetTime: number;
    /** Position actuelle en millisecondes */
    currentTime: number;
}
export interface VolumeData {
    /** Volume (0-100) */
    volume: number;
    /** Indique si le son est coupé */
    muted: boolean;
}
export interface PlaybackRateData {
    /** Vitesse de lecture (0.25 - 4.0) */
    rate: number;
}
export interface FullscreenData {
    /** Indique si le lecteur est en plein écran */
    isFullscreen: boolean;
}
export interface SubtitleData {
    /** ID de la piste de sous-titres sélectionnée */
    trackId: number;
    /** Nom de la piste */
    trackName?: string;
    /** Langue de la piste */
    language?: string;
}
export interface AudioTrackData {
    /** ID de la piste audio sélectionnée */
    trackId: number;
    /** Nom de la piste */
    trackName?: string;
    /** Langue de la piste */
    language?: string;
}
export type VLCPlayerState = 'idle' | 'loading' | 'ready' | 'playing' | 'paused' | 'stopped' | 'ended' | 'error' | 'buffering';
export interface StateChangeData {
    /** Nouvel état du lecteur */
    state: VLCPlayerState;
    /** État précédent */
    previousState: VLCPlayerState;
}
//# sourceMappingURL=Events.d.ts.map