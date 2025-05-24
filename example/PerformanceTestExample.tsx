/**
 * Exemple de test de performance pour react-native-vlc-pro
 * Phase 3, Semaine 1 : Tests de performance en temps réel
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import {
  VLCPlayer,
  VideoControlsAdvanced,
  useVLCPlayer,
  useFullscreen,
  PerformanceProfiler,
  PerformanceUtils,
  type PerformanceMetrics,
  type MediaSource,
} from '../src';

const PerformanceTestExample: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [profilingEnabled, setProfilingEnabled] = useState(true);
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isTestRunning, setIsTestRunning] = useState(false);
  
  const profilerRef = useRef<PerformanceProfiler>(
    new PerformanceProfiler({
      enabled: true,
      thresholds: {
        maxStartupTime: 2000,
        maxFirstFrameTime: 3000,
        maxMemoryUsage: 200,
        minFPS: 30,
        maxBufferingTime: 5000,
      },
    })
  );

  const testVideos: MediaSource[] = [
    {
      uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      title: 'Big Buck Bunny (MP4)',
      type: 'video/mp4',
    },
    {
      uri: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
      title: 'Tears of Steel (HLS)',
      type: 'application/x-mpegURL',
    },
    {
      uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      title: 'Elephants Dream (MP4)',
      type: 'video/mp4',
    },
  ];

  const {
    playerRef,
    state,
    controls,
  } = useVLCPlayer({
    source: testVideos[selectedVideo],
    autoPlay: false,
  });

  // Valeurs par défaut pour l'exemple
  const isPlaying = false;
  const currentTime = 0;
  const duration = 0;
  const volume = 100;
  const isMuted = false;
  const playbackRate = 1.0;
  const play = () => Promise.resolve();
  const pause = () => Promise.resolve();
  const seek = (time: number) => Promise.resolve();
  const setVolume = (vol: number) => Promise.resolve();
  const setRate = (rate: number) => Promise.resolve();

  const {
    isFullscreen,
    toggleFullscreen,
    screenDimensions,
  } = useFullscreen({
    hideStatusBar: true,
    onFullscreenChange: (fullscreen) => {
      console.log('Mode plein écran:', fullscreen);
    },
  });

  // Démarrer le profiling quand le composant se monte
  useEffect(() => {
    if (profilingEnabled) {
      profilerRef.current.start();
    }
    
    return () => {
      if (profilingEnabled) {
        const finalMetrics = profilerRef.current.stop();
        setMetrics(finalMetrics);
      }
    };
  }, [profilingEnabled]);

  // Enregistrer les événements de performance
  const handleReady = () => {
    console.log('Lecteur prêt');
    if (profilingEnabled) {
      profilerRef.current.recordStartup();
    }
  };

  const handleProgress = (data: any) => {
    if (profilingEnabled) {
      profilerRef.current.recordFrame();
      
      // Simuler l'utilisation mémoire (en production, utiliser des outils natifs)
      const mockMemoryUsage = Math.random() * 50 + 100; // 100-150 MB
      profilerRef.current.recordMemoryUsage(mockMemoryUsage);
    }
  };

  const handleBuffer = (data: any) => {
    if (profilingEnabled) {
      profilerRef.current.recordBuffering(data.isBuffering);
    }
  };

  const handleFirstFrame = () => {
    if (profilingEnabled) {
      profilerRef.current.recordFirstFrame();
    }
  };

  // Test de stress avec changements rapides de source
  const runStressTest = async () => {
    setIsTestRunning(true);
    Alert.alert(
      'Test de stress',
      'Ce test va changer rapidement de source vidéo pour tester la stabilité.',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Démarrer', 
          onPress: async () => {
            for (let i = 0; i < testVideos.length; i++) {
              setSelectedVideo(i);
              await new Promise(resolve => setTimeout(resolve, 3000));
            }
            setIsTestRunning(false);
            Alert.alert('Test terminé', 'Le test de stress est terminé.');
          }
        },
      ]
    );
  };

  // Générer un rapport de performance
  const generateReport = () => {
    const report = profilerRef.current.generateReport();
    Alert.alert('Rapport de Performance', report);
  };

  // Test de mémoire avec plusieurs instances
  const testMultipleInstances = () => {
    Alert.alert(
      'Test d\'instances multiples',
      'Ce test créerait plusieurs instances du lecteur (non implémenté dans cet exemple pour éviter la surcharge).'
    );
  };

  return (
    <View style={[styles.container, isFullscreen && styles.fullscreen]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* En-tête */}
        <View style={styles.header}>
          <Text style={styles.title}>Tests de Performance VLC</Text>
          <Text style={styles.subtitle}>
            Écran: {screenDimensions.width}x{screenDimensions.height}
          </Text>
        </View>

        {/* Lecteur vidéo */}
        <View style={styles.playerContainer}>
          <VLCPlayer
            ref={playerRef}
            source={testVideos[selectedVideo]}
            style={styles.player}
            onReady={handleReady}
            onProgress={handleProgress}
            onBuffer={handleBuffer}
            onPlay={handleFirstFrame}
          />
          
          <VideoControlsAdvanced
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            isMuted={isMuted}
            playbackRate={playbackRate}
            isFullscreen={isFullscreen}
            visible={showControls}
            theme="dark"
            controlsConfig={{
              showTrackSelector: false,
              showRateSelector: true,
              showFullscreenButton: true,
            }}
            onPlay={play}
            onPause={pause}
            onSeek={seek}
            onVolumeChange={setVolume}
            onRateChange={setRate}
            onFullscreenToggle={toggleFullscreen}
          />
        </View>

        {/* Sélection de vidéo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vidéos de test</Text>
          {testVideos.map((video, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.videoOption,
                selectedVideo === index && styles.selectedVideo,
              ]}
              onPress={() => setSelectedVideo(index)}
              disabled={isTestRunning}
            >
              <Text style={styles.videoTitle}>{video.title}</Text>
              <Text style={styles.videoType}>{video.type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Configuration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuration</Text>
          
          <View style={styles.configRow}>
            <Text style={styles.configLabel}>Profiling activé</Text>
            <Switch
              value={profilingEnabled}
              onValueChange={setProfilingEnabled}
            />
          </View>
          
          <View style={styles.configRow}>
            <Text style={styles.configLabel}>Afficher les contrôles</Text>
            <Switch
              value={showControls}
              onValueChange={setShowControls}
            />
          </View>
        </View>

        {/* Tests de performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tests de performance</Text>
          
          <TouchableOpacity
            style={[styles.testButton, isTestRunning && styles.disabledButton]}
            onPress={runStressTest}
            disabled={isTestRunning}
          >
            <Text style={styles.testButtonText}>
              {isTestRunning ? 'Test en cours...' : 'Test de stress'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.testButton}
            onPress={testMultipleInstances}
          >
            <Text style={styles.testButtonText}>Test instances multiples</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.testButton}
            onPress={generateReport}
            disabled={!profilingEnabled}
          >
            <Text style={styles.testButtonText}>Générer rapport</Text>
          </TouchableOpacity>
        </View>

        {/* Métriques en temps réel */}
        {profilingEnabled && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Métriques en temps réel</Text>
            
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Temps de lecture</Text>
                <Text style={styles.metricValue}>
                  {PerformanceUtils.formatBytes(currentTime)} / {PerformanceUtils.formatBytes(duration)}
                </Text>
              </View>
              
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Vitesse</Text>
                <Text style={styles.metricValue}>{playbackRate}x</Text>
              </View>
              
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Volume</Text>
                <Text style={styles.metricValue}>{volume}%</Text>
              </View>
              
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>État</Text>
                <Text style={styles.metricValue}>
                  {isPlaying ? 'Lecture' : 'Pause'}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Métriques finales */}
        {metrics && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dernières métriques</Text>
            
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Démarrage</Text>
                <Text style={styles.metricValue}>{metrics.startupTime}ms</Text>
              </View>
              
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Premier frame</Text>
                <Text style={styles.metricValue}>{metrics.firstFrameTime}ms</Text>
              </View>
              
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Mémoire</Text>
                <Text style={styles.metricValue}>{metrics.memoryUsage.toFixed(1)}MB</Text>
              </View>
              
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>FPS moyen</Text>
                <Text style={styles.metricValue}>{metrics.averageFPS.toFixed(1)}</Text>
              </View>
              
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Buffering</Text>
                <Text style={styles.metricValue}>{metrics.bufferingTime}ms</Text>
              </View>
              
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Événements buffer</Text>
                <Text style={styles.metricValue}>{metrics.bufferingEvents}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  fullscreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#AAA',
    textAlign: 'center',
    marginTop: 4,
  },
  playerContainer: {
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  player: {
    width: '100%',
    height: 200,
    backgroundColor: '#222',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#111',
    borderRadius: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 12,
  },
  videoOption: {
    padding: 12,
    backgroundColor: '#222',
    borderRadius: 6,
    marginBottom: 8,
  },
  selectedVideo: {
    backgroundColor: '#2196F3',
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  videoType: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 2,
  },
  configRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  configLabel: {
    fontSize: 16,
    color: '#FFF',
  },
  testButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#555',
  },
  testButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricItem: {
    width: '48%',
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: '#AAA',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default PerformanceTestExample; 