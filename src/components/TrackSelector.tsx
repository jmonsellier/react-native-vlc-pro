/**
 * Composant TrackSelector pour react-native-vlc-pro
 * Phase 2, Semaine 6 : Gestion des pistes audio/sous-titres
 */

import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
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
  
  // Callbacks
  onAudioTrackSelect?: (trackId: number) => void;
  onSubtitleTrackSelect?: (trackId: number) => void;
  onClose?: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const TrackSelector: React.FC<TrackSelectorProps> = ({
  audioTracks,
  subtitleTracks,
  selectedAudioTrack,
  selectedSubtitleTrack,
  visible,
  theme = 'dark',
  customTheme,
  onAudioTrackSelect,
  onSubtitleTrackSelect,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'audio' | 'subtitle'>('audio');
  
  const styles = getStyles(theme, customTheme);

  const handleAudioTrackSelect = (trackId: number) => {
    onAudioTrackSelect?.(trackId);
    onClose?.();
  };

  const handleSubtitleTrackSelect = (trackId: number) => {
    onSubtitleTrackSelect?.(trackId);
    onClose?.();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* En-tête */}
          <View style={styles.header}>
            <Text style={styles.title}>Sélection des pistes</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              accessible={true}
              accessibilityLabel="Fermer"
              accessibilityRole="button"
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Onglets */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'audio' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('audio')}
              accessible={true}
              accessibilityLabel="Pistes audio"
              accessibilityRole="tab"
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'audio' && styles.activeTabText,
                ]}
              >
                Audio ({audioTracks.length})
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'subtitle' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('subtitle')}
              accessible={true}
              accessibilityLabel="Sous-titres"
              accessibilityRole="tab"
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'subtitle' && styles.activeTabText,
                ]}
              >
                Sous-titres ({subtitleTracks.length})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Contenu */}
          <ScrollView style={styles.content}>
            {activeTab === 'audio' ? (
              // Pistes audio
              <View>
                {audioTracks.length === 0 ? (
                  <Text style={styles.emptyText}>Aucune piste audio disponible</Text>
                ) : (
                  audioTracks.map((track) => (
                    <TouchableOpacity
                      key={track.id}
                      style={[
                        styles.trackItem,
                        selectedAudioTrack === track.id && styles.selectedTrack,
                      ]}
                      onPress={() => handleAudioTrackSelect(track.id)}
                      accessible={true}
                      accessibilityLabel={`Piste audio: ${track.name || track.language || `Piste ${track.id}`}`}
                      accessibilityRole="button"
                    >
                      <View style={styles.trackInfo}>
                        <Text style={styles.trackName}>
                          {track.name || track.language || `Piste ${track.id}`}
                        </Text>
                        {track.language && (
                          <Text style={styles.trackLanguage}>
                            {track.language}
                          </Text>
                        )}
                        {track.description && (
                          <Text style={styles.trackCodec}>
                            {track.description}
                          </Text>
                        )}
                      </View>
                      {selectedAudioTrack === track.id && (
                        <Text style={styles.selectedIcon}>✓</Text>
                      )}
                    </TouchableOpacity>
                  ))
                )}
              </View>
            ) : (
              // Pistes de sous-titres
              <View>
                {/* Option "Aucun sous-titre" */}
                <TouchableOpacity
                  style={[
                    styles.trackItem,
                    selectedSubtitleTrack === -1 && styles.selectedTrack,
                  ]}
                  onPress={() => handleSubtitleTrackSelect(-1)}
                  accessible={true}
                  accessibilityLabel="Aucun sous-titre"
                  accessibilityRole="button"
                >
                  <View style={styles.trackInfo}>
                    <Text style={styles.trackName}>Aucun sous-titre</Text>
                  </View>
                  {selectedSubtitleTrack === -1 && (
                    <Text style={styles.selectedIcon}>✓</Text>
                  )}
                </TouchableOpacity>

                {subtitleTracks.length === 0 ? (
                  <Text style={styles.emptyText}>Aucune piste de sous-titres disponible</Text>
                ) : (
                  subtitleTracks.map((track) => (
                    <TouchableOpacity
                      key={track.id}
                      style={[
                        styles.trackItem,
                        selectedSubtitleTrack === track.id && styles.selectedTrack,
                      ]}
                      onPress={() => handleSubtitleTrackSelect(track.id)}
                      accessible={true}
                      accessibilityLabel={`Sous-titre: ${track.name || track.language || `Piste ${track.id}`}`}
                      accessibilityRole="button"
                    >
                      <View style={styles.trackInfo}>
                        <Text style={styles.trackName}>
                          {track.name || track.language || `Piste ${track.id}`}
                        </Text>
                        {track.language && (
                          <Text style={styles.trackLanguage}>
                            {track.language}
                          </Text>
                        )}
                        {track.encoding && (
                          <Text style={styles.trackCodec}>
                            {track.encoding}
                          </Text>
                        )}
                      </View>
                      {selectedSubtitleTrack === track.id && (
                        <Text style={styles.selectedIcon}>✓</Text>
                      )}
                    </TouchableOpacity>
                  ))
                )}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const getStyles = (theme: VLCPlayerTheme, customTheme?: CustomTheme) => {
  const isDark = theme === 'dark';
  const isCustom = theme === 'custom' && customTheme;
  
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      width: screenWidth * 0.9,
      maxHeight: screenHeight * 0.8,
      backgroundColor: isCustom 
        ? (customTheme?.backgroundColor || 'rgba(0, 0, 0, 0.95)')
        : isDark 
          ? 'rgba(0, 0, 0, 0.95)' 
          : 'rgba(255, 255, 255, 0.95)',
      borderRadius: isCustom ? (customTheme?.borderRadius || 10) : 10,
      overflow: 'hidden',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isCustom 
        ? (customTheme?.textColor || 'white')
        : isDark ? 'white' : 'black',
    },
    closeButton: {
      padding: 5,
      borderRadius: 15,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      minWidth: 30,
      alignItems: 'center',
    },
    closeButtonText: {
      fontSize: 16,
      color: isCustom 
        ? (customTheme?.textColor || 'white')
        : isDark ? 'white' : 'black',
    },
    tabContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    },
    tab: {
      flex: 1,
      paddingVertical: 15,
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    activeTab: {
      backgroundColor: isCustom 
        ? (customTheme?.buttonColor || 'rgba(33, 150, 243, 0.2)')
        : 'rgba(33, 150, 243, 0.2)',
      borderBottomWidth: 2,
      borderBottomColor: isCustom 
        ? (customTheme?.progressColor || '#2196F3')
        : '#2196F3',
    },
    tabText: {
      fontSize: 14,
      color: isCustom 
        ? (customTheme?.textColor || 'white')
        : isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
    },
    activeTabText: {
      color: isCustom 
        ? (customTheme?.progressColor || '#2196F3')
        : '#2196F3',
      fontWeight: '600',
    },
    content: {
      flex: 1,
      padding: 10,
    },
    trackItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      marginVertical: 2,
      borderRadius: 8,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
    },
    selectedTrack: {
      backgroundColor: isCustom 
        ? (customTheme?.buttonColor || 'rgba(33, 150, 243, 0.2)')
        : 'rgba(33, 150, 243, 0.2)',
      borderWidth: 1,
      borderColor: isCustom 
        ? (customTheme?.progressColor || '#2196F3')
        : '#2196F3',
    },
    trackInfo: {
      flex: 1,
    },
    trackName: {
      fontSize: 16,
      fontWeight: '500',
      color: isCustom 
        ? (customTheme?.textColor || 'white')
        : isDark ? 'white' : 'black',
      marginBottom: 2,
    },
    trackLanguage: {
      fontSize: 14,
      color: isCustom 
        ? (customTheme?.textColor || 'white')
        : isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
      marginBottom: 2,
    },
    trackCodec: {
      fontSize: 12,
      color: isCustom 
        ? (customTheme?.textColor || 'white')
        : isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
      fontFamily: 'monospace',
    },
    selectedIcon: {
      fontSize: 18,
      color: isCustom 
        ? (customTheme?.progressColor || '#2196F3')
        : '#2196F3',
      fontWeight: 'bold',
    },
    emptyText: {
      textAlign: 'center',
      fontSize: 16,
      color: isCustom 
        ? (customTheme?.textColor || 'white')
        : isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
      marginTop: 20,
      fontStyle: 'italic',
    },
  });
};

export default TrackSelector; 