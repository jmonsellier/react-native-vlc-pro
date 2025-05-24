/**
 * Export de tous les types du package react-native-vlc-pro
 */

// Types principaux
export * from './Media';
export * from './Config';

// Export spécifique pour éviter les conflits de noms
export type {
  ProgressData,
  LoadData,
  BufferData,
  VLCError,
  VLCPlayerState as PlayerState,
  StateChangeData,
  SeekData,
  VolumeData,
  PlaybackRateData,
  FullscreenData,
  SubtitleData,
  AudioTrackData,
} from './Events';

export type { 
  VLCPlayerProps, 
  VLCPlayerRef, 
  VLCPlayerState,
  VLCPlayerTheme,
  CustomTheme,
  ControlsConfig,
  AccessibilityConfig
} from './VLCPlayer';

// Re-export des types les plus utilisés pour faciliter l'import
export type { MediaSource, MediaInfo } from './Media';
export type { VLCPlayerConfig } from './Config';
