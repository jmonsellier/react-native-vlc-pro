/**
 * Application d'exemple pour react-native-vlc-pro
 * Phase 1, Semaine 3 : Test des contrôles avancés et méthodes d'information
 */

import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

import { VLCPlayer, useVLCPlayer } from '../src';
import type { VLCPlayerRef } from '../src';

const App: React.FC = () => {
  const playerRef = useRef<VLCPlayerRef>(null);
  const [playerInfo, setPlayerInfo] = useState({
    currentTime: 0,
    duration: 0,
    state: 'idle',
    volume: 100,
    muted: false,
    rate: 1.0,
  });

  // Test du hook useVLCPlayer
  const { controls } = useVLCPlayer({
    source: { uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    autoPlay: false,
  });

  const handlePlay = async () => {
    try {
      await controls.play();
      Alert.alert('Info', 'Lecture démarrée');
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la lecture');
    }
  };

  const handlePause = async () => {
    try {
      await controls.pause();
      Alert.alert('Info', 'Lecture mise en pause');
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la pause');
    }
  };

  const handleStop = async () => {
    try {
      await controls.stop();
      Alert.alert('Info', 'Lecture arrêtée');
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de l\'arrêt');
    }
  };

  // Nouvelles méthodes d'information
  const handleGetCurrentTime = async () => {
    try {
      const currentTime = await playerRef.current?.getCurrentTime();
      setPlayerInfo(prev => ({ ...prev, currentTime: currentTime || 0 }));
      Alert.alert('Temps actuel', `${Math.round((currentTime || 0) / 1000)}s`);
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la récupération du temps');
    }
  };

  const handleGetDuration = async () => {
    try {
      const duration = await playerRef.current?.getDuration();
      setPlayerInfo(prev => ({ ...prev, duration: duration || 0 }));
      Alert.alert('Durée', `${Math.round((duration || 0) / 1000)}s`);
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la récupération de la durée');
    }
  };

  const handleGetState = async () => {
    try {
      const state = await playerRef.current?.getState();
      setPlayerInfo(prev => ({ ...prev, state: state || 'idle' }));
      Alert.alert('État', state || 'idle');
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la récupération de l\'état');
    }
  };

  const handleGetVolume = async () => {
    try {
      const volume = await playerRef.current?.getVolume();
      setPlayerInfo(prev => ({ ...prev, volume: volume || 100 }));
      Alert.alert('Volume', `${volume || 100}%`);
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la récupération du volume');
    }
  };

  const handleIsMuted = async () => {
    try {
      const muted = await playerRef.current?.isMuted();
      setPlayerInfo(prev => ({ ...prev, muted: muted || false }));
      Alert.alert('Son coupé', muted ? 'Oui' : 'Non');
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la vérification du son');
    }
  };

  const handleGetRate = async () => {
    try {
      const rate = await playerRef.current?.getRate();
      setPlayerInfo(prev => ({ ...prev, rate: rate || 1.0 }));
      Alert.alert('Vitesse', `${rate || 1.0}x`);
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la récupération de la vitesse');
    }
  };

  const handleSeekForward = async () => {
    try {
      await controls.seekForward(10);
      Alert.alert('Info', 'Avance de 10 secondes');
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de l\'avance');
    }
  };

  const handleSeekBackward = async () => {
    try {
      await controls.seekBackward(10);
      Alert.alert('Info', 'Recul de 10 secondes');
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors du recul');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>React Native VLC Pro</Text>
          <Text style={styles.subtitle}>Phase 1, Semaine 3 - Contrôles avancés</Text>
        </View>

        <View style={styles.playerContainer}>
          <VLCPlayer
            ref={playerRef}
            source={{
              uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              title: 'Big Buck Bunny',
            }}
            style={styles.player}
            autoPlay={false}
            onReady={() => console.log('Player ready')}
            onPlay={() => console.log('Player playing')}
            onPause={() => console.log('Player paused')}
            onError={(error) => console.log('Player error:', error)}
            onProgress={(progress) => {
              setPlayerInfo(prev => ({
                ...prev,
                currentTime: progress.currentTime,
                duration: progress.duration,
              }));
            }}
          />
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={handlePlay}>
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={handlePause}>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={handleStop}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.buttonSecondary} onPress={handleSeekBackward}>
            <Text style={styles.buttonText}>-10s</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.buttonSecondary} onPress={handleSeekForward}>
            <Text style={styles.buttonText}>+10s</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Informations du lecteur</Text>
          <View style={styles.infoGrid}>
            <TouchableOpacity style={styles.infoButton} onPress={handleGetCurrentTime}>
              <Text style={styles.infoButtonText}>Temps actuel</Text>
              <Text style={styles.infoValue}>{Math.round(playerInfo.currentTime / 1000)}s</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.infoButton} onPress={handleGetDuration}>
              <Text style={styles.infoButtonText}>Durée</Text>
              <Text style={styles.infoValue}>{Math.round(playerInfo.duration / 1000)}s</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.infoButton} onPress={handleGetState}>
              <Text style={styles.infoButtonText}>État</Text>
              <Text style={styles.infoValue}>{playerInfo.state}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.infoButton} onPress={handleGetVolume}>
              <Text style={styles.infoButtonText}>Volume</Text>
              <Text style={styles.infoValue}>{playerInfo.volume}%</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.infoButton} onPress={handleIsMuted}>
              <Text style={styles.infoButtonText}>Son coupé</Text>
              <Text style={styles.infoValue}>{playerInfo.muted ? 'Oui' : 'Non'}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.infoButton} onPress={handleGetRate}>
              <Text style={styles.infoButtonText}>Vitesse</Text>
              <Text style={styles.infoValue}>{playerInfo.rate}x</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.info}>
          <Text style={styles.infoText}>
            ✅ Infrastructure du projet configurée
          </Text>
          <Text style={styles.infoText}>
            ✅ Types TypeScript définis
          </Text>
          <Text style={styles.infoText}>
            ✅ Vues natives iOS/Android créées
          </Text>
          <Text style={styles.infoText}>
            ✅ Intégration MobileVLCKit iOS
          </Text>
          <Text style={styles.infoText}>
            ✅ Intégration libVLC Android
          </Text>
          <Text style={styles.infoText}>
            ✅ Bridge React Native fonctionnel
          </Text>
          <Text style={styles.infoText}>
            ✅ Méthodes d'information implémentées
          </Text>
          <Text style={styles.infoText}>
            ✅ Navigation temporelle (seek forward/backward)
          </Text>
          <Text style={styles.infoText}>
            🔄 Prochaine étape : Phase 1, Semaine 4 - Support des formats
          </Text>
        </View>
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  playerContainer: {
    margin: 20,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  player: {
    width: '100%',
    height: 200,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondary: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  infoSection: {
    margin: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoButton: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: '48%',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  infoButtonText: {
    color: '#333',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  infoValue: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  info: {
    margin: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
});

export default App; 