/**
 * Exemples de streaming pour react-native-vlc-pro
 * Phase 1, Semaine 4 : Tests de compatibilité avec différents formats
 */

import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import { VLCPlayer } from '../src';
import type { VLCPlayerRef, MediaSource } from '../src';

// Exemples de sources média pour tests
const STREAMING_EXAMPLES: { title: string; source: MediaSource; description: string }[] = [
  {
    title: 'MP4 - Big Buck Bunny',
    source: {
      uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      type: 'video/mp4',
      title: 'Big Buck Bunny',
    },
    description: 'Vidéo MP4 standard via HTTP',
  },
  {
    title: 'HLS - Apple Test Stream',
    source: {
      uri: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
      type: 'application/x-mpegURL',
      title: 'Apple HLS Test',
    },
    description: 'Stream HLS (HTTP Live Streaming)',
  },
  {
    title: 'DASH - Big Buck Bunny',
    source: {
      uri: 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd',
      type: 'application/dash+xml',
      title: 'DASH Stream',
    },
    description: 'Stream DASH (Dynamic Adaptive Streaming)',
  },
  {
    title: 'WebM - Test Video',
    source: {
      uri: 'https://sample-videos.com/zip/10/webm/mp4/SampleVideo_1280x720_1mb.webm',
      type: 'video/webm',
      title: 'WebM Test',
    },
    description: 'Vidéo WebM',
  },
  {
    title: 'MKV - Test avec headers',
    source: {
      uri: 'https://file-examples.com/storage/fe68c1b7c66fa7d2367a9ac/2017/10/file_example_MKV_480_1_5MG.mkv',
      type: 'video/x-matroska',
      title: 'MKV Test',
      headers: {
        'User-Agent': 'ReactNativeVLCPro/1.0',
        'Referer': 'https://example.com',
      },
    },
    description: 'Vidéo MKV avec headers personnalisés',
  },
  {
    title: 'Stream avec authentification',
    source: {
      uri: 'https://httpbin.org/basic-auth/user/pass',
      headers: {
        'Authorization': 'Basic dXNlcjpwYXNz', // user:pass en base64
        'User-Agent': 'ReactNativeVLCPro/1.0',
      },
    },
    description: 'Test d\'authentification HTTP Basic',
  },
];

const StreamingExamples: React.FC = () => {
  const playerRef = useRef<VLCPlayerRef>(null);
  const [currentExample, setCurrentExample] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadExample = (index: number) => {
    setCurrentExample(index);
    setIsLoading(true);
  };

  const handleReady = () => {
    setIsLoading(false);
    Alert.alert('Succès', 'Média chargé avec succès !');
  };

  const handleError = (error: any) => {
    setIsLoading(false);
    Alert.alert('Erreur', `Erreur de lecture: ${error.message || 'Erreur inconnue'}`);
  };

  const currentSource = STREAMING_EXAMPLES[currentExample];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Tests de Streaming</Text>
          <Text style={styles.subtitle}>Formats et protocoles supportés</Text>
        </View>

        <View style={styles.playerContainer}>
          <VLCPlayer
            ref={playerRef}
            source={currentSource.source}
            style={styles.player}
            autoPlay={true}
            onReady={handleReady}
            onError={handleError}
            onLoad={() => console.log('Media loaded')}
            onProgress={(progress) => console.log('Progress:', progress)}
          />
          
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <Text style={styles.loadingText}>Chargement...</Text>
            </View>
          )}
        </View>

        <View style={styles.currentInfo}>
          <Text style={styles.currentTitle}>{currentSource.title}</Text>
          <Text style={styles.currentDescription}>{currentSource.description}</Text>
          <Text style={styles.currentUri}>URI: {currentSource.source.uri}</Text>
          {currentSource.source.headers && (
            <View style={styles.headersContainer}>
              <Text style={styles.headersTitle}>Headers:</Text>
              {Object.entries(currentSource.source.headers).map(([key, value]) => (
                <Text key={key} style={styles.headerItem}>
                  {key}: {value}
                </Text>
              ))}
            </View>
          )}
        </View>

        <View style={styles.examplesContainer}>
          <Text style={styles.sectionTitle}>Exemples disponibles</Text>
          {STREAMING_EXAMPLES.map((example, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.exampleButton,
                index === currentExample && styles.exampleButtonActive,
              ]}
              onPress={() => loadExample(index)}
            >
              <Text
                style={[
                  styles.exampleButtonText,
                  index === currentExample && styles.exampleButtonTextActive,
                ]}
              >
                {example.title}
              </Text>
              <Text style={styles.exampleDescription}>{example.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Formats supportés</Text>
          <Text style={styles.infoText}>
            • MP4, AVI, MKV, MOV, FLV, WebM{'\n'}
            • HLS (HTTP Live Streaming){'\n'}
            • DASH (Dynamic Adaptive Streaming){'\n'}
            • RTMP, RTSP{'\n'}
            • HTTP/HTTPS avec headers personnalisés{'\n'}
            • Authentification HTTP Basic
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
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  playerContainer: {
    margin: 20,
    backgroundColor: 'black',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  player: {
    width: '100%',
    height: 200,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
  },
  currentInfo: {
    margin: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  currentDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  currentUri: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'monospace',
  },
  headersContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  headersTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerItem: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
  examplesContainer: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  exampleButton: {
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
  exampleButtonActive: {
    backgroundColor: '#2196F3',
  },
  exampleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  exampleButtonTextActive: {
    color: 'white',
  },
  exampleDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  infoSection: {
    margin: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default StreamingExamples; 