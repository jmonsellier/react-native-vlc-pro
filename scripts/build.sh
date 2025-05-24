#!/bin/bash

# Script de build pour react-native-vlc-pro
# Phase 1, Semaine 1 : Infrastructure du projet

set -e

echo "🚀 Build react-native-vlc-pro - Phase 1, Semaine 1"
echo "=================================================="

# Vérification des prérequis
echo "📋 Vérification des prérequis..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

if ! command -v yarn &> /dev/null; then
    echo "❌ Yarn n'est pas installé"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ Yarn version: $(yarn --version)"

# Installation des dépendances
echo ""
echo "📦 Installation des dépendances..."
yarn install

# Vérification TypeScript
echo ""
echo "🔍 Vérification TypeScript..."
yarn typecheck

# Linting
echo ""
echo "🧹 Linting du code..."
yarn lint

# Build du package
echo ""
echo "🔨 Build du package..."
yarn build

# Tests
echo ""
echo "🧪 Exécution des tests..."
yarn test

echo ""
echo "✅ Build terminé avec succès !"
echo "📁 Fichiers générés dans le dossier 'lib/'"
echo ""
echo "🔄 Prochaine étape : Phase 1, Semaine 2 - Intégration VLC native" 