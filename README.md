# 🎬 React Native VLC Pro

[![npm version](https://badge.fury.io/js/react-native-vlc-pro.svg)](https://badge.fury.io/js/react-native-vlc-pro)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

Un lecteur vidéo professionnel pour React Native basé sur libVLC, offrant des performances exceptionnelles et une compatibilité étendue avec de nombreux formats multimédia.

## ✨ Fonctionnalités

### 🎯 Fonctionnalités principales
- **Lecture multimédia avancée** : Support de nombreux formats (MP4, AVI, MKV, MOV, FLV, etc.)
- **Streaming en temps réel** : HLS, DASH, RTMP, RTSP
- **Interface utilisateur riche** : Contrôles personnalisables avec thèmes dark/light
- **Gestion des pistes** : Sélection audio et sous-titres multi-langues
- **Mode plein écran** : Support natif avec gestion automatique de la StatusBar
- **Performance optimisée** : Décodage matériel et gestion mémoire intelligente

### 🛠️ Fonctionnalités avancées
- **TypeScript complet** : Types stricts pour une meilleure expérience développeur
- **Hooks personnalisés** : `useVLCPlayer`, `useFullscreen` pour une intégration facile
- **Système de profiling** : Métriques de performance en temps réel
- **Accessibilité** : Support complet des lecteurs d'écran
- **Tests exhaustifs** : 144 tests unitaires et d'intégration

## 📱 Compatibilité

- **iOS** : 12.0+ (MobileVLCKit 4.0.0a2)
- **Android** : API 21+ (libVLC 3.6.2)
- **React Native** : 0.73.0+

## 🚀 Installation

```bash
npm install react-native-vlc-pro
# ou
yarn add react-native-vlc-pro
```

### Configuration iOS

Ajoutez à votre `ios/Podfile` :

```ruby
pod 'react-native-vlc-pro', :path => '../node_modules/react-native-vlc-pro'
```

### Configuration Android

La configuration Android est automatique grâce à l'auto-linking.

## 📖 Utilisation

### Utilisation basique

```tsx
import React from 'react';
import { View } from 'react-native';
import { VLCPlayer } from 'react-native-vlc-pro';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <VLCPlayer
        source={{ uri: 'https://example.com/video.mp4' }}
        style={{ flex: 1 }}
        autoPlay={true}
        onReady={() => console.log('Lecteur prêt')}
        onPlay={() => console.log('Lecture démarrée')}
        onPause={() => console.log('Lecture en pause')}
        onError={(error) => console.log('Erreur:', error)}
      />
    </View>
  );
}
```

### Utilisation avec hook

```tsx
import React from 'react';
import { View } from 'react-native';
import { VLCPlayer, useVLCPlayer } from 'react-native-vlc-pro';

export default function App() {
  const { player, controls } = useVLCPlayer({
    source: { uri: 'https://example.com/video.mp4' },
    autoPlay: true,
  });

  return (
    <View style={{ flex: 1 }}>
      <VLCPlayer ref={player} style={{ flex: 1 }} />
      {/* Vos contrôles personnalisés */}
    </View>
  );
}
```

### Interface utilisateur avancée

```tsx
import React from 'react';
import { View } from 'react-native';
import { VLCPlayer, VideoControlsAdvanced } from 'react-native-vlc-pro';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <VLCPlayer
        source={{ uri: 'https://example.com/video.mp4' }}
        style={{ flex: 1 }}
      />
      <VideoControlsAdvanced
        theme="dark"
        showFullscreenButton={true}
        showTrackSelector={true}
        showVolumeControl={true}
      />
    </View>
  );
}
```

## 🎨 Thèmes et personnalisation

```tsx
import { VLCPlayer, VideoControlsAdvanced } from 'react-native-vlc-pro';

// Thème personnalisé
const customTheme = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  background: 'rgba(0, 0, 0, 0.8)',
  text: '#FFFFFF',
  accent: '#FFE66D',
  opacity: 0.9,
  borderRadius: 8,
};

<VideoControlsAdvanced
  theme="custom"
  customTheme={customTheme}
  controlsConfig={{
    showPlayPause: true,
    showSeekBar: true,
    showTime: true,
    showFullscreen: true,
    showVolume: true,
    showTrackSelector: true,
  }}
/>
```

## 📊 Profiling des performances

```tsx
import { PerformanceProfiler, PerformanceUtils } from 'react-native-vlc-pro';

// Initialiser le profiler
const profiler = new PerformanceProfiler({
  enableProfiling: true,
  maxStartupTime: 3000,
  minFPS: 24,
  maxMemoryUsage: 200,
});

// Démarrer le profiling
profiler.startProfiling();

// Obtenir les métriques
const metrics = profiler.getMetrics();
console.log('Temps de démarrage:', metrics.startupTime);
console.log('FPS moyen:', metrics.averageFPS);
console.log('Utilisation mémoire:', metrics.memoryUsage);
```

## 🔧 API Référence

### VLCPlayer Props

| Prop | Type | Description |
|------|------|-------------|
| `source` | `MediaSource` | Source du média (URI, fichier local) |
| `autoPlay` | `boolean` | Lecture automatique |
| `loop` | `boolean` | Lecture en boucle |
| `muted` | `boolean` | Son coupé |
| `volume` | `number` | Volume (0-100) |
| `rate` | `number` | Vitesse de lecture |
| `onReady` | `() => void` | Lecteur prêt |
| `onPlay` | `() => void` | Lecture démarrée |
| `onPause` | `() => void` | Lecture en pause |
| `onError` | `(error) => void` | Erreur de lecture |
| `onProgress` | `(data) => void` | Progression de lecture |

### Hooks disponibles

- `useVLCPlayer(config)` : Hook principal du lecteur
- `useFullscreen()` : Gestion du mode plein écran

### Composants UI

- `VideoControls` : Contrôles basiques
- `VideoControlsAdvanced` : Contrôles avancés avec thèmes
- `TrackSelector` : Sélecteur de pistes audio/sous-titres

## 🧪 Tests

```bash
# Lancer tous les tests
npm test

# Tests avec couverture
npm run test:coverage

# Tests de performance
npm run test:performance
```

## 📈 Roadmap

### Version 1.1.0
- [ ] Support Picture-in-Picture
- [ ] Filtres vidéo avancés
- [ ] Capture d'écran/vidéo
- [ ] Streaming adaptatif amélioré

### Version 1.2.0
- [ ] Support VR/360°
- [ ] Sous-titres personnalisés
- [ ] Playlist avancée
- [ ] Chromecast/AirPlay

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez notre [guide de contribution](CONTRIBUTING.md).

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [VideoLAN](https://www.videolan.org/) pour libVLC
- [React Native Community](https://github.com/react-native-community) pour les outils
- Tous les contributeurs qui ont rendu ce projet possible

## 📞 Support

- 📧 Email : contact@react-native-vlc.com
- 🐛 Issues : [GitHub Issues](https://github.com/react-native-vlc/react-native-vlc-pro/issues)
- 💬 Discussions : [GitHub Discussions](https://github.com/react-native-vlc/react-native-vlc-pro/discussions)

---

Fait avec ❤️ par l'équipe React Native VLC 