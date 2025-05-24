/**
 * Application d'exemple pour react-native-vlc-pro
 * Test du VRAI composant VLC sur Android
 */

import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
  Clipboard,
  Platform,
} from 'react-native';

// Test d'import du VRAI module VLC
let VLCPlayer: any;
let VLCPlayerSimple: any;
let importStatus = '';
let useNativePlayer = false;

try {
  const vlcModule = require('react-native-vlc-pro');
  VLCPlayer = vlcModule.VLCPlayer;
  VLCPlayerSimple = vlcModule.VLCPlayerSimple;
  
  if (VLCPlayer && VLCPlayerSimple) {
    importStatus = '✅ Module VLC RÉEL importé avec succès';
    useNativePlayer = true;
  } else {
    importStatus = '⚠️ Module VLC partiellement importé';
  }
} catch (error: any) {
  importStatus = `❌ Erreur d'import: ${error.message}`;
}

// URLs de test
const TEST_VIDEOS = [
  {
    name: 'Big Buck Bunny (MP4)',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    name: 'Elephant Dream (MP4)',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    name: 'Test Stream (HLS)',
    uri: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
  }
];

export default function App() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [useSimplePlayer, setUseSimplePlayer] = useState(false);
  const playerRef = useRef<any>(null);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    setLogs(prev => [logMessage, ...prev.slice(0, 9)]); // Garde les 10 derniers logs
    console.log(logMessage);
  };

  const changeVideo = (index: number) => {
    setCurrentVideo(index);
    setIsPlaying(false);
    addLog(`🔄 Changement vers: ${TEST_VIDEOS[index].name}`);
  };

  const togglePlayerType = () => {
    setUseSimplePlayer(!useSimplePlayer);
    addLog(`🔄 Basculement vers: ${!useSimplePlayer ? 'Simple' : 'Natif'} Player`);
  };

  const testPlayerMethods = async () => {
    if (!playerRef.current) {
      addLog('❌ Aucune référence au player');
      return;
    }

    try {
      addLog('🧪 Test des méthodes du VRAI player VLC...');
      
      // Test play
      await playerRef.current.play();
      addLog('✅ play() - OK');
      
      // Test getCurrentTime
      const currentTime = await playerRef.current.getCurrentTime();
      addLog(`✅ getCurrentTime() - ${currentTime}ms`);
      
      // Test getDuration
      const duration = await playerRef.current.getDuration();
      addLog(`✅ getDuration() - ${duration}ms`);
      
      // Test getState
      const state = await playerRef.current.getState();
      addLog(`✅ getState() - ${state}`);
      
    } catch (error: any) {
      addLog(`❌ Erreur test: ${error.message}`);
    }
  };

  const generateFeedbackText = () => {
    const timestamp = new Date().toLocaleString();
    return `
=== FEEDBACK VLC PLAYER RÉEL ===
Date: ${timestamp}
Module importé: ${importStatus}
Player utilisé: ${useSimplePlayer ? 'Simple' : 'Natif'}
Vidéo testée: ${TEST_VIDEOS[currentVideo].name}
Plateforme: React Native (${Platform.OS})

=== LOGS RÉCENTS ===
${logs.slice(0, 5).join('\n')}

=== INFORMATIONS SYSTÈME ===
- React Native: CLI (pas Expo)
- OS: ${Platform.OS}
- Module VLC: ${useNativePlayer ? 'RÉEL - Disponible' : 'Non disponible'}

=== NOTES ===
[Ajoutez vos observations ici]
    `.trim();
  };

  const copyFeedback = async () => {
    try {
      const feedbackText = generateFeedbackText();
      await Clipboard.setString(feedbackText);
      addLog('📋 Feedback copié dans le presse-papiers !');
      Alert.alert(
        '✅ Copié !',
        'Le feedback a été copié dans le presse-papiers. Vous pouvez maintenant le coller dans un message.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      addLog('❌ Erreur lors de la copie');
      Alert.alert('Erreur', 'Impossible de copier le feedback');
    }
  };

  const showFeedback = () => {
    const feedbackText = generateFeedbackText();
    Alert.alert(
      'Feedback VLC Player RÉEL',
      feedbackText,
      [
        { text: 'Copier', onPress: copyFeedback },
        { text: 'Fermer', style: 'cancel' }
      ],
      { cancelable: true }
    );
  };

  const showFeedbackInLogs = () => {
    addLog('📝 === GÉNÉRATION DU FEEDBACK ===');
    const timestamp = new Date().toLocaleString();
    
    addLog(`📅 Date: ${timestamp}`);
    addLog(`📦 Module: ${importStatus}`);
    addLog(`🎮 Player: ${useSimplePlayer ? 'Simple' : 'Natif'}`);
    addLog(`🎬 Vidéo: ${TEST_VIDEOS[currentVideo].name}`);
    addLog(`📱 Plateforme: React Native (${Platform.OS})`);
    addLog(`🔧 VLC RÉEL: ${useNativePlayer ? 'Oui' : 'Non'}`);
    addLog('📝 === FIN DU FEEDBACK ===');
  };

  // Choisir le composant à utiliser
  const PlayerComponent = useSimplePlayer ? VLCPlayerSimple : VLCPlayer;
  const playerAvailable = useSimplePlayer ? VLCPlayerSimple : VLCPlayer;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.header}>
        <Text style={styles.title}>🎬 VLC Pro RÉEL Test</Text>
        <Text style={styles.subtitle}>
          {useSimplePlayer ? 'Simple' : 'Natif'} Player - {TEST_VIDEOS[currentVideo].name}
        </Text>
        <Text style={styles.realBadge}>🔥 COMPOSANT RÉEL VLC</Text>
      </View>
      
      <View style={styles.playerContainer}>
        {playerAvailable ? (
          <PlayerComponent
            ref={playerRef}
            source={{ uri: TEST_VIDEOS[currentVideo].uri }}
            style={styles.player}
            autoPlay={false}
            onReady={() => addLog('🎬 VLC Player RÉEL prêt !')}
            onPlay={() => {
              setIsPlaying(true);
              addLog('▶️ Lecture démarrée (RÉEL)');
            }}
            onPause={() => {
              setIsPlaying(false);
              addLog('⏸️ Lecture en pause (RÉEL)');
            }}
            onStop={() => {
              setIsPlaying(false);
              addLog('⏹️ Lecture arrêtée (RÉEL)');
            }}
            onError={(error: any) => addLog(`❌ Erreur VLC RÉEL: ${JSON.stringify(error)}`)}
            onProgress={(data: any) => {
              if (data?.currentTime && data.currentTime % 5000 < 100) {
                addLog(`⏱️ Progression RÉELLE: ${Math.round(data.currentTime / 1000)}s`);
              }
            }}
            onEnd={() => addLog('🏁 Fin de la vidéo (RÉEL)')}
            onBuffer={(data: any) => addLog('⏳ Buffering RÉEL...')}
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>📹</Text>
            <Text style={styles.placeholderText}>VLC Player RÉEL</Text>
            <Text style={styles.placeholderSubtext}>Module non disponible</Text>
          </View>
        )}
      </View>

      {/* Contrôles de test */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={togglePlayerType}>
          <Text style={styles.buttonText}>
            {useSimplePlayer ? '🔧 Natif' : '🎯 Simple'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={testPlayerMethods}>
          <Text style={styles.buttonText}>🧪 Test API</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={showFeedbackInLogs}>
          <Text style={styles.buttonText}>📝 Logs</Text>
        </TouchableOpacity>
      </View>

      {/* Sélection de vidéo */}
      <View style={styles.videoSelector}>
        <Text style={styles.sectionTitle}>Vidéos de test:</Text>
        {TEST_VIDEOS.map((video, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.videoButton, currentVideo === index && styles.activeVideo]}
            onPress={() => changeVideo(index)}
          >
            <Text style={[styles.videoButtonText, currentVideo === index && styles.activeVideoText]}>
              {video.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logs */}
      <View style={styles.logsContainer}>
        <Text style={styles.sectionTitle}>Logs récents:</Text>
        <ScrollView style={styles.logsScroll}>
          {logs.map((log, index) => (
            <Text key={index} style={styles.logText}>{log}</Text>
          ))}
        </ScrollView>
      </View>

      {/* Footer avec feedback */}
      <View style={styles.footer}>
        <Text style={styles.statusText}>{importStatus}</Text>
        <View style={styles.feedbackButtons}>
          <TouchableOpacity style={styles.feedbackButton} onPress={showFeedback}>
            <Text style={styles.feedbackButtonText}>📝 Voir Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.copyButton} onPress={copyFeedback}>
            <Text style={styles.copyButtonText}>📋 Copier</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 5,
  },
  realBadge: {
    fontSize: 10,
    color: '#ff6b35',
    fontWeight: 'bold',
    backgroundColor: '#fff3f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  playerContainer: {
    height: 200,
    margin: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  player: {
    flex: 1,
  },
  placeholder: {
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 32,
    color: '#ffffff',
    marginBottom: 5,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#cccccc',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  videoSelector: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  videoButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeVideo: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  videoButtonText: {
    color: '#333333',
    fontSize: 14,
  },
  activeVideoText: {
    color: '#ffffff',
  },
  logsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  logsScroll: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    maxHeight: 120,
  },
  logText: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 2,
  },
  footer: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  statusText: {
    fontSize: 12,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  feedbackButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  feedbackButton: {
    backgroundColor: '#34C759',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  feedbackButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  copyButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  copyButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
}); 