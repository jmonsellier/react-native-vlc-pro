/**
 * Types principaux pour le composant VLCPlayer
 */
import type { ViewStyle } from 'react-native';
import type { MediaSource, MediaInfo } from './Media';
import type { ProgressData, LoadData, BufferData, VLCError, VLCPlayerState as PlayerState, StateChangeData, SeekData, VolumeData, PlaybackRateData, FullscreenData, SubtitleData, AudioTrackData } from './Events';
import type { VLCPlayerConfig } from './Config';
export interface VLCPlayerProps {
    /** Source média à lire */
    source: MediaSource;
    /** Style du composant */
    style?: ViewStyle;
    /** ID de test pour les tests automatisés */
    testID?: string;
    /** Lecture automatique */
    autoPlay?: boolean;
    /** Lecture en boucle */
    loop?: boolean;
    /** Son coupé */
    muted?: boolean;
    /** Volume (0-100) */
    volume?: number;
    /** Vitesse de lecture (0.25-4.0) */
    rate?: number;
    /** Pause/lecture */
    paused?: boolean;
    /** Position de lecture en millisecondes */
    seek?: number;
    /** Configuration du lecteur */
    config?: VLCPlayerConfig;
    /** Afficher les contrôles */
    showControls?: boolean;
    /** Timeout des contrôles en millisecondes */
    controlsTimeout?: number;
    /** Autoriser le plein écran */
    allowFullscreen?: boolean;
    /** Thème */
    theme?: 'light' | 'dark' | 'auto';
    /** Piste de sous-titres sélectionnée */
    subtitleTrack?: number;
    /** Piste audio sélectionnée */
    audioTrack?: number;
    /** Appelé quand le lecteur est prêt */
    onReady?: () => void;
    /** Appelé quand la lecture commence */
    onPlay?: () => void;
    /** Appelé quand la lecture est mise en pause */
    onPause?: () => void;
    /** Appelé quand la lecture s'arrête */
    onStop?: () => void;
    /** Appelé quand la lecture se termine */
    onEnd?: () => void;
    /** Appelé en cas d'erreur */
    onError?: (error: VLCError) => void;
    /** Appelé pendant la lecture pour indiquer la progression */
    onProgress?: (progress: ProgressData) => void;
    /** Appelé quand les métadonnées sont chargées */
    onLoad?: (loadData: LoadData) => void;
    /** Appelé pendant le buffering */
    onBuffer?: (bufferData: BufferData) => void;
    /** Appelé quand l'état change */
    onStateChange?: (stateData: StateChangeData) => void;
    /** Appelé lors d'un seek */
    onSeek?: (seekData: SeekData) => void;
    /** Appelé quand le volume change */
    onVolumeChange?: (volumeData: VolumeData) => void;
    /** Appelé quand la vitesse de lecture change */
    onRateChange?: (rateData: PlaybackRateData) => void;
    /** Appelé quand le mode plein écran change */
    onFullscreenChange?: (fullscreenData: FullscreenData) => void;
    /** Appelé quand la piste de sous-titres change */
    onSubtitleTrackChange?: (subtitleData: SubtitleData) => void;
    /** Appelé quand la piste audio change */
    onAudioTrackChange?: (audioData: AudioTrackData) => void;
    /** Appelé en réponse à getCurrentTime() */
    onGetCurrentTime?: (data: {
        currentTime: number;
    }) => void;
    /** Appelé en réponse à getDuration() */
    onGetDuration?: (data: {
        duration: number;
    }) => void;
    /** Appelé en réponse à getState() */
    onGetState?: (data: {
        state: PlayerState;
    }) => void;
    /** Appelé en réponse à getVolume() */
    onGetVolume?: (data: {
        volume: number;
    }) => void;
    /** Appelé en réponse à isMuted() */
    onIsMuted?: (data: {
        muted: boolean;
    }) => void;
    /** Appelé en réponse à getRate() */
    onGetRate?: (data: {
        rate: number;
    }) => void;
}
export interface VLCPlayerRef {
    /** Démarrer la lecture */
    play: () => Promise<void>;
    /** Mettre en pause */
    pause: () => Promise<void>;
    /** Arrêter la lecture */
    stop: () => Promise<void>;
    /** Aller à une position spécifique */
    seek: (time: number) => Promise<void>;
    /** Avancer de X secondes */
    seekForward: (seconds?: number) => Promise<void>;
    /** Reculer de X secondes */
    seekBackward: (seconds?: number) => Promise<void>;
    /** Définir le volume */
    setVolume: (volume: number) => Promise<void>;
    /** Couper/rétablir le son */
    setMuted: (muted: boolean) => Promise<void>;
    /** Définir la vitesse de lecture */
    setRate: (rate: number) => Promise<void>;
    /** Sélectionner une piste de sous-titres */
    setSubtitleTrack: (trackId: number) => Promise<void>;
    /** Sélectionner une piste audio */
    setAudioTrack: (trackId: number) => Promise<void>;
    /** Basculer en plein écran */
    toggleFullscreen: () => Promise<void>;
    /** Prendre une capture d'écran */
    takeSnapshot: () => Promise<string>;
    /** Obtenir l'état actuel */
    getState: () => Promise<PlayerState>;
    /** Obtenir la position actuelle */
    getCurrentTime: () => Promise<number>;
    /** Obtenir la durée totale */
    getDuration: () => Promise<number>;
    /** Obtenir les informations du média */
    getMediaInfo: () => Promise<MediaInfo>;
    /** Obtenir le volume actuel */
    getVolume: () => Promise<number>;
    /** Vérifier si le son est coupé */
    isMuted: () => Promise<boolean>;
    /** Obtenir la vitesse de lecture */
    getRate: () => Promise<number>;
}
export interface VLCPlayerState {
    /** État actuel du lecteur */
    state: PlayerState;
    /** Position actuelle en millisecondes */
    currentTime: number;
    /** Durée totale en millisecondes */
    duration: number;
    /** Volume actuel (0-100) */
    volume: number;
    /** Son coupé */
    muted: boolean;
    /** Vitesse de lecture */
    rate: number;
    /** En plein écran */
    isFullscreen: boolean;
    /** En cours de buffering */
    isBuffering: boolean;
    /** Piste de sous-titres actuelle */
    currentSubtitleTrack?: number;
    /** Piste audio actuelle */
    currentAudioTrack?: number;
    /** Informations du média */
    mediaInfo?: MediaInfo;
    /** Dernière erreur */
    error?: VLCError;
}
/** Thèmes disponibles pour l'interface utilisateur */
export type VLCPlayerTheme = 'dark' | 'light' | 'custom';
/** Configuration de thème personnalisé */
export interface CustomTheme {
    /** Couleur de fond des contrôles */
    backgroundColor?: string;
    /** Couleur du texte */
    textColor?: string;
    /** Couleur des boutons */
    buttonColor?: string;
    /** Couleur de la barre de progression */
    progressColor?: string;
    /** Couleur de fond de la barre de progression */
    progressBackgroundColor?: string;
    /** Opacité des contrôles */
    controlsOpacity?: number;
    /** Rayon des bordures */
    borderRadius?: number;
}
/** Configuration des contrôles visibles */
export interface ControlsConfig {
    /** Afficher le bouton play/pause */
    showPlayPause?: boolean;
    /** Afficher les boutons de navigation (±10s) */
    showSeekButtons?: boolean;
    /** Afficher le contrôle de volume */
    showVolumeControl?: boolean;
    /** Afficher le sélecteur de vitesse */
    showRateSelector?: boolean;
    /** Afficher le bouton plein écran */
    showFullscreenButton?: boolean;
    /** Afficher la barre de progression */
    showProgressBar?: boolean;
    /** Afficher les informations de temps */
    showTimeInfo?: boolean;
    /** Afficher les contrôles de pistes */
    showTrackSelector?: boolean;
}
/** Configuration d'accessibilité */
export interface AccessibilityConfig {
    /** Labels pour les lecteurs d'écran */
    labels?: {
        playButton?: string;
        pauseButton?: string;
        seekForwardButton?: string;
        seekBackwardButton?: string;
        volumeButton?: string;
        fullscreenButton?: string;
        progressBar?: string;
    };
    /** Support de la navigation clavier */
    keyboardNavigation?: boolean;
    /** Taille minimale des zones tactiles */
    minimumTouchTargetSize?: number;
}
//# sourceMappingURL=VLCPlayer.d.ts.map