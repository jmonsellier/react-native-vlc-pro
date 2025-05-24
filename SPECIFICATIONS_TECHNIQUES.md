# Spécifications techniques - React Native VLC Pro

## Configuration du projet

### Prérequis système

#### Environnement de développement
- **Node.js** : 16.0.0 ou supérieur
- **npm/yarn** : Dernière version stable
- **React Native CLI** : 0.70.0+
- **Xcode** : 14.0+ (pour iOS)
- **Android Studio** : 2022.1.1+ (pour Android)

#### Dépendances natives
- **iOS** : MobileVLCKit 4.0.0a2+ (version moderne recommandée 2025)
- **Android** : libVLC 3.6.5+ (dernière version stable 2025)
- **React Native** : 0.79.0+ (dernière version 2025)

### Structure du package.json

```json
{
  "name": "react-native-vlc-pro",
  "version": "1.0.0",
  "description": "Lecteur VLC professionnel pour React Native",
  "main": "lib/commonjs/index",
  "module": "lib/module/index",
  "types": "lib/typescript/index.d.ts",
  "react-native": "src/index",
  "source": "src/index",
  "files": [
    "src",
    "lib",
    "android",
    "ios",
    "react-native-vlc-pro.podspec",
    "!lib/typescript/example",
    "!android/build",
    "!ios/build",
    "!**/__tests__",
    "!**/__fixtures__",
    "!**/__mocks__"
  ],
  "scripts": {
    "test": "jest",
    "typecheck": "tsc --noEmit",
    "lint": "eslint \"**/*.{js,ts,tsx}\"",
    "prepare": "bob build",
    "release": "release-it",
    "example": "yarn --cwd example",
    "bootstrap": "yarn example && yarn install"
  },
  "keywords": [
    "react-native",
    "vlc",
    "video",
    "player",
    "media",
    "streaming"
  ],
  "repository": "https://github.com/react-native-vlc/react-native-vlc-pro",
  "author": "React Native VLC Team",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/react-native-vlc/react-native-vlc-pro/issues"
  },
  "homepage": "https://github.com/react-native-vlc/react-native-vlc-pro#readme",
  "devDependencies": {
    "@react-native-community/eslint-config": "^3.0.0",
    "@types/jest": "^28.1.2",
    "@types/react": "~18.0.14",
    "@types/react-native": "0.70.0",
    "jest": "^28.1.1",
    "react": "18.2.0",
    "react-native": "0.70.0",
    "react-native-builder-bob": "^0.20.0",
    "typescript": "^4.5.2"
  },
  "peerDependencies": {
    "react": "*",
    "react-native": "*"
  }
}
```

## Architecture native

### Configuration iOS (VLCPro.podspec)

```ruby
Pod::Spec.new do |s|
  s.name         = "VLCPro"
  s.version      = "1.0.0"
  s.summary      = "VLC Player for React Native"
  s.description  = "Professional VLC media player component for React Native applications"
  s.homepage     = "https://github.com/react-native-vlc/react-native-vlc-pro"
  s.license      = { :type => "MIT", :file => "LICENSE" }
  s.authors      = { "React Native VLC Team" => "contact@react-native-vlc.com" }
  s.platforms    = { :ios => "11.0" }
  s.source       = { :git => "https://github.com/react-native-vlc/react-native-vlc-pro.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,c,cc,cpp,m,mm,swift}"
  s.requires_arc = true

  s.dependency "React-Core"
  s.dependency "MobileVLCKit", "~> 4.0.0a2"  # Version moderne 2025 avec PiP et nouvelles fonctionnalités
  
  s.ios.deployment_target = '11.0'
  s.swift_version = '5.0'
end
```

### Configuration Android (build.gradle)

```gradle
buildscript {
    ext.safeExtGet = {prop, fallback ->
        rootProject.ext.has(prop) ? rootProject.ext.get(prop) : fallback
    }
}

apply plugin: 'com.android.library'
apply plugin: 'kotlin-android'

android {
    compileSdkVersion safeExtGet('compileSdkVersion', 33)
    
    defaultConfig {
        minSdkVersion safeExtGet('minSdkVersion', 21)
        targetSdkVersion safeExtGet('targetSdkVersion', 33)
        versionCode 1
        versionName "1.0"
    }
    
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    
    kotlinOptions {
        jvmTarget = '1.8'
    }
}

repositories {
    mavenCentral()
    google()
    maven { url 'https://jitpack.io' }
}

dependencies {
    implementation "com.facebook.react:react-native:+"
    implementation 'org.videolan.android:libvlc-all:3.6.5'  // Dernière version stable 2025
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
}
```

## Interfaces TypeScript

### Types principaux

```typescript
// src/types/VLCPlayer.ts
export interface VLCPlayerProps {
  source: MediaSource;
  style?: ViewStyle;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  volume?: number;
  rate?: number;
  paused?: boolean;
  seek?: number;
  
  // Callbacks
  onReady?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onEnd?: () => void;
  onError?: (error: VLCError) => void;
  onProgress?: (progress: ProgressData) => void;
  onLoad?: (loadData: LoadData) => void;
  onBuffer?: (bufferData: BufferData) => void;
  
  // Configuration avancée
  config?: VLCPlayerConfig;
  
  // Contrôles
  showControls?: boolean;
  controlsTimeout?: number;
  allowFullscreen?: boolean;
  
  // Sous-titres
  subtitleTrack?: number;
  audioTrack?: number;
}

export interface MediaSource {
  uri: string;
  type?: 'network' | 'file' | 'asset';
  headers?: Record<string, string>;
  subtitles?: SubtitleTrack[];
}

export interface VLCPlayerConfig {
  networkCaching?: number;
  httpReconnect?: boolean;
  hardwareDecoding?: boolean;
  deinterlace?: boolean;
  chroma?: string;
  verbosity?: number;
}

export interface ProgressData {
  currentTime: number;
  duration: number;
  position: number;
  bufferedDuration: number;
}

export interface LoadData {
  canPlayFast: boolean;
  canPlayReverse: boolean;
  canPlaySlowForward: boolean;
  canStepBackward: boolean;
  canStepForward: boolean;
  duration: number;
  naturalSize: {
    width: number;
    height: number;
    orientation: string;
  };
}

export interface BufferData {
  isBuffering: boolean;
  bufferProgress: number;
}

export interface VLCError {
  code: number;
  message: string;
  domain?: string;
}

export interface SubtitleTrack {
  id: number;
  title: string;
  language: string;
  uri?: string;
}

export interface AudioTrack {
  id: number;
  title: string;
  language: string;
  channels: number;
  rate: number;
}
```

### Hook useVLCPlayer

```typescript
// src/hooks/useVLCPlayer.ts
export interface UseVLCPlayerProps {
  source?: MediaSource;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  volume?: number;
  config?: VLCPlayerConfig;
}

export interface VLCPlayerState {
  isReady: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  isStopped: boolean;
  isBuffering: boolean;
  isMuted: boolean;
  volume: number;
  rate: number;
  currentTime: number;
  duration: number;
  position: number;
  error: VLCError | null;
  
  // Pistes disponibles
  audioTracks: AudioTrack[];
  subtitleTracks: SubtitleTrack[];
  currentAudioTrack: number;
  currentSubtitleTrack: number;
  
  // État réseau
  networkState: 'idle' | 'loading' | 'loaded' | 'error';
  bufferedDuration: number;
}

export interface VLCPlayerControls {
  play: () => Promise<void>;
  pause: () => Promise<void>;
  stop: () => Promise<void>;
  seek: (time: number) => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
  setMuted: (muted: boolean) => Promise<void>;
  setRate: (rate: number) => Promise<void>;
  setAudioTrack: (trackId: number) => Promise<void>;
  setSubtitleTrack: (trackId: number) => Promise<void>;
  snapshot: () => Promise<string>;
  toggleFullscreen: () => Promise<void>;
}

export function useVLCPlayer(props: UseVLCPlayerProps): {
  state: VLCPlayerState;
  controls: VLCPlayerControls;
  ref: RefObject<VLCPlayer>;
};
```

## Architecture native détaillée

### iOS - Interface Swift

```swift
// ios/VLCPro/VLCPlayerView.swift
@objc(VLCPlayerView)
class VLCPlayerView: UIView {
    private var mediaPlayer: VLCMediaPlayer?
    private var media: VLCMedia?
    
    @objc var source: NSDictionary? {
        didSet {
            setupMedia()
        }
    }
    
    @objc var autoPlay: Bool = false
    @objc var loop: Bool = false
    @objc var muted: Bool = false
    @objc var volume: NSNumber = 100
    @objc var rate: NSNumber = 1.0
    @objc var paused: Bool = false
    
    // Callbacks
    @objc var onReady: RCTDirectEventBlock?
    @objc var onPlay: RCTDirectEventBlock?
    @objc var onPause: RCTDirectEventBlock?
    @objc var onProgress: RCTDirectEventBlock?
    @objc var onError: RCTDirectEventBlock?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupPlayer()
    }
    
    private func setupPlayer() {
        mediaPlayer = VLCMediaPlayer()
        mediaPlayer?.delegate = self
        mediaPlayer?.drawable = self
    }
    
    private func setupMedia() {
        guard let source = source,
              let uri = source["uri"] as? String else { return }
        
        let url = URL(string: uri)
        media = VLCMedia(url: url)
        mediaPlayer?.media = media
        
        if autoPlay {
            mediaPlayer?.play()
        }
    }
}

extension VLCPlayerView: VLCMediaPlayerDelegate {
    func mediaPlayerStateChanged(_ aNotification: Notification) {
        guard let player = aNotification.object as? VLCMediaPlayer else { return }
        
        switch player.state {
        case .playing:
            onPlay?([:])
        case .paused:
            onPause?([:])
        case .error:
            onError?(["error": ["message": "Playback error"]])
        default:
            break
        }
    }
    
    func mediaPlayerTimeChanged(_ aNotification: Notification) {
        guard let player = aNotification.object as? VLCMediaPlayer else { return }
        
        let currentTime = player.time.doubleValue / 1000.0
        let duration = player.media?.length.doubleValue ?? 0 / 1000.0
        let position = duration > 0 ? currentTime / duration : 0
        
        onProgress?([
            "currentTime": currentTime,
            "duration": duration,
            "position": position
        ])
    }
}
```

### Android - Interface Kotlin

```kotlin
// android/src/main/java/com/vlcpro/VLCPlayerView.kt
class VLCPlayerView(context: ThemedReactContext) : FrameLayout(context), IVLCVout.Callback {
    private val libVLC: LibVLC
    private val mediaPlayer: MediaPlayer
    private var surfaceView: SurfaceView? = null
    
    private var eventEmitter: VLCEventEmitter? = null
    
    var source: ReadableMap? = null
        set(value) {
            field = value
            setupMedia()
        }
    
    var autoPlay: Boolean = false
    var loop: Boolean = false
    var muted: Boolean = false
    var volume: Int = 100
    var rate: Float = 1.0f
    var paused: Boolean = false
    
    init {
        try {
            val options = arrayListOf<String>()
            options.add("--aout=opensles")
            options.add("--audio-time-stretch")
            options.add("-vvv")
            
            libVLC = LibVLC(context, options)
            mediaPlayer = MediaPlayer(libVLC)
            
            setupSurface()
            setupEventListener()
            
        } catch (e: Exception) {
            throw RuntimeException("Erreur d'initialisation libVLC", e)
        }
    }
    
    private fun setupSurface() {
        surfaceView = SurfaceView(context)
        addView(surfaceView, LayoutParams(MATCH_PARENT, MATCH_PARENT))
        
        mediaPlayer.vlcVout.setVideoView(surfaceView)
        mediaPlayer.vlcVout.addCallback(this)
        mediaPlayer.vlcVout.attachViews()
    }
    
    private fun setupEventListener() {
        mediaPlayer.setEventListener { event ->
            when (event.type) {
                MediaPlayer.Event.Playing -> {
                    eventEmitter?.onPlay()
                }
                MediaPlayer.Event.Paused -> {
                    eventEmitter?.onPause()
                }
                MediaPlayer.Event.TimeChanged -> {
                    val currentTime = mediaPlayer.time / 1000.0
                    val duration = mediaPlayer.length / 1000.0
                    val position = if (duration > 0) currentTime / duration else 0.0
                    
                    eventEmitter?.onProgress(currentTime, duration, position)
                }
                MediaPlayer.Event.EncounteredError -> {
                    eventEmitter?.onError("Erreur de lecture")
                }
            }
        }
    }
    
    private fun setupMedia() {
        source?.let { src ->
            val uri = src.getString("uri")
            uri?.let {
                val media = Media(libVLC, Uri.parse(it))
                mediaPlayer.media = media
                
                if (autoPlay) {
                    mediaPlayer.play()
                }
            }
        }
    }
    
    // Méthodes de contrôle
    fun play() {
        mediaPlayer.play()
    }
    
    fun pause() {
        mediaPlayer.pause()
    }
    
    fun stop() {
        mediaPlayer.stop()
    }
    
    fun seekTo(time: Float) {
        mediaPlayer.time = (time * 1000).toLong()
    }
    
    fun setVolume(vol: Int) {
        mediaPlayer.volume = vol
    }
    
    override fun onSurfacesCreated(vlcVout: IVLCVout?) {}
    override fun onSurfacesDestroyed(vlcVout: IVLCVout?) {}
}
```

## Gestion des événements

### Émetteur d'événements React Native

```typescript
// src/utils/EventEmitter.ts
import { NativeEventEmitter, NativeModules } from 'react-native';

const { VLCPlayerModule } = NativeModules;

export class VLCEventEmitter extends NativeEventEmitter {
  constructor() {
    super(VLCPlayerModule);
  }
  
  // Événements de lecture
  onReady(callback: () => void) {
    return this.addListener('VLCPlayer:Ready', callback);
  }
  
  onPlay(callback: () => void) {
    return this.addListener('VLCPlayer:Play', callback);
  }
  
  onPause(callback: () => void) {
    return this.addListener('VLCPlayer:Pause', callback);
  }
  
  onProgress(callback: (data: ProgressData) => void) {
    return this.addListener('VLCPlayer:Progress', callback);
  }
  
  onError(callback: (error: VLCError) => void) {
    return this.addListener('VLCPlayer:Error', callback);
  }
  
  // Événements réseau
  onBufferStart(callback: () => void) {
    return this.addListener('VLCPlayer:BufferStart', callback);
  }
  
  onBufferEnd(callback: () => void) {
    return this.addListener('VLCPlayer:BufferEnd', callback);
  }
  
  // Nettoyage
  removeAllListeners() {
    [
      'VLCPlayer:Ready',
      'VLCPlayer:Play', 
      'VLCPlayer:Pause',
      'VLCPlayer:Progress',
      'VLCPlayer:Error',
      'VLCPlayer:BufferStart',
      'VLCPlayer:BufferEnd'
    ].forEach(event => {
      this.removeAllListeners(event);
    });
  }
}
```

## Tests et validation

### Configuration Jest

```javascript
// jest.config.js
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  modulePathIgnorePatterns: [
    '<rootDir>/example/node_modules',
    '<rootDir>/lib/'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/__mocks__/**'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### Tests unitaires type

```typescript
// __tests__/VLCPlayer.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { VLCPlayer } from '../src/components/VLCPlayer';

describe('VLCPlayer', () => {
  const mockSource = { uri: 'https://example.com/video.mp4' };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should render without crashing', () => {
    const { getByTestId } = render(
      <VLCPlayer source={mockSource} testID="vlc-player" />
    );
    
    expect(getByTestId('vlc-player')).toBeTruthy();
  });
  
  it('should call onReady when player is ready', () => {
    const onReady = jest.fn();
    
    render(
      <VLCPlayer source={mockSource} onReady={onReady} />
    );
    
    // Simuler l'événement ready
    // expect(onReady).toHaveBeenCalled();
  });
  
  it('should handle play/pause correctly', () => {
    const onPlay = jest.fn();
    const onPause = jest.fn();
    
    const { getByTestId } = render(
      <VLCPlayer 
        source={mockSource}
        onPlay={onPlay}
        onPause={onPause}
        showControls={true}
      />
    );
    
    // Tests d'interaction avec les contrôles
    // fireEvent.press(getByTestId('play-button'));
    // expect(onPlay).toHaveBeenCalled();
  });
});
```

## Performance et optimisation

### Métriques de performance

```typescript
// src/utils/PerformanceMonitor.ts
export class PerformanceMonitor {
  private startTime: number = 0;
  private metrics: Map<string, number> = new Map();
  
  startTiming(event: string) {
    this.startTime = performance.now();
    this.metrics.set(`${event}_start`, this.startTime);
  }
  
  endTiming(event: string) {
    const endTime = performance.now();
    const startTime = this.metrics.get(`${event}_start`) || 0;
    const duration = endTime - startTime;
    
    this.metrics.set(`${event}_duration`, duration);
    
    // Log si la performance est dégradée
    if (duration > 2000) { // Plus de 2 secondes
      console.warn(`Performance warning: ${event} took ${duration}ms`);
    }
    
    return duration;
  }
  
  getMetrics() {
    return Object.fromEntries(this.metrics);
  }
  
  reset() {
    this.metrics.clear();
  }
}
```

### Gestion mémoire

```typescript
// src/utils/MemoryManager.ts
export class MemoryManager {
  private static instance: MemoryManager;
  private activePlayers: Set<string> = new Set();
  
  static getInstance() {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
    }
    return MemoryManager.instance;
  }
  
  registerPlayer(playerId: string) {
    this.activePlayers.add(playerId);
    this.checkMemoryUsage();
  }
  
  unregisterPlayer(playerId: string) {
    this.activePlayers.delete(playerId);
  }
  
  private checkMemoryUsage() {
    if (this.activePlayers.size > 3) {
      console.warn('Attention: Plus de 3 lecteurs VLC actifs. Considérez la libération de ressources.');
    }
  }
  
  getActivePlayersCount() {
    return this.activePlayers.size;
  }
}
```

Cette spécification technique complète la planification et fournit tous les détails nécessaires pour l'implémentation du composant react-native-vlc-pro avec une architecture robuste et scalable. 