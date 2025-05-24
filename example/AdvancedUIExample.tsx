/**
 * Exemple d'interface utilisateur avancée pour react-native-vlc-pro
 * Phase 2, Semaine 5 : Démonstration des thèmes et contrôles personnalisables
 */

import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';

import { VLCPlayer, VideoControlsAdvanced } from '../src';
import type { VLCPlayerRef, CustomTheme, ControlsConfig } from '../src';

const AdvancedUIExample: React.FC = () => {
  const playerRef = useRef<VLCPlayerRef>(null);
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 100,
    isMuted: false,
    playbackRate: 1.0,
    isFullscreen: false,
  });

  // Configuration des thèmes
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light' | 'custom'>('dark');
  const [showControls, setShowControls] = useState(true);

  // Thème personnalisé
  const customTheme: CustomTheme = {
    backgroundColor: 'rgba(139, 69, 19, 0.9)', // Marron
    textColor: '#FFD700', // Or
    buttonColor: 'rgba(255, 215, 0, 0.2)', // Or transparent
    progressColor: '#FF6347', // Rouge tomate
    progressBackgroundColor: 'rgba(255, 255, 255, 0.2)',
    controlsOpacity: 0.95,
    borderRadius: 15,
  };

  // Configuration des contrôles
  const [controlsConfig, setControlsConfig] = useState<ControlsConfig>({
    showPlayPause: true,
    showSeekButtons: true,
    showVolumeControl: true,
    showRateSelector: true,
    showFullscreenButton: true,
    showProgressBar: true,
    showTimeInfo: true,
    showTrackSelector: false,
  });

  const handlePlay = async () => {
    try {
      await playerRef.current?.play();
      setPlayerState(prev => ({ ...prev, isPlaying: true }));
    } catch (error) {
      console.error('Erreur lors de la lecture:', error);
    }
  };

  const handlePause = async () => {
    try {
      await playerRef.current?.pause();
      setPlayerState(prev => ({ ...prev, isPlaying: false }));
    } catch (error) {
      console.error('Erreur lors de la pause:', error);
    }
  };

  const handleSeek = async (time: number) => {
    try {
      await playerRef.current?.seek(time);
      setPlayerState(prev => ({ ...prev, currentTime: time }));
    } catch (error) {
      console.error('Erreur lors du seek:', error);
    }
  };

  const handleVolumeChange = async (volume: number) => {
    try {
      await playerRef.current?.setVolume(volume);
      setPlayerState(prev => ({ ...prev, volume }));
    } catch (error) {
      console.error('Erreur lors du changement de volume:', error);
    }
  };

  const handleMuteToggle = async () => {
    try {
      const newMuted = !playerState.isMuted;
      await playerRef.current?.setMuted(newMuted);
      setPlayerState(prev => ({ ...prev, isMuted: newMuted }));
    } catch (error) {
      console.error('Erreur lors du changement de mute:', error);
    }
  };

  const handleRateChange = async (rate: number) => {
    try {
      await playerRef.current?.setRate(rate);
      setPlayerState(prev => ({ ...prev, playbackRate: rate }));
    } catch (error) {
      console.error('Erreur lors du changement de vitesse:', error);
    }
  };

  const toggleControlConfig = (key: keyof ControlsConfig) => {
    setControlsConfig(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Interface Utilisateur Avancée</Text>
          <Text style={styles.subtitle}>Thèmes et contrôles personnalisables</Text>
        </View>

        {/* Lecteur vidéo */}
        <View style={styles.playerContainer}>
          <VLCPlayer
            ref={playerRef}
            source={{
              uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              title: 'Big Buck Bunny - Démo UI',
            }}
            style={styles.player}
            autoPlay={false}
            onProgress={(progress) => {
              setPlayerState(prev => ({
                ...prev,
                currentTime: progress.currentTime,
                duration: progress.duration,
              }));
            }}
          />

          {/* Contrôles avancés superposés */}
          {showControls && (
            <VideoControlsAdvanced
              isPlaying={playerState.isPlaying}
              currentTime={playerState.currentTime}
              duration={playerState.duration}
              volume={playerState.volume}
              isMuted={playerState.isMuted}
              playbackRate={playerState.playbackRate}
              isFullscreen={playerState.isFullscreen}
              visible={showControls}
              theme={currentTheme}
              customTheme={currentTheme === 'custom' ? customTheme : undefined}
              controlsConfig={controlsConfig}
              accessibilityConfig={{
                labels: {
                  playButton: 'Démarrer la lecture',
                  pauseButton: 'Mettre en pause',
                  seekForwardButton: 'Avancer de 10 secondes',
                  seekBackwardButton: 'Reculer de 10 secondes',
                  volumeButton: 'Contrôle du volume',
                  fullscreenButton: 'Mode plein écran',
                  progressBar: 'Barre de progression de la vidéo',
                },
                minimumTouchTargetSize: 48,
              }}
              onPlay={handlePlay}
              onPause={handlePause}
              onSeek={handleSeek}
              onSeekForward={(seconds) => handleSeek(playerState.currentTime + seconds * 1000)}
              onSeekBackward={(seconds) => handleSeek(playerState.currentTime - seconds * 1000)}
              onVolumeChange={handleVolumeChange}
              onMuteToggle={handleMuteToggle}
              onRateChange={handleRateChange}
              onFullscreenToggle={() => {
                setPlayerState(prev => ({ ...prev, isFullscreen: !prev.isFullscreen }));
              }}
            />
          )}
        </View>

        {/* Configuration des thèmes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎨 Thèmes</Text>
          <View style={styles.themeButtons}>
            <TouchableOpacity
              style={[styles.themeButton, currentTheme === 'dark' && styles.activeTheme]}
              onPress={() => setCurrentTheme('dark')}
            >
              <Text style={styles.themeButtonText}>Sombre</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.themeButton, currentTheme === 'light' && styles.activeTheme]}
              onPress={() => setCurrentTheme('light')}
            >
              <Text style={styles.themeButtonText}>Clair</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.themeButton, currentTheme === 'custom' && styles.activeTheme]}
              onPress={() => setCurrentTheme('custom')}
            >
              <Text style={styles.themeButtonText}>Personnalisé</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Configuration des contrôles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Configuration des contrôles</Text>
          
          <View style={styles.configRow}>
            <Text style={styles.configLabel}>Afficher les contrôles</Text>
            <Switch
              value={showControls}
              onValueChange={setShowControls}
            />
          </View>

          <View style={styles.configRow}>
            <Text style={styles.configLabel}>Bouton Play/Pause</Text>
            <Switch
              value={controlsConfig.showPlayPause}
              onValueChange={() => toggleControlConfig('showPlayPause')}
            />
          </View>

          <View style={styles.configRow}>
            <Text style={styles.configLabel}>Boutons de navigation</Text>
            <Switch
              value={controlsConfig.showSeekButtons}
              onValueChange={() => toggleControlConfig('showSeekButtons')}
            />
          </View>

          <View style={styles.configRow}>
            <Text style={styles.configLabel}>Contrôle du volume</Text>
            <Switch
              value={controlsConfig.showVolumeControl}
              onValueChange={() => toggleControlConfig('showVolumeControl')}
            />
          </View>

          <View style={styles.configRow}>
            <Text style={styles.configLabel}>Sélecteur de vitesse</Text>
            <Switch
              value={controlsConfig.showRateSelector}
              onValueChange={() => toggleControlConfig('showRateSelector')}
            />
          </View>

          <View style={styles.configRow}>
            <Text style={styles.configLabel}>Bouton plein écran</Text>
            <Switch
              value={controlsConfig.showFullscreenButton}
              onValueChange={() => toggleControlConfig('showFullscreenButton')}
            />
          </View>

          <View style={styles.configRow}>
            <Text style={styles.configLabel}>Barre de progression</Text>
            <Switch
              value={controlsConfig.showProgressBar}
              onValueChange={() => toggleControlConfig('showProgressBar')}
            />
          </View>

          <View style={styles.configRow}>
            <Text style={styles.configLabel}>Informations de temps</Text>
            <Switch
              value={controlsConfig.showTimeInfo}
              onValueChange={() => toggleControlConfig('showTimeInfo')}
            />
          </View>
        </View>

        {/* Informations sur le thème personnalisé */}
        {currentTheme === 'custom' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎨 Thème personnalisé actuel</Text>
            <View style={styles.themeInfo}>
              <Text style={styles.themeInfoText}>Fond: {customTheme.backgroundColor}</Text>
              <Text style={styles.themeInfoText}>Texte: {customTheme.textColor}</Text>
              <Text style={styles.themeInfoText}>Boutons: {customTheme.buttonColor}</Text>
              <Text style={styles.themeInfoText}>Progression: {customTheme.progressColor}</Text>
              <Text style={styles.themeInfoText}>Opacité: {customTheme.controlsOpacity}</Text>
              <Text style={styles.themeInfoText}>Bordures: {customTheme.borderRadius}px</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  playerContainer: {
    margin: 20,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  player: {
    width: '100%',
    height: 200,
    backgroundColor: '#000',
  },
  section: {
    margin: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  themeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  themeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    minWidth: 80,
    alignItems: 'center',
  },
  activeTheme: {
    backgroundColor: '#2196F3',
  },
  themeButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  configRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  configLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  themeInfo: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 5,
  },
  themeInfoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontFamily: 'monospace',
  },
});

export default AdvancedUIExample; 