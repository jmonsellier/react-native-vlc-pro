#!/bin/bash

echo "🎬 Script de test VLC Pro sur Android"
echo "======================================"

# Vérifier si Android est connecté
echo "📱 Vérification des appareils Android connectés..."
adb devices

# Demander confirmation
echo ""
read -p "Voulez-vous continuer avec le test ? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🔧 Installation des dépendances..."
    cd example
    npm install
    
    echo "🚀 Lancement de l'application sur Android..."
    echo "📝 Surveillez les logs dans la console pour les retours"
    
    # Lancer Metro bundler en arrière-plan
    npx react-native start &
    METRO_PID=$!
    
    # Attendre un peu que Metro démarre
    sleep 5
    
    # Lancer l'app sur Android
    npx react-native run-android
    
    echo ""
    echo "✅ Application lancée !"
    echo "📱 Testez les fonctionnalités suivantes :"
    echo "   - Changement de vidéo"
    echo "   - Lecture automatique"
    echo "   - Logs en temps réel"
    echo "   - Bouton feedback"
    echo ""
    echo "🔄 Pour relancer : ./test-android.sh"
    echo "⏹️  Pour arrêter Metro : kill $METRO_PID"
    
else
    echo "❌ Test annulé"
fi 