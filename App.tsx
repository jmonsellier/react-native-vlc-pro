import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';

// Test d'import
let VLCPlayer;
let importStatus = '';
try {
  const vlcModule = require('react-native-vlc-pro');
  VLCPlayer = vlcModule.VLCPlayer;
  importStatus = VLCPlayer ? '✅ VLCPlayer importé avec succès' : '❌ VLCPlayer non trouvé dans le module';
} catch (error) {
  importStatus = `❌ Erreur d'import: ${error.message}`;
}

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <Text style={styles.title}>🎬 VLC Pro Test App 1</Text>
        <Text style={styles.subtitle}>Test de la bibliothèque react-native-vlc-pro</Text>
      </View>
      
      <View style={styles.playerContainer}>
        {VLCPlayer ? (
          <VLCPlayer
            source={{ 
              uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' 
            }}
            style={styles.player}
            autoPlay={true}
            onReady={() => console.log('🎬 VLC Player prêt !')}
            onPlay={() => console.log('▶️ Lecture démarrée')}
            onPause={() => console.log('⏸️ Lecture en pause')}
            onError={(error) => console.log('❌ Erreur VLC:', error)}
            onProgress={(data) => console.log('⏱️ Progression:', Math.round(data.currentTime / 1000) + 's')}
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>📹</Text>
            <Text style={styles.placeholderText}>VLC Player</Text>
            <Text style={styles.placeholderSubtext}>Import échoué</Text>
          </View>
        )}
      </View>
      
      <View style={styles.info}>
        <Text style={styles.infoText}>
          📱 Test sur appareil Android réel
        </Text>
        <Text style={styles.infoText}>
          🎥 Vidéo de test : Big Buck Bunny
        </Text>
        <Text style={styles.statusText}>
          {importStatus}
        </Text>
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
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  playerContainer: {
    flex: 1,
    margin: 20,
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
    fontSize: 48,
    color: '#ffffff',
    marginBottom: 10,
  },
  placeholderSubtext: {
    fontSize: 16,
    color: '#cccccc',
  },
  info: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 5,
  },
  statusText: {
    fontSize: 12,
    color: '#333333',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default App;