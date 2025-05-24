/**
 * Composant VideoControls avancé pour react-native-vlc-pro
 * Phase 2, Semaine 5 : Interface utilisateur complète avec thèmes étendus
 */

import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { formatTime } from '../utils';
import TrackSelector from './TrackSelector';
const {
  width: screenWidth
} = Dimensions.get('window');
const VideoControlsAdvanced = ({
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  playbackRate,
  isFullscreen = false,
  visible = true,
  theme = 'dark',
  customTheme,
  controlsConfig = {},
  accessibilityConfig = {},
  audioTracks = [],
  subtitleTracks = [],
  selectedAudioTrack,
  selectedSubtitleTrack,
  onPlay,
  onPause,
  onSeek,
  onSeekForward,
  onSeekBackward,
  onVolumeChange,
  onMuteToggle,
  onRateChange,
  onFullscreenToggle,
  onAudioTrackSelect,
  onSubtitleTrackSelect
}) => {
  const [opacity] = useState(new Animated.Value(visible ? 1 : 0));
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showRateSelector, setShowRateSelector] = useState(false);
  const [showTrackSelector, setShowTrackSelector] = useState(false);
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  }, [visible, opacity]);

  // Configuration par défaut des contrôles
  const defaultControlsConfig = {
    showPlayPause: true,
    showSeekButtons: true,
    showVolumeControl: true,
    showRateSelector: true,
    showFullscreenButton: true,
    showProgressBar: true,
    showTimeInfo: true,
    showTrackSelector: false
  };

  // Configuration par défaut de l'accessibilité
  const defaultAccessibilityConfig = {
    labels: {
      playButton: 'Lecture',
      pauseButton: 'Pause',
      seekForwardButton: 'Avancer de 10 secondes',
      seekBackwardButton: 'Reculer de 10 secondes',
      volumeButton: 'Volume',
      fullscreenButton: 'Plein écran',
      progressBar: 'Barre de progression'
    },
    keyboardNavigation: true,
    minimumTouchTargetSize: 44
  };
  const finalControlsConfig = {
    ...defaultControlsConfig,
    ...controlsConfig
  };
  const finalAccessibilityConfig = {
    ...defaultAccessibilityConfig,
    ...accessibilityConfig
  };
  const handlePlayPause = () => {
    if (isPlaying) {
      onPause?.();
    } else {
      onPlay?.();
    }
  };
  const handleSeekBarPress = event => {
    const {
      locationX
    } = event.nativeEvent;
    const progressBarWidth = screenWidth - 40;
    const progress = locationX / progressBarWidth;
    const seekTime = progress * duration;
    onSeek?.(seekTime);
  };
  const progressPercentage = duration > 0 ? currentTime / duration * 100 : 0;
  const styles = getStyles(theme, customTheme, finalAccessibilityConfig);
  const playbackRates = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.container, {
      opacity
    }]
  }, finalControlsConfig.showProgressBar && /*#__PURE__*/React.createElement(View, {
    style: styles.progressContainer
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.progressBar,
    onPress: handleSeekBarPress,
    activeOpacity: 0.8,
    accessible: true,
    accessibilityLabel: finalAccessibilityConfig.labels?.progressBar,
    accessibilityRole: "adjustable"
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.progressTrack
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.progressFill, {
      width: `${progressPercentage}%`
    }]
  }), /*#__PURE__*/React.createElement(View, {
    style: [styles.progressThumb, {
      left: `${progressPercentage}%`
    }]
  }))), finalControlsConfig.showTimeInfo && /*#__PURE__*/React.createElement(View, {
    style: styles.timeContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.timeText
  }, formatTime(currentTime), " / ", formatTime(duration)))), /*#__PURE__*/React.createElement(View, {
    style: styles.controlsRow
  }, finalControlsConfig.showSeekButtons && /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.controlButton,
    onPress: () => onSeekBackward?.(10),
    accessible: true,
    accessibilityLabel: finalAccessibilityConfig.labels?.seekBackwardButton,
    accessibilityRole: "button"
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.controlButtonText
  }, "\u23EA")), finalControlsConfig.showPlayPause && /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: [styles.controlButton, styles.playButton],
    onPress: handlePlayPause,
    accessible: true,
    accessibilityLabel: isPlaying ? finalAccessibilityConfig.labels?.pauseButton : finalAccessibilityConfig.labels?.playButton,
    accessibilityRole: "button"
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.playButtonText
  }, isPlaying ? '⏸️' : '▶️')), finalControlsConfig.showSeekButtons && /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.controlButton,
    onPress: () => onSeekForward?.(10),
    accessible: true,
    accessibilityLabel: finalAccessibilityConfig.labels?.seekForwardButton,
    accessibilityRole: "button"
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.controlButtonText
  }, "\u23E9")), finalControlsConfig.showVolumeControl && /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.controlButton,
    onPress: () => setShowVolumeSlider(!showVolumeSlider),
    accessible: true,
    accessibilityLabel: finalAccessibilityConfig.labels?.volumeButton,
    accessibilityRole: "button"
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.controlButtonText
  }, isMuted ? '🔇' : volume > 50 ? '🔊' : '🔉')), finalControlsConfig.showRateSelector && /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.controlButton,
    onPress: () => setShowRateSelector(!showRateSelector),
    accessible: true,
    accessibilityLabel: `Vitesse de lecture: ${playbackRate}x`,
    accessibilityRole: "button"
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.controlButtonText
  }, playbackRate, "x")), finalControlsConfig.showTrackSelector && (audioTracks.length > 0 || subtitleTracks.length > 0) && /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.controlButton,
    onPress: () => setShowTrackSelector(true),
    accessible: true,
    accessibilityLabel: "S\xE9lection des pistes",
    accessibilityRole: "button"
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.controlButtonText
  }, "\uD83C\uDFB5")), finalControlsConfig.showFullscreenButton && /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.controlButton,
    onPress: onFullscreenToggle,
    accessible: true,
    accessibilityLabel: finalAccessibilityConfig.labels?.fullscreenButton,
    accessibilityRole: "button"
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.controlButtonText
  }, isFullscreen ? '⛶' : '⛶'))), showVolumeSlider && finalControlsConfig.showVolumeControl && /*#__PURE__*/React.createElement(View, {
    style: styles.volumeContainer
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.muteButton,
    onPress: onMuteToggle,
    accessible: true,
    accessibilityLabel: "Couper le son",
    accessibilityRole: "button"
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.controlButtonText
  }, isMuted ? '🔇' : '🔊')), /*#__PURE__*/React.createElement(View, {
    style: styles.volumeSlider
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.volumeTrack
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.volumeFill, {
      width: `${isMuted ? 0 : volume}%`
    }]
  }))), /*#__PURE__*/React.createElement(Text, {
    style: styles.volumeText
  }, isMuted ? 0 : volume, "%")), showRateSelector && finalControlsConfig.showRateSelector && /*#__PURE__*/React.createElement(View, {
    style: styles.rateContainer
  }, playbackRates.map(rate => /*#__PURE__*/React.createElement(TouchableOpacity, {
    key: rate,
    style: [styles.rateButton, playbackRate === rate && styles.rateButtonActive],
    onPress: () => {
      onRateChange?.(rate);
      setShowRateSelector(false);
    },
    accessible: true,
    accessibilityLabel: `Vitesse ${rate}x`,
    accessibilityRole: "button"
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.rateButtonText, playbackRate === rate && styles.rateButtonTextActive]
  }, rate, "x")))), /*#__PURE__*/React.createElement(TrackSelector, {
    visible: showTrackSelector,
    audioTracks: audioTracks,
    subtitleTracks: subtitleTracks,
    selectedAudioTrack: selectedAudioTrack,
    selectedSubtitleTrack: selectedSubtitleTrack,
    theme: theme,
    customTheme: customTheme,
    onAudioTrackSelect: onAudioTrackSelect,
    onSubtitleTrackSelect: onSubtitleTrackSelect,
    onClose: () => setShowTrackSelector(false)
  }));
};
const getStyles = (theme, customTheme, accessibilityConfig) => {
  const isDark = theme === 'dark';
  const isCustom = theme === 'custom' && customTheme;
  const minTouchSize = accessibilityConfig?.minimumTouchTargetSize || 44;
  return StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: isCustom ? customTheme?.backgroundColor || 'rgba(0, 0, 0, 0.8)' : isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderRadius: isCustom ? customTheme?.borderRadius || 0 : 0
    },
    progressContainer: {
      marginBottom: 15
    },
    progressBar: {
      height: Math.max(40, minTouchSize),
      justifyContent: 'center'
    },
    progressTrack: {
      height: 4,
      backgroundColor: isCustom ? customTheme?.progressBackgroundColor || 'rgba(255, 255, 255, 0.3)' : isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
      borderRadius: 2,
      position: 'relative'
    },
    progressFill: {
      height: 4,
      backgroundColor: isCustom ? customTheme?.progressColor || '#2196F3' : '#2196F3',
      borderRadius: 2
    },
    progressThumb: {
      position: 'absolute',
      top: -6,
      width: 16,
      height: 16,
      backgroundColor: isCustom ? customTheme?.progressColor || '#2196F3' : '#2196F3',
      borderRadius: 8,
      marginLeft: -8
    },
    timeContainer: {
      marginTop: 5,
      alignItems: 'center'
    },
    timeText: {
      fontSize: 12,
      color: isCustom ? customTheme?.textColor || 'white' : isDark ? 'white' : 'black'
    },
    controlsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    controlButton: {
      padding: 10,
      borderRadius: 25,
      backgroundColor: isCustom ? customTheme?.buttonColor || 'rgba(255, 255, 255, 0.1)' : isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      minWidth: Math.max(50, minTouchSize),
      minHeight: minTouchSize,
      alignItems: 'center',
      justifyContent: 'center'
    },
    playButton: {
      backgroundColor: isCustom ? customTheme?.progressColor || '#2196F3' : '#2196F3',
      paddingHorizontal: 15
    },
    controlButtonText: {
      fontSize: 16,
      color: isCustom ? customTheme?.textColor || 'white' : isDark ? 'white' : 'black'
    },
    playButtonText: {
      fontSize: 20,
      color: 'white'
    },
    volumeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      paddingHorizontal: 10
    },
    muteButton: {
      padding: 5,
      minWidth: minTouchSize,
      minHeight: minTouchSize,
      alignItems: 'center',
      justifyContent: 'center'
    },
    volumeSlider: {
      flex: 1,
      marginHorizontal: 15
    },
    volumeTrack: {
      height: 4,
      backgroundColor: isCustom ? customTheme?.progressBackgroundColor || 'rgba(255, 255, 255, 0.3)' : isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
      borderRadius: 2
    },
    volumeFill: {
      height: 4,
      backgroundColor: isCustom ? customTheme?.progressColor || '#2196F3' : '#2196F3',
      borderRadius: 2
    },
    volumeText: {
      fontSize: 12,
      color: isCustom ? customTheme?.textColor || 'white' : isDark ? 'white' : 'black',
      minWidth: 35,
      textAlign: 'center'
    },
    rateContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
      paddingHorizontal: 10
    },
    rateButton: {
      padding: 8,
      borderRadius: 15,
      backgroundColor: isCustom ? customTheme?.buttonColor || 'rgba(255, 255, 255, 0.1)' : isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      minWidth: Math.max(40, minTouchSize),
      minHeight: minTouchSize,
      alignItems: 'center',
      justifyContent: 'center'
    },
    rateButtonActive: {
      backgroundColor: isCustom ? customTheme?.progressColor || '#2196F3' : '#2196F3'
    },
    rateButtonText: {
      fontSize: 12,
      color: isCustom ? customTheme?.textColor || 'white' : isDark ? 'white' : 'black'
    },
    rateButtonTextActive: {
      color: 'white'
    }
  });
};
export default VideoControlsAdvanced;
//# sourceMappingURL=VideoControlsAdvanced.js.map