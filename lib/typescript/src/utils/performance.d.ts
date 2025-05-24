/**
 * Utilitaires de performance pour react-native-vlc-pro
 * Phase 3, Semaine 1 : Optimisation des performances
 */
export interface PerformanceMetrics {
    /** Temps de démarrage en millisecondes */
    startupTime: number;
    /** Temps jusqu'au premier frame en millisecondes */
    firstFrameTime: number;
    /** Utilisation mémoire en MB */
    memoryUsage: number;
    /** FPS moyen */
    averageFPS: number;
    /** Temps de buffering total en millisecondes */
    bufferingTime: number;
    /** Nombre d'événements de buffering */
    bufferingEvents: number;
    /** Vitesse de téléchargement en MB/s */
    downloadSpeed: number;
}
export interface PerformanceConfig {
    /** Activer le profiling de performance */
    enabled: boolean;
    /** Intervalle de mesure en millisecondes */
    measurementInterval: number;
    /** Seuils d'alerte */
    thresholds: {
        maxStartupTime: number;
        maxFirstFrameTime: number;
        maxMemoryUsage: number;
        minFPS: number;
        maxBufferingTime: number;
    };
}
export declare class PerformanceProfiler {
    private metrics;
    private config;
    private startTime;
    private frameTimestamps;
    private bufferEvents;
    private memorySnapshots;
    private isEnabled;
    constructor(config?: Partial<PerformanceConfig>);
    /**
     * Démarrer le profiling
     */
    start(): void;
    /**
     * Arrêter le profiling et retourner les métriques
     */
    stop(): PerformanceMetrics;
    /**
     * Enregistrer le temps de démarrage
     */
    recordStartup(): void;
    /**
     * Enregistrer le premier frame
     */
    recordFirstFrame(): void;
    /**
     * Enregistrer un frame pour le calcul des FPS
     */
    recordFrame(): void;
    /**
     * Enregistrer un événement de buffering
     */
    recordBuffering(isBuffering: boolean): void;
    /**
     * Enregistrer l'utilisation mémoire
     */
    recordMemoryUsage(memoryMB: number): void;
    /**
     * Calculer les métriques finales
     */
    private calculateMetrics;
    /**
     * Calculer les FPS moyens
     */
    private calculateAverageFPS;
    /**
     * Calculer le temps total de buffering
     */
    private calculateBufferingTime;
    /**
     * Calculer l'utilisation mémoire moyenne
     */
    private calculateAverageMemory;
    /**
     * Réinitialiser les métriques
     */
    private reset;
    /**
     * Retourner des métriques vides
     */
    private getEmptyMetrics;
    /**
     * Générer un rapport de performance
     */
    generateReport(): string;
}
/**
 * Utilitaires de mesure de performance
 */
export declare const PerformanceUtils: {
    /**
     * Mesurer le temps d'exécution d'une fonction
     */
    measureTime: <T>(fn: () => T, label?: string) => {
        result: T;
        duration: number;
    };
    /**
     * Mesurer le temps d'exécution d'une fonction asynchrone
     */
    measureTimeAsync: <T>(fn: () => Promise<T>, label?: string) => Promise<{
        result: T;
        duration: number;
    }>;
    /**
     * Débouncer une fonction pour éviter les appels trop fréquents
     */
    debounce: <T extends (...args: any[]) => any>(func: T, wait: number) => ((...args: Parameters<T>) => void);
    /**
     * Throttler une fonction pour limiter la fréquence d'appel
     */
    throttle: <T extends (...args: any[]) => any>(func: T, limit: number) => ((...args: Parameters<T>) => void);
    /**
     * Formater la taille en octets en format lisible
     */
    formatBytes: (bytes: number, decimals?: number) => string;
    /**
     * Calculer la vitesse de téléchargement
     */
    calculateDownloadSpeed: (bytesLoaded: number, timeElapsed: number) => number;
};
export default PerformanceProfiler;
//# sourceMappingURL=performance.d.ts.map