/**
 * Composant VideoControls pour react-native-vlc-pro
 * Phase 2, Semaine 5 : Interface utilisateur intégrée avec thèmes étendus
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  AccessibilityInfo,
} from 'react-native';
import { formatTime } from '../utils';
import type { 
  VLCPlayerTheme, 
  CustomTheme, 
  ControlsConfig, 
  AccessibilityConfig 
} from '../types';

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
  
  // Callbacks
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

const { width: screenWidth } = Dimensions.get('window');

const VideoControls: React.FC<VideoControlsProps> = ({
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
  controlsConfig,
  accessibilityConfig,
  onPlay,
  onPause,
  onSeek,
  onSeekForward,
  onSeekBackward,
  onVolumeChange,
  onMuteToggle,
  onRateChange,
  onFullscreenToggle,
}) => {
  const [opacity] = useState(new Animated.Value(visible ? 1 : 0));
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showRateSelector, setShowRateSelector] = useState(false);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible, opacity]);

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause?.();
    } else {
      onPlay?.();
    }
  };

  const handleSeekBarPress = (event: any) => {
    const { locationX } = event.nativeEvent;
    const progressBarWidth = screenWidth - 40; // Margin de 20 de chaque côté
    const progress = locationX / progressBarWidth;
    const seekTime = progress * duration;
    onSeek?.(seekTime);
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Configuration par défaut des contrôles
  const defaultControlsConfig: ControlsConfig = {
    showPlayPause: true,
    showSeekButtons: true,
    showVolumeControl: true,
    showRateSelector: true,
    showFullscreenButton: true,
    showProgressBar: true,
    showTimeInfo: true,
    showTrackSelector: false,
  };

  // Configuration par défaut de l'accessibilité
  const defaultAccessibilityConfig: AccessibilityConfig = {
    labels: {
      playButton: 'Lecture',
      pauseButton: 'Pause',
      seekForwardButton: 'Avancer de 10 secondes',
      seekBackwardButton: 'Reculer de 10 secondes',
      volumeButton: 'Volume',
      fullscreenButton: 'Plein écran',
      progressBar: 'Barre de progression',
    },
    keyboardNavigation: true,
    minimumTouchTargetSize: 44,
  };

  const finalControlsConfig = { ...defaultControlsConfig, ...controlsConfig };
  const finalAccessibilityConfig = { ...defaultAccessibilityConfig, ...accessibilityConfig };

  const styles = getStyles(theme, customTheme);

  const playbackRates = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      {/* Barre de progression */}
      {finalControlsConfig.showProgressBar && (
        <View style={styles.progressContainer}>
          <TouchableOpacity
            style={styles.progressBar}
            onPress={handleSeekBarPress}
            activeOpacity={0.8}
          >
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progressPercentage}%` },
                ]}
              />
              <View
                style={[
                  styles.progressThumb,
                  { left: `${progressPercentage}%` },
                ]}
              />
            </View>
          </TouchableOpacity>
          
          {finalControlsConfig.showTimeInfo && (
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Contrôles principaux */}
      <View style={styles.controlsRow}>
        {/* Bouton reculer */}
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => onSeekBackward?.(10)}
        >
          <Text style={styles.controlButtonText}>⏪</Text>
        </TouchableOpacity>

        {/* Bouton play/pause */}
        <TouchableOpacity
          style={[styles.controlButton, styles.playButton]}
          onPress={handlePlayPause}
        >
          <Text style={styles.playButtonText}>
            {isPlaying ? '⏸️' : '▶️'}
          </Text>
        </TouchableOpacity>

        {/* Bouton avancer */}
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => onSeekForward?.(10)}
        >
          <Text style={styles.controlButtonText}>⏩</Text>
        </TouchableOpacity>

        {/* Contrôle du volume */}
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setShowVolumeSlider(!showVolumeSlider)}
        >
          <Text style={styles.controlButtonText}>
            {isMuted ? '🔇' : volume > 50 ? '🔊' : '🔉'}
          </Text>
        </TouchableOpacity>

        {/* Vitesse de lecture */}
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setShowRateSelector(!showRateSelector)}
        >
          <Text style={styles.controlButtonText}>{playbackRate}x</Text>
        </TouchableOpacity>

        {/* Plein écran */}
        <TouchableOpacity
          style={styles.controlButton}
          onPress={onFullscreenToggle}
        >
          <Text style={styles.controlButtonText}>
            {isFullscreen ? '⛶' : '⛶'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Slider de volume */}
      {showVolumeSlider && (
        <View style={styles.volumeContainer}>
          <TouchableOpacity
            style={styles.muteButton}
            onPress={onMuteToggle}
          >
            <Text style={styles.controlButtonText}>
              {isMuted ? '🔇' : '🔊'}
            </Text>
          </TouchableOpacity>
          
          <View style={styles.volumeSlider}>
            <View style={styles.volumeTrack}>
              <View
                style={[
                  styles.volumeFill,
                  { width: `${isMuted ? 0 : volume}%` },
                ]}
              />
            </View>
          </View>
          
          <Text style={styles.volumeText}>{isMuted ? 0 : volume}%</Text>
        </View>
      )}

      {/* Sélecteur de vitesse */}
      {showRateSelector && (
        <View style={styles.rateContainer}>
          {playbackRates.map((rate) => (
            <TouchableOpacity
              key={rate}
              style={[
                styles.rateButton,
                playbackRate === rate && styles.rateButtonActive,
              ]}
              onPress={() => {
                onRateChange?.(rate);
                setShowRateSelector(false);
              }}
            >
              <Text
                style={[
                  styles.rateButtonText,
                  playbackRate === rate && styles.rateButtonTextActive,
                ]}
              >
                {rate}x
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </Animated.View>
  );
};

const getStyles = (theme: VLCPlayerTheme, customTheme?: CustomTheme) => {
  const isDark = theme === 'dark';
  const isCustom = theme === 'custom' && customTheme;
  
  return StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: isCustom 
        ? (customTheme?.backgroundColor || 'rgba(0, 0, 0, 0.8)')
        : isDark 
          ? 'rgba(0, 0, 0, 0.8)' 
          : 'rgba(255, 255, 255, 0.9)',
      paddingHorizontal: 20,
      paddingVertical: 15,
      opacity: isCustom ? (customTheme?.controlsOpacity || 1) : 1,
      borderRadius: isCustom ? (customTheme?.borderRadius || 0) : 0,
    },
    progressContainer: {
      marginBottom: 15,
    },
    progressBar: {
      height: 40,
      justifyContent: 'center',
    },
    progressTrack: {
      height: 4,
      backgroundColor: isDark 
        ? 'rgba(255, 255, 255, 0.3)' 
        : 'rgba(0, 0, 0, 0.3)',
      borderRadius: 2,
      position: 'relative',
    },
    progressFill: {
      height: 4,
      backgroundColor: '#2196F3',
      borderRadius: 2,
    },
    progressThumb: {
      position: 'absolute',
      top: -6,
      width: 16,
      height: 16,
      backgroundColor: '#2196F3',
      borderRadius: 8,
      marginLeft: -8,
    },
    timeContainer: {
      marginTop: 5,
      alignItems: 'center',
    },
    timeText: {
      fontSize: 12,
      color: isDark ? 'white' : 'black',
    },
    controlsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    controlButton: {
      padding: 10,
      borderRadius: 25,
      backgroundColor: isDark 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(0, 0, 0, 0.1)',
      minWidth: 50,
      alignItems: 'center',
    },
    playButton: {
      backgroundColor: '#2196F3',
      paddingHorizontal: 15,
    },
    controlButtonText: {
      fontSize: 16,
      color: isDark ? 'white' : 'black',
    },
    playButtonText: {
      fontSize: 20,
      color: 'white',
    },
    volumeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      paddingHorizontal: 10,
    },
    muteButton: {
      padding: 5,
    },
    volumeSlider: {
      flex: 1,
      marginHorizontal: 15,
    },
    volumeTrack: {
      height: 4,
      backgroundColor: isDark 
        ? 'rgba(255, 255, 255, 0.3)' 
        : 'rgba(0, 0, 0, 0.3)',
      borderRadius: 2,
    },
    volumeFill: {
      height: 4,
      backgroundColor: '#2196F3',
      borderRadius: 2,
    },
    volumeText: {
      fontSize: 12,
      color: isDark ? 'white' : 'black',
      minWidth: 35,
      textAlign: 'center',
    },
    rateContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
      paddingHorizontal: 10,
    },
    rateButton: {
      padding: 8,
      borderRadius: 15,
      backgroundColor: isDark 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(0, 0, 0, 0.1)',
      minWidth: 40,
      alignItems: 'center',
    },
    rateButtonActive: {
      backgroundColor: '#2196F3',
    },
    rateButtonText: {
      fontSize: 12,
      color: isDark ? 'white' : 'black',
    },
    rateButtonTextActive: {
      color: 'white',
    },
  });
};

export default VideoControls; 