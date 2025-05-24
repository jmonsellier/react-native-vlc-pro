# Guide de Streaming - React Native VLC Pro

## 📺 Formats et Protocoles Supportés

React Native VLC Pro supporte une large gamme de formats vidéo et protocoles de streaming grâce à la puissance de libVLC.

### 🎬 Formats Vidéo Locaux

```typescript
import { VLCPlayer } from 'react-native-vlc-pro';

// MP4
<VLCPlayer
  source={{
    uri: 'https://example.com/video.mp4',
    type: 'video/mp4'
  }}
/>

// MKV
<VLCPlayer
  source={{
    uri: 'https://example.com/video.mkv',
    type: 'video/x-matroska'
  }}
/>

// AVI
<VLCPlayer
  source={{
    uri: 'https://example.com/video.avi',
    type: 'video/x-msvideo'
  }}
/>

// WebM
<VLCPlayer
  source={{
    uri: 'https://example.com/video.webm',
    type: 'video/webm'
  }}
/>
```

### 🌐 Protocoles de Streaming

#### HLS (HTTP Live Streaming)

```typescript
<VLCPlayer
  source={{
    uri: 'https://example.com/stream/master.m3u8',
    type: 'application/x-mpegURL',
    title: 'Live Stream'
  }}
  autoPlay={true}
/>
```

#### DASH (Dynamic Adaptive Streaming)

```typescript
<VLCPlayer
  source={{
    uri: 'https://example.com/stream/manifest.mpd',
    type: 'application/dash+xml',
    title: 'DASH Stream'
  }}
  autoPlay={true}
/>
```

#### RTMP/RTSP

```typescript
// RTMP
<VLCPlayer
  source={{
    uri: 'rtmp://example.com/live/stream',
    type: 'video/mp4'
  }}
/>

// RTSP
<VLCPlayer
  source={{
    uri: 'rtsp://example.com:554/stream',
    type: 'video/mp4'
  }}
/>
```

## 🔐 Headers HTTP et Authentification

### Headers Personnalisés

```typescript
<VLCPlayer
  source={{
    uri: 'https://example.com/protected-video.mp4',
    headers: {
      'User-Agent': 'MyApp/1.0',
      'Referer': 'https://myapp.com',
      'X-Custom-Header': 'custom-value'
    }
  }}
/>
```

### Authentification HTTP Basic

```typescript
const credentials = btoa('username:password'); // Base64 encode

<VLCPlayer
  source={{
    uri: 'https://example.com/protected-stream.m3u8',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'User-Agent': 'MyApp/1.0'
    }
  }}
/>
```

### Authentification Bearer Token

```typescript
<VLCPlayer
  source={{
    uri: 'https://api.example.com/stream',
    headers: {
      'Authorization': 'Bearer your-jwt-token-here',
      'Content-Type': 'application/json'
    }
  }}
/>
```

### Cookies et Sessions

```typescript
<VLCPlayer
  source={{
    uri: 'https://example.com/session-stream.mp4',
    headers: {
      'Cookie': 'sessionId=abc123; userId=456',
      'User-Agent': 'MyApp/1.0'
    }
  }}
/>
```

## 🎛️ Interface Utilisateur Avancée

### Composant VideoControls

```typescript
import { VLCPlayer, VideoControls } from 'react-native-vlc-pro';

const MyPlayer = () => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 100,
    isMuted: false,
    playbackRate: 1.0,
  });

  return (
    <View style={{ position: 'relative' }}>
      <VLCPlayer
        source={{ uri: 'https://example.com/video.mp4' }}
        style={{ width: '100%', height: 200 }}
        onProgress={(progress) => {
          setPlayerState(prev => ({
            ...prev,
            currentTime: progress.currentTime,
            duration: progress.duration
          }));
        }}
      />
      
      <VideoControls
        isPlaying={playerState.isPlaying}
        currentTime={playerState.currentTime}
        duration={playerState.duration}
        volume={playerState.volume}
        isMuted={playerState.isMuted}
        playbackRate={playerState.playbackRate}
        theme="dark"
        onPlay={() => {/* handle play */}}
        onPause={() => {/* handle pause */}}
        onSeek={(time) => {/* handle seek */}}
        onVolumeChange={(volume) => {/* handle volume */}}
        onRateChange={(rate) => {/* handle rate */}}
      />
    </View>
  );
};
```

### Thèmes et Personnalisation

```typescript
// Thème sombre (par défaut)
<VideoControls theme="dark" />

// Thème clair
<VideoControls theme="light" />

// Contrôles masqués/visibles
<VideoControls visible={controlsVisible} />

// Mode plein écran
<VideoControls 
  isFullscreen={isFullscreen}
  onFullscreenToggle={() => setIsFullscreen(!isFullscreen)}
/>
```

## 🧪 Tests et Validation

### Script de Test Automatisé

```bash
# Exécuter les tests de streaming
npm run test:streaming

# ou directement
node scripts/test-streaming.js
```

### Sources de Test Recommandées

```typescript
const TEST_SOURCES = [
  // MP4 Standard
  {
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    type: 'video/mp4'
  },
  
  // HLS Apple
  {
    uri: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
    type: 'application/x-mpegURL'
  },
  
  // DASH
  {
    uri: 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd',
    type: 'application/dash+xml'
  }
];
```

## 🔧 Configuration Avancée

### Options VLC Personnalisées

```typescript
// Configuration via les headers (Android)
<VLCPlayer
  source={{
    uri: 'https://example.com/stream.m3u8',
    headers: {
      'User-Agent': 'VLC/3.0.0',
      // Headers spécifiques VLC
      'http-reconnect': 'true',
      'network-caching': '1000'
    }
  }}
/>
```

### Gestion des Erreurs

```typescript
<VLCPlayer
  source={{ uri: 'https://example.com/video.mp4' }}
  onError={(error) => {
    console.error('Erreur VLC:', error);
    
    switch (error.code) {
      case 'VLC_INIT_ERROR':
        // Erreur d'initialisation VLC
        break;
      case 'MEDIA_CREATION_FAILED':
        // Impossible de créer le média
        break;
      case 'PLAYBACK_ERROR':
        // Erreur de lecture
        break;
      default:
        // Autres erreurs
        break;
    }
  }}
/>
```

## 📱 Exemples d'Applications

### Application de Streaming Simple

Voir `example/StreamingExamples.tsx` pour un exemple complet avec :
- Sélection de différents formats
- Test des headers HTTP
- Interface utilisateur moderne

### Application Avancée

Voir `example/AdvancedPlayerExample.tsx` pour :
- Contrôles vidéo intégrés
- Mode plein écran
- Gestion d'état complète
- Interface utilisateur responsive

## 🚀 Performances et Optimisation

### Recommandations

1. **Mise en cache réseau** : Utilisez les headers appropriés pour optimiser la mise en cache
2. **Qualité adaptative** : Préférez HLS/DASH pour l'adaptation automatique de qualité
3. **Gestion mémoire** : Libérez les ressources avec `cleanup()` quand nécessaire
4. **Tests réseau** : Testez avec différentes conditions réseau

### Monitoring

```typescript
<VLCPlayer
  onProgress={(progress) => {
    // Monitoring des performances
    console.log('Buffer:', progress.buffered);
    console.log('Bitrate:', progress.bitrate);
  }}
  onBuffer={(buffer) => {
    // Gestion du buffering
    console.log('Buffering:', buffer.isBuffering);
  }}
/>
```

## 🔗 Ressources Utiles

- [Documentation VLC](https://wiki.videolan.org/Documentation:Streaming_HowTo/)
- [Formats supportés par VLC](https://wiki.videolan.org/VLC_Features_Formats/)
- [Guide HLS](https://developer.apple.com/streaming/)
- [Spécification DASH](https://dashif.org/)

---

**Note** : Ce guide couvre les fonctionnalités implémentées dans la Phase 1 et Phase 2 du projet. Pour les fonctionnalités avancées comme les sous-titres et pistes audio multiples, voir la Phase 3 du développement. 