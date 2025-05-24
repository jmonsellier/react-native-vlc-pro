/**
 * react-native-vlc-pro
 * Lecteur VLC professionnel pour React Native
 *
 * Phase 1, Semaine 1 : Infrastructure du projet
 * Phase 2, Semaine 5 : Interface utilisateur avancée
 */

// Composants principaux
export { VLCPlayer, VideoControls, VideoControlsAdvanced, TrackSelector } from './components';
export type { VideoControlsProps, VideoControlsAdvancedProps, TrackSelectorProps } from './components';

// Hooks
export { useVLCPlayer, useFullscreen } from './hooks';
export type { UseVLCPlayerOptions, UseVLCPlayerReturn, UseFullscreenOptions, UseFullscreenReturn } from './hooks';

// Types
export type {
  // Types principaux
  VLCPlayerProps,
  VLCPlayerRef,
  VLCPlayerState,
  VLCPlayerTheme,
  CustomTheme,
  AccessibilityConfig,

  // Types média
  MediaSource,
  MediaInfo,
  MediaMetadata,
  AudioTrack,
  SubtitleTrack,
  MediaFormat,
  StreamingProtocol,

  // Types d'événements
  ProgressData,
  LoadData,
  BufferData,
  VLCError,
  PlayerState,
  StateChangeData,
  SeekData,
  VolumeData,
  PlaybackRateData,
  FullscreenData,
  SubtitleData,
  AudioTrackData,

  // Types de configuration
  VLCPlayerConfig,
  AudioEqualizerConfig,
  ControlsConfig,
  ControlsStyle,
  SubtitleConfig,
  NetworkConfig,
  ProxyConfig,
} from './types';

// Utilitaires
export { 
  formatTime, 
  parseTime, 
  formatDuration,
  PerformanceProfiler,
  PerformanceUtils,
  type PerformanceMetrics,
  type PerformanceConfig
} from './utils';
