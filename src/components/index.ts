/**
 * Export de tous les composants du package react-native-vlc-pro
 */

// Composant principal - Version native complète
export { default as VLCPlayer } from './VLCPlayer';

// Composant simple pour développement (si besoin de fallback)
export { default as VLCPlayerSimple } from './VLCPlayerSimple';

// Composant natif complet (à activer quand les modules natifs seront prêts)
// export { default as VLCPlayer } from './VLCPlayer';

export { default as VLCPlayerNative } from './VLCPlayerNative';
export { default as VideoControls } from './VideoControls';
export { default as VideoControlsAdvanced } from './VideoControlsAdvanced';
export { default as TrackSelector } from './TrackSelector';

// Export des types des composants
export type { VideoControlsProps } from './VideoControls';
export type { VideoControlsAdvancedProps } from './VideoControlsAdvanced';
export type { TrackSelectorProps } from './TrackSelector';
