# Documentation API - react-native-vlc-pro

## Vue d'ensemble

`react-native-vlc-pro` est un lecteur vidéo professionnel pour React Native basé sur libVLC. Il offre une API complète pour la lecture de contenus multimédia avec des fonctionnalités avancées.

## Installation

```bash
npm install react-native-vlc-pro
# ou
yarn add react-native-vlc-pro
```

### Configuration iOS

Ajoutez à votre `Podfile` :

```ruby
pod 'MobileVLCKit', '~> 4.0.0a2'
```

### Configuration Android

Ajoutez à votre `android/app/build.gradle` :

```gradle
dependencies {
    implementation 'org.videolan.android:libvlc-all:3.6.5'
}
```

## Composants

### VLCPlayer

Le composant principal pour la lecture vidéo.

```typescript
import { VLCPlayer } from 'react-native-vlc-pro';

<VLCPlayer
  source={{ uri: 'https://example.com/video.mp4' }}
  style={{ width: 300, height: 200 }}
  onReady={() => console.log('Prêt')}
  onPlay={() => console.log('Lecture')}
  onPause={() => console.log('Pause')}
/>
```

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `source` | `MediaSource` | **requis** | Source du média à lire |
| `style` | `ViewStyle` | `{}` | Style du conteneur |
| `paused` | `boolean` | `false` | État de pause |
| `volume` | `number` | `1.0` | Volume (0.0 - 1.0) |
| `muted` | `boolean` | `false` | État muet |
| `rate` | `number` | `1.0` | Vitesse de lecture |
| `repeat` | `boolean` | `false` | Lecture en boucle |
| `resizeMode` | `ResizeMode` | `'contain'` | Mode de redimensionnement |
| `poster` | `string` | `undefined` | Image d'aperçu |
| `posterResizeMode` | `ImageResizeMode` | `'contain'` | Mode de redimensionnement du poster |

#### Événements

| Événement | Type | Description |
|-----------|------|-------------|
| `onReady` | `() => void` | Lecteur prêt |
| `onPlay` | `() => void` | Lecture démarrée |
| `onPause` | `() => void` | Lecture en pause |
| `onStop` | `() => void` | Lecture arrêtée |
| `onEnd` | `() => void` | Fin de lecture |
| `onError` | `(error: VLCError) => void` | Erreur survenue |
| `onProgress` | `(data: ProgressData) => void` | Progression de lecture |
| `onBuffer` | `(data: BufferData) => void` | État de buffering |
| `onSeek` | `(data: SeekData) => void` | Recherche effectuée |

### VideoControls

Contrôles de base pour le lecteur vidéo.

```typescript
import { VideoControls } from 'react-native-vlc-pro';

<VideoControls
  isPlaying={true}
  currentTime={30000}
  duration={120000}
  volume={80}
  onPlay={() => player.play()}
  onPause={() => player.pause()}
  onSeek={(time) => player.seek(time)}
/>
```

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `isPlaying` | `boolean` | **requis** | État de lecture |
| `currentTime` | `number` | **requis** | Temps actuel (ms) |
| `duration` | `number` | **requis** | Durée totale (ms) |
| `volume` | `number` | **requis** | Volume (0-100) |
| `isMuted` | `boolean` | **requis** | État muet |
| `playbackRate` | `number` | **requis** | Vitesse de lecture |
| `visible` | `boolean` | `true` | Visibilité des contrôles |
| `theme` | `VLCPlayerTheme` | `'dark'` | Thème des contrôles |

### VideoControlsAdvanced

Contrôles avancés avec fonctionnalités étendues.

```typescript
import { VideoControlsAdvanced } from 'react-native-vlc-pro';

<VideoControlsAdvanced
  isPlaying={true}
  currentTime={30000}
  duration={120000}
  volume={80}
  audioTracks={audioTracks}
  subtitleTracks={subtitleTracks}
  controlsConfig={{
    showTrackSelector: true,
    showRateSelector: true,
  }}
  customTheme={{
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    progressColor: '#FF6B35',
  }}
/>
```

#### Props étendues

| Prop | Type | Description |
|------|------|-------------|
| `audioTracks` | `AudioTrack[]` | Pistes audio disponibles |
| `subtitleTracks` | `SubtitleTrack[]` | Pistes de sous-titres |
| `selectedAudioTrack` | `number` | Piste audio sélectionnée |
| `selectedSubtitleTrack` | `number` | Piste de sous-titres sélectionnée |
| `controlsConfig` | `ControlsConfig` | Configuration des contrôles |
| `customTheme` | `CustomTheme` | Thème personnalisé |
| `accessibilityConfig` | `AccessibilityConfig` | Configuration d'accessibilité |

### TrackSelector

Sélecteur modal pour les pistes audio et sous-titres.

```typescript
import { TrackSelector } from 'react-native-vlc-pro';

<TrackSelector
  visible={showSelector}
  audioTracks={audioTracks}
  subtitleTracks={subtitleTracks}
  selectedAudioTrack={currentAudioTrack}
  onAudioTrackSelect={(id) => setAudioTrack(id)}
  onSubtitleTrackSelect={(id) => setSubtitleTrack(id)}
  onClose={() => setShowSelector(false)}
/>
```

## Hooks

### useVLCPlayer

Hook principal pour contrôler le lecteur VLC.

```typescript
import { useVLCPlayer } from 'react-native-vlc-pro';

const MyComponent = () => {
  const {
    playerRef,
    isPlaying,
    currentTime,
    duration,
    play,
    pause,
    seek,
    setVolume,
  } = useVLCPlayer({
    source: { uri: 'https://example.com/video.mp4' },
    autoPlay: true,
  });

  return (
    <VLCPlayer
      ref={playerRef}
      source={source}
      style={{ flex: 1 }}
    />
  );
};
```

#### Options

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `source` | `MediaSource` | **requis** | Source du média |
| `autoPlay` | `boolean` | `false` | Lecture automatique |
| `loop` | `boolean` | `false` | Lecture en boucle |
| `muted` | `boolean` | `false` | Démarrer en muet |
| `volume` | `number` | `1.0` | Volume initial |
| `rate` | `number` | `1.0` | Vitesse initiale |

#### Valeurs retournées

| Propriété | Type | Description |
|-----------|------|-------------|
| `playerRef` | `RefObject<VLCPlayerRef>` | Référence du lecteur |
| `isPlaying` | `boolean` | État de lecture |
| `isPaused` | `boolean` | État de pause |
| `isLoading` | `boolean` | État de chargement |
| `currentTime` | `number` | Temps actuel (ms) |
| `duration` | `number` | Durée totale (ms) |
| `volume` | `number` | Volume actuel |
| `isMuted` | `boolean` | État muet |
| `playbackRate` | `number` | Vitesse de lecture |
| `play` | `() => Promise<void>` | Démarrer la lecture |
| `pause` | `() => Promise<void>` | Mettre en pause |
| `stop` | `() => Promise<void>` | Arrêter la lecture |
| `seek` | `(time: number) => Promise<void>` | Rechercher une position |
| `setVolume` | `(volume: number) => Promise<void>` | Définir le volume |
| `setRate` | `(rate: number) => Promise<void>` | Définir la vitesse |

### useFullscreen

Hook pour gérer le mode plein écran.

```typescript
import { useFullscreen } from 'react-native-vlc-pro';

const MyComponent = () => {
  const {
    isFullscreen,
    toggleFullscreen,
    enterFullscreen,
    exitFullscreen,
    screenDimensions,
  } = useFullscreen({
    hideStatusBar: true,
    onFullscreenChange: (isFullscreen) => {
      console.log('Plein écran:', isFullscreen);
    },
  });

  return (
    <View style={isFullscreen ? styles.fullscreen : styles.normal}>
      <VLCPlayer source={source} />
      <Button onPress={toggleFullscreen} title="Plein écran" />
    </View>
  );
};
```

#### Options

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `hideStatusBar` | `boolean` | `true` | Masquer la barre de statut |
| `orientation` | `'landscape' \| 'portrait' \| 'auto'` | `'auto'` | Orientation forcée |
| `onFullscreenChange` | `(isFullscreen: boolean) => void` | `undefined` | Callback de changement |

## Types

### MediaSource

```typescript
interface MediaSource {
  uri: string;
  title?: string;
  subtitle?: string;
  description?: string;
  type?: string;
  headers?: Record<string, string>;
  textTracks?: TextTrack[];
}
```

### AudioTrack

```typescript
interface AudioTrack {
  id: number;
  name?: string;
  language?: string;
  description?: string;
}
```

### SubtitleTrack

```typescript
interface SubtitleTrack {
  id: number;
  name?: string;
  language?: string;
  encoding?: string;
  type?: string;
}
```

### CustomTheme

```typescript
interface CustomTheme {
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  progressColor?: string;
  progressBackgroundColor?: string;
  controlsOpacity?: number;
  borderRadius?: number;
}
```

### ControlsConfig

```typescript
interface ControlsConfig {
  showPlayPause?: boolean;
  showSeekButtons?: boolean;
  showVolumeControl?: boolean;
  showRateSelector?: boolean;
  showFullscreenButton?: boolean;
  showProgressBar?: boolean;
  showTimeInfo?: boolean;
  showTrackSelector?: boolean;
}
```

### PerformanceMetrics

```typescript
interface PerformanceMetrics {
  startupTime: number;
  firstFrameTime: number;
  memoryUsage: number;
  averageFPS: number;
  bufferingTime: number;
  bufferingEvents: number;
  downloadSpeed: number;
}
```

## Utilitaires

### formatTime

Formate un temps en millisecondes en format lisible.

```typescript
import { formatTime } from 'react-native-vlc-pro';

const formatted = formatTime(90000); // "01:30"
const withHours = formatTime(3690000); // "01:01:30"
```

### PerformanceProfiler

Classe pour profiler les performances du lecteur.

```typescript
import { PerformanceProfiler } from 'react-native-vlc-pro';

const profiler = new PerformanceProfiler({
  enabled: true,
  thresholds: {
    maxStartupTime: 2000,
    maxFirstFrameTime: 3000,
    maxMemoryUsage: 200,
    minFPS: 30,
    maxBufferingTime: 5000,
  },
});

profiler.start();
// ... utilisation du lecteur
const metrics = profiler.stop();
console.log(profiler.generateReport());
```

### PerformanceUtils

Utilitaires de performance.

```typescript
import { PerformanceUtils } from 'react-native-vlc-pro';

// Mesurer le temps d'exécution
const { result, duration } = PerformanceUtils.measureTime(
  () => heavyOperation(),
  'Opération lourde'
);

// Débouncer une fonction
const debouncedSeek = PerformanceUtils.debounce(
  (time) => player.seek(time),
  300
);

// Formater la taille
const size = PerformanceUtils.formatBytes(1024 * 1024); // "1 MB"
```

## Exemples d'utilisation

### Lecteur basique

```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { VLCPlayer } from 'react-native-vlc-pro';

const BasicPlayer = () => {
  return (
    <View style={styles.container}>
      <VLCPlayer
        source={{
          uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          title: 'Big Buck Bunny',
        }}
        style={styles.player}
        onReady={() => console.log('Prêt')}
        onError={(error) => console.error('Erreur:', error)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  player: {
    width: 300,
    height: 200,
  },
});
```

### Lecteur avec contrôles avancés

```typescript
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { 
  VLCPlayer, 
  VideoControlsAdvanced, 
  useVLCPlayer 
} from 'react-native-vlc-pro';

const AdvancedPlayer = () => {
  const [showControls, setShowControls] = useState(true);
  
  const {
    playerRef,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackRate,
    play,
    pause,
    seek,
    setVolume,
    setRate,
  } = useVLCPlayer({
    source: {
      uri: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
      type: 'application/x-mpegURL',
    },
    autoPlay: true,
  });

  const audioTracks = [
    { id: 1, name: 'Français', language: 'fr', description: 'Piste française' },
    { id: 2, name: 'English', language: 'en', description: 'English track' },
  ];

  const subtitleTracks = [
    { id: 1, name: 'Français', language: 'fr', encoding: 'UTF-8', type: 'srt' },
    { id: 2, name: 'English', language: 'en', encoding: 'UTF-8', type: 'vtt' },
  ];

  return (
    <View style={styles.container}>
      <VLCPlayer
        ref={playerRef}
        style={styles.player}
        onProgress={(data) => console.log('Progression:', data)}
      />
      
      <VideoControlsAdvanced
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isMuted={isMuted}
        playbackRate={playbackRate}
        visible={showControls}
        audioTracks={audioTracks}
        subtitleTracks={subtitleTracks}
        controlsConfig={{
          showTrackSelector: true,
          showRateSelector: true,
          showFullscreenButton: true,
        }}
        customTheme={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          progressColor: '#FF6B35',
          textColor: '#FFFFFF',
        }}
        onPlay={play}
        onPause={pause}
        onSeek={seek}
        onVolumeChange={setVolume}
        onRateChange={setRate}
        onAudioTrackSelect={(id) => console.log('Piste audio:', id)}
        onSubtitleTrackSelect={(id) => console.log('Sous-titres:', id)}
      />
    </View>
  );
};
```

### Streaming avec authentification

```typescript
import React from 'react';
import { VLCPlayer } from 'react-native-vlc-pro';

const AuthenticatedStream = () => {
  return (
    <VLCPlayer
      source={{
        uri: 'https://secure-stream.example.com/video.m3u8',
        headers: {
          'Authorization': 'Bearer your-token-here',
          'User-Agent': 'MyApp/1.0.0',
          'X-Custom-Header': 'custom-value',
        },
      }}
      style={{ width: 300, height: 200 }}
      onError={(error) => {
        if (error.code === 401) {
          console.log('Erreur d\'authentification');
        }
      }}
    />
  );
};
```

## Gestion des erreurs

```typescript
const handleError = (error: VLCError) => {
  switch (error.code) {
    case 404:
      console.log('Média non trouvé');
      break;
    case 401:
      console.log('Authentification requise');
      break;
    case 'NETWORK_ERROR':
      console.log('Erreur réseau');
      break;
    default:
      console.log('Erreur inconnue:', error.message);
  }
};
```

## Performance et optimisation

### Profiling

```typescript
import { PerformanceProfiler } from 'react-native-vlc-pro';

const profiler = new PerformanceProfiler({
  enabled: __DEV__, // Seulement en développement
  thresholds: {
    maxStartupTime: 2000,
    maxFirstFrameTime: 3000,
    maxMemoryUsage: 200,
    minFPS: 30,
    maxBufferingTime: 5000,
  },
});

// Dans votre composant
useEffect(() => {
  profiler.start();
  return () => {
    const metrics = profiler.stop();
    console.log('Métriques de performance:', metrics);
  };
}, []);
```

### Optimisations recommandées

1. **Utiliser le débouncing pour les contrôles**
```typescript
const debouncedSeek = PerformanceUtils.debounce(seek, 300);
```

2. **Limiter les mises à jour de progression**
```typescript
const throttledProgress = PerformanceUtils.throttle(
  (data) => setProgress(data),
  100
);
```

3. **Libérer les ressources**
```typescript
useEffect(() => {
  return () => {
    playerRef.current?.stop();
  };
}, []);
```

## Support et compatibilité

- **React Native** : 0.79.0+
- **iOS** : 12.0+ avec MobileVLCKit 4.0.0a2+
- **Android** : API 21+ avec libVLC 3.6.5+

## Formats supportés

### Vidéo
- MP4, AVI, MKV, MOV, FLV, WebM
- H.264, H.265, VP8, VP9

### Audio
- MP3, AAC, OGG, FLAC, WAV

### Streaming
- HLS (.m3u8)
- DASH (.mpd)
- RTMP, RTSP
- HTTP/HTTPS

### Sous-titres
- SRT, VTT, ASS, SSA 