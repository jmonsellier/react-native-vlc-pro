/**
 * Exemple d'application avancée avec contrôles vidéo intégrés
 * Phase 2, Semaine 5 : Interface utilisateur complète
 */

import React, { useRef, useState, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';

import { VLCPlayer, VideoControls, useVLCPlayer } from '../src';
import type { VLCPlayerRef, MediaSource } from '../src';

const DEMO_SOURCES: MediaSource[] = [
  {
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    title: 'Big Buck Bunny',
    type: 'video/mp4',
  },
  {
    uri: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
    title: 'Apple HLS Stream',
    type: 'application/x-mpegURL',
  },
  {
    uri: 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd',
    title: 'DASH Stream',
    type: 'application/dash+xml',
  },
];

const AdvancedPlayerExample: React.FC = () => {
  const playerRef = useRef<VLCPlayerRef>(null);
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 100,
    isMuted: false,
    playbackRate: 1.0,
  });

  const currentSource = DEMO_SOURCES[currentSourceIndex];

  // Hook pour la gestion du lecteur
  const { controls } = useVLCPlayer({
    source: currentSource,
    autoPlay: false,
  });

  // Callbacks pour les contrôles vidéo
  const handlePlay = useCallback(async () => {
    try {
      await controls.play();
      setPlayerState(prev => ({ ...prev, isPlaying: true }));
    } catch (error) {
      console.error('Erreur play:', error);
    }
  }, [controls]);

  const handlePause = useCallback(async () => {
    try {
      await controls.pause();
      setPlayerState(prev => ({ ...prev, isPlaying: false }));
    } catch (error) {
      console.error('Erreur pause:', error);
    }
  }, [controls]);

  const handleSeek = useCallback(async (time: number) => {
    try {
      await controls.seek(time);
      setPlayerState(prev => ({ ...prev, currentTime: time }));
    } catch (error) {
      console.error('Erreur seek:', error);
    }
  }, [controls]);

  const handleSeekForward = useCallback(async (seconds: number) => {
    try {
      await controls.seekForward(seconds);
    } catch (error) {
      console.error('Erreur seekForward:', error);
    }
  }, [controls]);

  const handleSeekBackward = useCallback(async (seconds: number) => {
    try {
      await controls.seekBackward(seconds);
    } catch (error) {
      console.error('Erreur seekBackward:', error);
    }
  }, [controls]);

  const handleVolumeChange = useCallback(async (volume: number) => {
    try {
      await controls.setVolume(volume);
      setPlayerState(prev => ({ ...prev, volume }));
    } catch (error) {
      console.error('Erreur volume:', error);
    }
  }, [controls]);

  const handleMuteToggle = useCallback(async () => {
    try {
      const newMuted = !playerState.isMuted;
      await controls.setMuted(newMuted);
      setPlayerState(prev => ({ ...prev, isMuted: newMuted }));
    } catch (error) {
      console.error('Erreur mute:', error);
    }
  }, [controls, playerState.isMuted]);

  const handleRateChange = useCallback(async (rate: number) => {
    try {
      await controls.setRate(rate);
      setPlayerState(prev => ({ ...prev, playbackRate: rate }));
    } catch (error) {
      console.error('Erreur rate:', error);
    }
  }, [controls]);

  const handleFullscreenToggle = useCallback(() => {
    setIsFullscreen(prev => !prev);
    StatusBar.setHidden(!isFullscreen);
  }, [isFullscreen]);

  const handleProgress = useCallback((progress: any) => {
    setPlayerState(prev => ({
      ...prev,
      currentTime: progress.currentTime,
      duration: progress.duration,
    }));
  }, []);

  const handlePlayerPress = useCallback(() => {
    setControlsVisible(prev => !prev);
  }, []);

  const switchSource = useCallback((index: number) => {
    setCurrentSourceIndex(index);
    setPlayerState(prev => ({
      ...prev,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
    }));
  }, []);

  return (
    <SafeAreaView style={[styles.container, isFullscreen && styles.fullscreen]}>
      <View style={[styles.playerContainer, isFullscreen && styles.fullscreenPlayer]}>
        <TouchableOpacity
          style={styles.playerTouchArea}
          onPress={handlePlayerPress}
          activeOpacity={1}
        >
          <VLCPlayer
            ref={playerRef}
            source={currentSource}
            style={styles.player}
            autoPlay={false}
            onReady={() => console.log('Player ready')}
            onPlay={() => setPlayerState(prev => ({ ...prev, isPlaying: true }))}
            onPause={() => setPlayerState(prev => ({ ...prev, isPlaying: false }))}
            onProgress={handleProgress}
            onError={(error) => console.error('Player error:', error)}
          />
        </TouchableOpacity>

        <VideoControls
          isPlaying={playerState.isPlaying}
          currentTime={playerState.currentTime}
          duration={playerState.duration}
          volume={playerState.volume}
          isMuted={playerState.isMuted}
          playbackRate={playerState.playbackRate}
          isFullscreen={isFullscreen}
          visible={controlsVisible}
          theme="dark"
          onPlay={handlePlay}
          onPause={handlePause}
          onSeek={handleSeek}
          onSeekForward={handleSeekForward}
          onSeekBackward={handleSeekBackward}
          onVolumeChange={handleVolumeChange}
          onMuteToggle={handleMuteToggle}
          onRateChange={handleRateChange}
          onFullscreenToggle={handleFullscreenToggle}
        />
      </View>

      {!isFullscreen && (
        <View style={styles.sourceSelector}>
          <Text style={styles.selectorTitle}>Sources disponibles:</Text>
          {DEMO_SOURCES.map((source, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.sourceButton,
                index === currentSourceIndex && styles.sourceButtonActive,
              ]}
              onPress={() => switchSource(index)}
            >
              <Text
                style={[
                  styles.sourceButtonText,
                  index === currentSourceIndex && styles.sourceButtonTextActive,
                ]}
              >
                {source.title}
              </Text>
              <Text style={styles.sourceType}>{source.type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {!isFullscreen && (
        <View style={styles.infoPanel}>
          <Text style={styles.infoPanelTitle}>État du lecteur</Text>
          <Text style={styles.infoText}>
            État: {playerState.isPlaying ? 'Lecture' : 'Pause'}
          </Text>
          <Text style={styles.infoText}>
            Temps: {Math.round(playerState.currentTime / 1000)}s / {Math.round(playerState.duration / 1000)}s
          </Text>
          <Text style={styles.infoText}>
            Volume: {playerState.isMuted ? 'Muet' : `${playerState.volume}%`}
          </Text>
          <Text style={styles.infoText}>
            Vitesse: {playerState.playbackRate}x
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  fullscreen: {
    backgroundColor: '#000',
  },
  playerContainer: {
    height: 250,
    backgroundColor: '#000',
    position: 'relative',
  },
  fullscreenPlayer: {
    flex: 1,
    height: '100%',
  },
  playerTouchArea: {
    flex: 1,
  },
  player: {
    flex: 1,
  },
  sourceSelector: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  selectorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  sourceButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sourceButtonActive: {
    backgroundColor: '#2196F3',
  },
  sourceButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sourceButtonTextActive: {
    color: 'white',
  },
  sourceType: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  infoPanel: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  infoPanelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});

export default AdvancedPlayerExample; 