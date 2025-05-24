/**
 * Hook useVLCPlayer
 * Phase 1, Semaine 3 : Contrôles de lecture avancés
 */
import type { VLCPlayerRef, MediaSource, PlayerState, ProgressData, VLCError } from '../types';
export interface UseVLCPlayerOptions {
    /** Source média */
    source: MediaSource;
    /** Lecture automatique */
    autoPlay?: boolean;
    /** Lecture en boucle */
    loop?: boolean;
    /** Son coupé */
    muted?: boolean;
    /** Volume initial (0-100) */
    volume?: number;
    /** Vitesse de lecture */
    rate?: number;
    /** Callback de progression */
    onProgress?: (data: ProgressData) => void;
    /** Callback de changement d'état */
    onStateChange?: (state: PlayerState) => void;
    /** Callback d'erreur */
    onError?: (error: VLCError) => void;
}
export interface UseVLCPlayerReturn {
    /** Référence vers le lecteur */
    playerRef: {
        current: VLCPlayerRef | null;
    };
    /** État actuel du lecteur */
    state: PlayerState;
    /** Position actuelle en millisecondes */
    currentTime: number;
    /** Durée totale en millisecondes */
    duration: number;
    /** Volume actuel */
    volume: number;
    /** Son coupé */
    muted: boolean;
    /** Vitesse de lecture */
    rate: number;
    /** Contrôles du lecteur */
    controls: {
        play: () => Promise<void>;
        pause: () => Promise<void>;
        stop: () => Promise<void>;
        seek: (time: number) => Promise<void>;
        seekForward: (seconds?: number) => Promise<void>;
        seekBackward: (seconds?: number) => Promise<void>;
        setVolume: (volume: number) => Promise<void>;
        setMuted: (muted: boolean) => Promise<void>;
        setRate: (rate: number) => Promise<void>;
    };
    /** Erreur actuelle */
    error: VLCError | null;
}
export declare const useVLCPlayer: (options: UseVLCPlayerOptions) => UseVLCPlayerReturn;
//# sourceMappingURL=useVLCPlayer.d.ts.map