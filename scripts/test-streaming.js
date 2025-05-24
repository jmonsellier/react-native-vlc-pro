#!/usr/bin/env node

/**
 * Script de test pour les fonctionnalités de streaming
 * Phase 1, Semaine 4 : Tests de compatibilité
 */

const fs = require('fs');
const path = require('path');

// Sources de test pour validation
const TEST_SOURCES = [
  {
    name: 'MP4 Standard',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    type: 'video/mp4',
    expected: 'success',
    description: 'Vidéo MP4 standard via HTTP'
  },
  {
    name: 'HLS Stream',
    uri: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
    type: 'application/x-mpegURL',
    expected: 'success',
    description: 'Stream HLS (HTTP Live Streaming)'
  },
  {
    name: 'DASH Stream',
    uri: 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd',
    type: 'application/dash+xml',
    expected: 'success',
    description: 'Stream DASH (Dynamic Adaptive Streaming)'
  },
  {
    name: 'WebM Video',
    uri: 'https://sample-videos.com/zip/10/webm/mp4/SampleVideo_1280x720_1mb.webm',
    type: 'video/webm',
    expected: 'success',
    description: 'Vidéo WebM'
  },
  {
    name: 'Headers Test',
    uri: 'https://httpbin.org/headers',
    type: 'application/json',
    headers: {
      'User-Agent': 'ReactNativeVLCPro/1.0',
      'X-Test-Header': 'test-value'
    },
    expected: 'success',
    description: 'Test des headers HTTP personnalisés'
  }
];

// Fonctions de validation
function validateSource(source) {
  const errors = [];
  
  if (!source.uri) {
    errors.push('URI manquante');
  }
  
  if (!source.type) {
    errors.push('Type MIME manquant');
  }
  
  if (source.uri && !isValidUri(source.uri)) {
    errors.push('URI invalide');
  }
  
  return errors;
}

function isValidUri(uri) {
  try {
    new URL(uri);
    return true;
  } catch {
    return false;
  }
}

function generateTestReport() {
  const report = {
    timestamp: new Date().toISOString(),
    totalSources: TEST_SOURCES.length,
    validSources: 0,
    invalidSources: 0,
    results: []
  };
  
  console.log('🧪 Test des sources de streaming...\n');
  
  TEST_SOURCES.forEach((source, index) => {
    console.log(`${index + 1}. ${source.name}`);
    console.log(`   URI: ${source.uri}`);
    console.log(`   Type: ${source.type}`);
    console.log(`   Description: ${source.description}`);
    
    const errors = validateSource(source);
    
    if (errors.length === 0) {
      console.log('   ✅ Valide');
      report.validSources++;
      report.results.push({
        name: source.name,
        status: 'valid',
        errors: []
      });
    } else {
      console.log('   ❌ Erreurs:');
      errors.forEach(error => console.log(`      - ${error}`));
      report.invalidSources++;
      report.results.push({
        name: source.name,
        status: 'invalid',
        errors: errors
      });
    }
    
    if (source.headers) {
      console.log('   📋 Headers:');
      Object.entries(source.headers).forEach(([key, value]) => {
        console.log(`      ${key}: ${value}`);
      });
    }
    
    console.log('');
  });
  
  return report;
}

function saveReport(report) {
  const reportPath = path.join(__dirname, '..', 'test-results', 'streaming-test-report.json');
  const reportDir = path.dirname(reportPath);
  
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`📄 Rapport sauvegardé: ${reportPath}`);
}

function printSummary(report) {
  console.log('📊 Résumé des tests:');
  console.log(`   Total: ${report.totalSources} sources`);
  console.log(`   ✅ Valides: ${report.validSources}`);
  console.log(`   ❌ Invalides: ${report.invalidSources}`);
  console.log(`   📈 Taux de réussite: ${Math.round((report.validSources / report.totalSources) * 100)}%`);
  
  if (report.invalidSources > 0) {
    console.log('\n⚠️  Sources avec erreurs:');
    report.results
      .filter(result => result.status === 'invalid')
      .forEach(result => {
        console.log(`   - ${result.name}: ${result.errors.join(', ')}`);
      });
  }
}

// Exécution du script
function main() {
  console.log('🚀 React Native VLC Pro - Test de streaming\n');
  
  const report = generateTestReport();
  printSummary(report);
  saveReport(report);
  
  console.log('\n✨ Tests terminés!');
  
  // Code de sortie basé sur les résultats
  process.exit(report.invalidSources > 0 ? 1 : 0);
}

if (require.main === module) {
  main();
}

module.exports = {
  TEST_SOURCES,
  validateSource,
  generateTestReport
}; 