# 🎬 Guide de Test VLC Pro sur Android

## Prérequis

1. **Android Studio** installé avec SDK
2. **Téléphone Android** en mode développeur
3. **USB Debugging** activé
4. **Node.js** et **npm** installés

## Étapes de Test

### 1. Préparation

```bash
# Connecter votre téléphone Android via USB
# Vérifier la connexion
adb devices
```

### 2. Lancement Rapide

```bash
# Méthode simple
./test-android.sh
```

### 3. Lancement Manuel

```bash
# Si le script ne fonctionne pas
cd example
npm install
npx react-native start
# Dans un autre terminal :
npx react-native run-android
```

## 📱 Fonctionnalités à Tester

### ✅ Tests de Base
- [ ] L'application se lance sans crash
- [ ] Le statut d'import VLC s'affiche
- [ ] L'interface est bien visible

### 🎥 Tests Vidéo
- [ ] **Big Buck Bunny** : Vidéo MP4 standard
- [ ] **Elephant Dream** : Autre vidéo MP4
- [ ] **Test Stream** : Stream HLS

### 🔧 Tests Fonctionnels
- [ ] Changement de vidéo
- [ ] Lecture automatique
- [ ] Logs en temps réel
- [ ] Messages d'erreur clairs

## 📝 Comment Donner des Retours

### Méthode 1 : Via l'App
1. Appuyez sur **"📝 Préparer Feedback"**
2. Copiez le texte généré
3. Envoyez-le au développeur

### Méthode 2 : Manuel
Notez ces informations :
- **Vidéo testée** : Laquelle fonctionne/ne fonctionne pas
- **Erreurs** : Messages dans les logs
- **Comportement** : Ce qui se passe exactement
- **Modèle Android** : Votre téléphone

## 🐛 Problèmes Courants

### L'app ne se lance pas
```bash
# Nettoyer et relancer
cd example
npx react-native clean
npm install
npx react-native run-android
```

### Erreur de connexion Android
```bash
# Vérifier la connexion
adb devices
# Redémarrer adb si nécessaire
adb kill-server
adb start-server
```

### Metro bundler bloqué
```bash
# Arrêter Metro
pkill -f metro
# Relancer
npx react-native start --reset-cache
```

## 📊 Logs Utiles

Les logs apparaissent dans :
1. **L'application** : Section "Logs récents"
2. **Console Metro** : Terminal où vous avez lancé `react-native start`
3. **Logcat Android** : `adb logcat | grep VLC`

## 🎯 Objectifs du Test

1. **Vérifier l'intégration** : Le module VLC s'importe correctement
2. **Tester la lecture** : Les vidéos se lancent
3. **Identifier les bugs** : Erreurs, crashes, comportements étranges
4. **Valider l'UX** : Interface utilisable et claire

---

**💡 Conseil** : Testez d'abord avec le WiFi, puis avec les données mobiles pour voir les différences de performance. 