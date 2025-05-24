/**
 * Composant VLCPlayer natif
 * Phase 1, Semaine 2 : Intégration des vues natives iOS/Android
 */

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  requireNativeComponent,
  UIManager,
  findNodeHandle,
  ViewStyle,
} from 'react-native';
import type { VLCPlayerProps, VLCPlayerRef } from '../types';

// Import de la vue native
const VLCPlayerNativeView =
  requireNativeComponent<VLCPlayerProps>('VLCPlayerView');

interface VLCPlayerNativeProps extends VLCPlayerProps {
  style?: ViewStyle;
}

const VLCPlayerNative = forwardRef<VLCPlayerRef, VLCPlayerNativeProps>(
  (props, ref) => {
    const nativeRef = useRef(null);
    
    // Gestionnaire de promesses pour les méthodes d'information
    const pendingPromises = useRef(new Map<string, (value: any) => void>());
    
    // Gestionnaires d'événements pour les réponses
    const handleGetCurrentTime = (event: any) => {
      const resolve = pendingPromises.current.get('getCurrentTime');
      if (resolve && event.nativeEvent?.currentTime !== undefined) {
        resolve(event.nativeEvent.currentTime);
        pendingPromises.current.delete('getCurrentTime');
      }
      props.onGetCurrentTime?.(event.nativeEvent);
    };
    
    const handleGetDuration = (event: any) => {
      const resolve = pendingPromises.current.get('getDuration');
      if (resolve && event.nativeEvent?.duration !== undefined) {
        resolve(event.nativeEvent.duration);
        pendingPromises.current.delete('getDuration');
      }
      props.onGetDuration?.(event.nativeEvent);
    };
    
    const handleGetState = (event: any) => {
      const resolve = pendingPromises.current.get('getState');
      if (resolve && event.nativeEvent?.state !== undefined) {
        resolve(event.nativeEvent.state);
        pendingPromises.current.delete('getState');
      }
      props.onGetState?.(event.nativeEvent);
    };
    
    const handleGetVolume = (event: any) => {
      const resolve = pendingPromises.current.get('getVolume');
      if (resolve && event.nativeEvent?.volume !== undefined) {
        resolve(event.nativeEvent.volume);
        pendingPromises.current.delete('getVolume');
      }
      props.onGetVolume?.(event.nativeEvent);
    };
    
    const handleIsMuted = (event: any) => {
      const resolve = pendingPromises.current.get('isMuted');
      if (resolve && event.nativeEvent?.muted !== undefined) {
        resolve(event.nativeEvent.muted);
        pendingPromises.current.delete('isMuted');
      }
      props.onIsMuted?.(event.nativeEvent);
    };
    
    const handleGetRate = (event: any) => {
      const resolve = pendingPromises.current.get('getRate');
      if (resolve && event.nativeEvent?.rate !== undefined) {
        resolve(event.nativeEvent.rate);
        pendingPromises.current.delete('getRate');
      }
      props.onGetRate?.(event.nativeEvent);
    };

    // Implémentation des méthodes de référence
    useImperativeHandle(ref, () => {
      const seek = async (time: number) => {
        const nodeHandle = findNodeHandle(nativeRef.current);
        if (nodeHandle) {
          UIManager.dispatchViewManagerCommand(nodeHandle, 'seek', [time]);
        }
      };

      const getCurrentTime = async () => {
        const nodeHandle = findNodeHandle(nativeRef.current);
        if (nodeHandle) {
          return new Promise<number>((resolve) => {
            pendingPromises.current.set('getCurrentTime', resolve);
            UIManager.dispatchViewManagerCommand(nodeHandle, 'getCurrentTime', []);
            
            // Timeout de sécurité
            setTimeout(() => {
              if (pendingPromises.current.has('getCurrentTime')) {
                pendingPromises.current.delete('getCurrentTime');
                resolve(0);
              }
            }, 1000);
          });
        }
        return 0;
      };

      return {
        // Contrôles de lecture
        play: async () => {
          const nodeHandle = findNodeHandle(nativeRef.current);
          if (nodeHandle) {
            UIManager.dispatchViewManagerCommand(nodeHandle, 'play', []);
          }
        },

        pause: async () => {
          const nodeHandle = findNodeHandle(nativeRef.current);
          if (nodeHandle) {
            UIManager.dispatchViewManagerCommand(nodeHandle, 'pause', []);
          }
        },

        stop: async () => {
          const nodeHandle = findNodeHandle(nativeRef.current);
          if (nodeHandle) {
            UIManager.dispatchViewManagerCommand(nodeHandle, 'stop', []);
          }
        },

        seek,

        seekForward: async (seconds = 10) => {
          try {
            const currentTime = await getCurrentTime();
            const newTime = currentTime + seconds * 1000;
            await seek(newTime);
          } catch (error) {
            console.error('VLCPlayerNative: seekForward error:', error);
          }
        },

        seekBackward: async (seconds = 10) => {
          try {
            const currentTime = await getCurrentTime();
            const newTime = Math.max(0, currentTime - seconds * 1000);
            await seek(newTime);
          } catch (error) {
            console.error('VLCPlayerNative: seekBackward error:', error);
          }
        },

        // Contrôles audio/vidéo
        setVolume: async (volume: number) => {
          // TODO: Phase 1, Semaine 3 - Implémenter setVolume via props
          console.log(
            `VLCPlayerNative: setVolume(${volume}) - À implémenter en Phase 1, Semaine 3`
          );
        },

        setMuted: async (muted: boolean) => {
          // TODO: Phase 1, Semaine 3 - Implémenter setMuted via props
          console.log(
            `VLCPlayerNative: setMuted(${muted}) - À implémenter en Phase 1, Semaine 3`
          );
        },

        setRate: async (rate: number) => {
          // TODO: Phase 1, Semaine 3 - Implémenter setRate via props
          console.log(
            `VLCPlayerNative: setRate(${rate}) - À implémenter en Phase 1, Semaine 3`
          );
        },

        // Pistes
        setSubtitleTrack: async (trackId: number) => {
          // TODO: Phase 2 - Implémenter setSubtitleTrack
          console.log(
            `VLCPlayerNative: setSubtitleTrack(${trackId}) - À implémenter en Phase 2`
          );
        },

        setAudioTrack: async (trackId: number) => {
          // TODO: Phase 2 - Implémenter setAudioTrack
          console.log(
            `VLCPlayerNative: setAudioTrack(${trackId}) - À implémenter en Phase 2`
          );
        },

        // Interface
        toggleFullscreen: async () => {
          // TODO: Phase 2 - Implémenter toggleFullscreen
          console.log(
            'VLCPlayerNative: toggleFullscreen() - À implémenter en Phase 2'
          );
        },

        takeSnapshot: async () => {
          // TODO: Phase 2 - Implémenter takeSnapshot
          console.log(
            'VLCPlayerNative: takeSnapshot() - À implémenter en Phase 2'
          );
          return '';
        },

        // Informations
        getState: async () => {
          const nodeHandle = findNodeHandle(nativeRef.current);
          if (nodeHandle) {
            return new Promise<'idle' | 'loading' | 'playing' | 'paused' | 'stopped' | 'ended' | 'error' | 'buffering'>((resolve) => {
              pendingPromises.current.set('getState', resolve);
              UIManager.dispatchViewManagerCommand(nodeHandle, 'getState', []);
              
              setTimeout(() => {
                if (pendingPromises.current.has('getState')) {
                  pendingPromises.current.delete('getState');
                  resolve('idle');
                }
              }, 1000);
            });
          }
          return 'idle' as const;
        },

        getCurrentTime,

        getDuration: async () => {
          const nodeHandle = findNodeHandle(nativeRef.current);
          if (nodeHandle) {
            return new Promise<number>((resolve) => {
              pendingPromises.current.set('getDuration', resolve);
              UIManager.dispatchViewManagerCommand(nodeHandle, 'getDuration', []);
              
              setTimeout(() => {
                if (pendingPromises.current.has('getDuration')) {
                  pendingPromises.current.delete('getDuration');
                  resolve(0);
                }
              }, 1000);
            });
          }
          return 0;
        },

        getMediaInfo: async () => {
          // TODO: Phase 1, Semaine 4 - Implémenter getMediaInfo
          console.log(
            'VLCPlayerNative: getMediaInfo() - À implémenter en Phase 1, Semaine 4'
          );
          return { duration: 0 };
        },

        getVolume: async () => {
          const nodeHandle = findNodeHandle(nativeRef.current);
          if (nodeHandle) {
            return new Promise<number>((resolve) => {
              pendingPromises.current.set('getVolume', resolve);
              UIManager.dispatchViewManagerCommand(nodeHandle, 'getVolume', []);
              
              setTimeout(() => {
                if (pendingPromises.current.has('getVolume')) {
                  pendingPromises.current.delete('getVolume');
                  resolve(props.volume || 100);
                }
              }, 1000);
            });
          }
          return props.volume || 100;
        },

        isMuted: async () => {
          const nodeHandle = findNodeHandle(nativeRef.current);
          if (nodeHandle) {
            return new Promise<boolean>((resolve) => {
              pendingPromises.current.set('isMuted', resolve);
              UIManager.dispatchViewManagerCommand(nodeHandle, 'isMuted', []);
              
              setTimeout(() => {
                if (pendingPromises.current.has('isMuted')) {
                  pendingPromises.current.delete('isMuted');
                  resolve(props.muted || false);
                }
              }, 1000);
            });
          }
          return props.muted || false;
        },

        getRate: async () => {
          const nodeHandle = findNodeHandle(nativeRef.current);
          if (nodeHandle) {
            return new Promise<number>((resolve) => {
              pendingPromises.current.set('getRate', resolve);
              UIManager.dispatchViewManagerCommand(nodeHandle, 'getRate', []);
              
              setTimeout(() => {
                if (pendingPromises.current.has('getRate')) {
                  pendingPromises.current.delete('getRate');
                  resolve(props.rate || 1.0);
                }
              }, 1000);
            });
          }
          return props.rate || 1.0;
        },
      };
    });

    return <VLCPlayerNativeView 
      ref={nativeRef} 
      {...props}
      onGetCurrentTime={handleGetCurrentTime}
      onGetDuration={handleGetDuration}
      onGetState={handleGetState}
      onGetVolume={handleGetVolume}
      onIsMuted={handleIsMuted}
      onGetRate={handleGetRate}
    />;
  }
);

VLCPlayerNative.displayName = 'VLCPlayerNative';

export default VLCPlayerNative;
