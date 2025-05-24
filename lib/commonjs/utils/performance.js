"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PerformanceUtils = exports.PerformanceProfiler = void 0;
/**
 * Utilitaires de performance pour react-native-vlc-pro
 * Phase 3, Semaine 1 : Optimisation des performances
 */

class PerformanceProfiler {
  metrics = {};
  startTime = 0;
  frameTimestamps = [];
  bufferEvents = [];
  memorySnapshots = [];
  isEnabled = false;
  constructor(config = {}) {
    this.config = {
      enabled: true,
      measurementInterval: 1000,
      thresholds: {
        maxStartupTime: 2000,
        maxFirstFrameTime: 3000,
        maxMemoryUsage: 200,
        minFPS: 30,
        maxBufferingTime: 5000
      },
      ...config
    };
    this.isEnabled = this.config.enabled;
  }

  /**
   * Démarrer le profiling
   */
  start() {
    if (!this.isEnabled) return;
    this.startTime = Date.now();
    this.reset();
    console.log('[VLC Performance] Profiling démarré');
  }

  /**
   * Arrêter le profiling et retourner les métriques
   */
  stop() {
    if (!this.isEnabled) {
      return this.getEmptyMetrics();
    }
    const metrics = this.calculateMetrics();
    console.log('[VLC Performance] Profiling arrêté:', metrics);
    return metrics;
  }

  /**
   * Enregistrer le temps de démarrage
   */
  recordStartup() {
    if (!this.isEnabled) return;
    this.metrics.startupTime = Date.now() - this.startTime;
    console.log(`[VLC Performance] Démarrage: ${this.metrics.startupTime}ms`);
    if (this.metrics.startupTime > this.config.thresholds.maxStartupTime) {
      console.warn(`[VLC Performance] Démarrage lent: ${this.metrics.startupTime}ms > ${this.config.thresholds.maxStartupTime}ms`);
    }
  }

  /**
   * Enregistrer le premier frame
   */
  recordFirstFrame() {
    if (!this.isEnabled) return;
    this.metrics.firstFrameTime = Date.now() - this.startTime;
    console.log(`[VLC Performance] Premier frame: ${this.metrics.firstFrameTime}ms`);
    if (this.metrics.firstFrameTime > this.config.thresholds.maxFirstFrameTime) {
      console.warn(`[VLC Performance] Premier frame lent: ${this.metrics.firstFrameTime}ms > ${this.config.thresholds.maxFirstFrameTime}ms`);
    }
  }

  /**
   * Enregistrer un frame pour le calcul des FPS
   */
  recordFrame() {
    if (!this.isEnabled) return;
    const now = Date.now();
    this.frameTimestamps.push(now);

    // Garder seulement les 60 derniers frames (1 seconde à 60 FPS)
    if (this.frameTimestamps.length > 60) {
      this.frameTimestamps.shift();
    }
  }

  /**
   * Enregistrer un événement de buffering
   */
  recordBuffering(isBuffering) {
    if (!this.isEnabled) return;
    this.bufferEvents.push({
      time: Date.now(),
      isBuffering
    });
    console.log(`[VLC Performance] Buffering: ${isBuffering ? 'début' : 'fin'}`);
  }

  /**
   * Enregistrer l'utilisation mémoire
   */
  recordMemoryUsage(memoryMB) {
    if (!this.isEnabled) return;
    this.memorySnapshots.push(memoryMB);

    // Garder seulement les 100 derniers échantillons
    if (this.memorySnapshots.length > 100) {
      this.memorySnapshots.shift();
    }
    if (memoryMB > this.config.thresholds.maxMemoryUsage) {
      console.warn(`[VLC Performance] Utilisation mémoire élevée: ${memoryMB}MB > ${this.config.thresholds.maxMemoryUsage}MB`);
    }
  }

  /**
   * Calculer les métriques finales
   */
  calculateMetrics() {
    const averageFPS = this.calculateAverageFPS();
    const bufferingTime = this.calculateBufferingTime();
    const memoryUsage = this.calculateAverageMemory();
    return {
      startupTime: this.metrics.startupTime || 0,
      firstFrameTime: this.metrics.firstFrameTime || 0,
      memoryUsage,
      averageFPS,
      bufferingTime,
      bufferingEvents: this.bufferEvents.filter(e => e.isBuffering).length,
      downloadSpeed: this.metrics.downloadSpeed || 0
    };
  }

  /**
   * Calculer les FPS moyens
   */
  calculateAverageFPS() {
    if (this.frameTimestamps.length < 2) return 0;
    const timeSpan = this.frameTimestamps[this.frameTimestamps.length - 1] - this.frameTimestamps[0];
    const frameCount = this.frameTimestamps.length - 1;
    const fps = frameCount * 1000 / timeSpan;
    if (fps < this.config.thresholds.minFPS) {
      console.warn(`[VLC Performance] FPS faible: ${fps.toFixed(1)} < ${this.config.thresholds.minFPS}`);
    }
    return fps;
  }

  /**
   * Calculer le temps total de buffering
   */
  calculateBufferingTime() {
    let totalBufferingTime = 0;
    let bufferStartTime = 0;
    for (const event of this.bufferEvents) {
      if (event.isBuffering) {
        bufferStartTime = event.time;
      } else if (bufferStartTime > 0) {
        totalBufferingTime += event.time - bufferStartTime;
        bufferStartTime = 0;
      }
    }
    if (totalBufferingTime > this.config.thresholds.maxBufferingTime) {
      console.warn(`[VLC Performance] Buffering excessif: ${totalBufferingTime}ms > ${this.config.thresholds.maxBufferingTime}ms`);
    }
    return totalBufferingTime;
  }

  /**
   * Calculer l'utilisation mémoire moyenne
   */
  calculateAverageMemory() {
    if (this.memorySnapshots.length === 0) return 0;
    return this.memorySnapshots.reduce((sum, memory) => sum + memory, 0) / this.memorySnapshots.length;
  }

  /**
   * Réinitialiser les métriques
   */
  reset() {
    this.metrics = {};
    this.frameTimestamps = [];
    this.bufferEvents = [];
    this.memorySnapshots = [];
  }

  /**
   * Retourner des métriques vides
   */
  getEmptyMetrics() {
    return {
      startupTime: 0,
      firstFrameTime: 0,
      memoryUsage: 0,
      averageFPS: 0,
      bufferingTime: 0,
      bufferingEvents: 0,
      downloadSpeed: 0
    };
  }

  /**
   * Générer un rapport de performance
   */
  generateReport() {
    const metrics = this.calculateMetrics();
    return `
=== Rapport de Performance VLC ===
Temps de démarrage: ${metrics.startupTime}ms
Premier frame: ${metrics.firstFrameTime}ms
Utilisation mémoire: ${metrics.memoryUsage.toFixed(1)}MB
FPS moyen: ${metrics.averageFPS.toFixed(1)}
Temps de buffering: ${metrics.bufferingTime}ms
Événements de buffering: ${metrics.bufferingEvents}
Vitesse de téléchargement: ${metrics.downloadSpeed.toFixed(2)}MB/s
================================
    `.trim();
  }
}

/**
 * Utilitaires de mesure de performance
 */
exports.PerformanceProfiler = PerformanceProfiler;
const PerformanceUtils = exports.PerformanceUtils = {
  /**
   * Mesurer le temps d'exécution d'une fonction
   */
  measureTime: (fn, label) => {
    const start = Date.now();
    const result = fn();
    const duration = Date.now() - start;
    if (label) {
      console.log(`[VLC Performance] ${label}: ${duration}ms`);
    }
    return {
      result,
      duration
    };
  },
  /**
   * Mesurer le temps d'exécution d'une fonction asynchrone
   */
  measureTimeAsync: async (fn, label) => {
    const start = Date.now();
    const result = await fn();
    const duration = Date.now() - start;
    if (label) {
      console.log(`[VLC Performance] ${label}: ${duration}ms`);
    }
    return {
      result,
      duration
    };
  },
  /**
   * Débouncer une fonction pour éviter les appels trop fréquents
   */
  debounce: (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },
  /**
   * Throttler une fonction pour limiter la fréquence d'appel
   */
  throttle: (func, limit) => {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  /**
   * Formater la taille en octets en format lisible
   */
  formatBytes: (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },
  /**
   * Calculer la vitesse de téléchargement
   */
  calculateDownloadSpeed: (bytesLoaded, timeElapsed) => {
    if (timeElapsed === 0) return 0;
    return bytesLoaded / 1024 / 1024 / (timeElapsed / 1000); // MB/s
  }
};
var _default = exports.default = PerformanceProfiler;
//# sourceMappingURL=performance.js.map