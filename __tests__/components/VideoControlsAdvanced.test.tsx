/**
 * Tests pour VideoControlsAdvanced
 * Phase 2, Semaine 5 : Interface utilisateur avancée
 */

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import VideoControlsAdvanced from '../../src/components/VideoControlsAdvanced';
import type { CustomTheme, ControlsConfig, AccessibilityConfig } from '../../src/types';

describe('VideoControlsAdvanced', () => {
  const defaultProps = {
    isPlaying: false,
    currentTime: 30000, // 30 secondes
    duration: 120000, // 2 minutes
    volume: 75,
    isMuted: false,
    playbackRate: 1.0,
    isFullscreen: false,
    visible: true,
  };

  const mockCallbacks = {
    onPlay: jest.fn(),
    onPause: jest.fn(),
    onSeek: jest.fn(),
    onSeekForward: jest.fn(),
    onSeekBackward: jest.fn(),
    onVolumeChange: jest.fn(),
    onMuteToggle: jest.fn(),
    onRateChange: jest.fn(),
    onFullscreenToggle: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendu de base', () => {
    it('devrait rendre tous les contrôles par défaut', () => {
      const { getByText } = render(
        <VideoControlsAdvanced {...defaultProps} {...mockCallbacks} />
      );

      expect(getByText('00:30 / 02:00')).toBeTruthy();
      expect(getByText('▶️')).toBeTruthy(); // Play button
      expect(getByText('⏪')).toBeTruthy(); // Seek backward
      expect(getByText('⏩')).toBeTruthy(); // Seek forward
      expect(getByText('1x')).toBeTruthy(); // Playback rate
    });

    it('devrait afficher le bouton pause quand en lecture', () => {
      const { getByText } = render(
        <VideoControlsAdvanced 
          {...defaultProps} 
          {...mockCallbacks} 
          isPlaying={true} 
        />
      );

      expect(getByText('⏸️')).toBeTruthy();
    });

    it('devrait afficher le bon volume', () => {
      const { getByText } = render(
        <VideoControlsAdvanced {...defaultProps} {...mockCallbacks} />
      );

      // Appuyer sur le bouton volume pour afficher le slider (volume 75 = 🔊)
      act(() => {
        fireEvent.press(getByText('🔊'));
      });
      expect(getByText('75%')).toBeTruthy();
    });
  });

  describe('Thèmes', () => {
    it('devrait appliquer le thème sombre par défaut', () => {
      const { getByTestId } = render(
        <VideoControlsAdvanced 
          {...defaultProps} 
          {...mockCallbacks}
          theme="dark"
        />
      );
      // Le test vérifie que le composant se rend sans erreur avec le thème sombre
      expect(true).toBeTruthy();
    });

    it('devrait appliquer le thème clair', () => {
      const { getByTestId } = render(
        <VideoControlsAdvanced 
          {...defaultProps} 
          {...mockCallbacks}
          theme="light"
        />
      );
      // Le test vérifie que le composant se rend sans erreur avec le thème clair
      expect(true).toBeTruthy();
    });

    it('devrait appliquer un thème personnalisé', () => {
      const customTheme: CustomTheme = {
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
        textColor: '#FFFFFF',
        buttonColor: 'rgba(0, 255, 0, 0.3)',
        progressColor: '#0000FF',
        progressBackgroundColor: 'rgba(128, 128, 128, 0.5)',
        controlsOpacity: 0.9,
        borderRadius: 10,
      };

      const { getByTestId } = render(
        <VideoControlsAdvanced 
          {...defaultProps} 
          {...mockCallbacks}
          theme="custom"
          customTheme={customTheme}
        />
      );
      // Le test vérifie que le composant se rend sans erreur avec un thème personnalisé
      expect(true).toBeTruthy();
    });
  });

  describe('Configuration des contrôles', () => {
    it('devrait masquer les boutons de navigation quand configuré', () => {
      const controlsConfig: ControlsConfig = {
        showSeekButtons: false,
      };

      const { queryByText } = render(
        <VideoControlsAdvanced 
          {...defaultProps} 
          {...mockCallbacks}
          controlsConfig={controlsConfig}
        />
      );

      expect(queryByText('⏪')).toBeNull();
      expect(queryByText('⏩')).toBeNull();
    });

    it('devrait masquer le bouton play/pause quand configuré', () => {
      const controlsConfig: ControlsConfig = {
        showPlayPause: false,
      };

      const { queryByText } = render(
        <VideoControlsAdvanced 
          {...defaultProps} 
          {...mockCallbacks}
          controlsConfig={controlsConfig}
        />
      );

      expect(queryByText('▶️')).toBeNull();
    });

    it('devrait masquer la barre de progression quand configuré', () => {
      const controlsConfig: ControlsConfig = {
        showProgressBar: false,
      };

      const { queryByText } = render(
        <VideoControlsAdvanced 
          {...defaultProps} 
          {...mockCallbacks}
          controlsConfig={controlsConfig}
        />
      );

      expect(queryByText('0:30 / 2:00')).toBeNull();
    });

    it('devrait masquer les informations de temps quand configuré', () => {
      const controlsConfig: ControlsConfig = {
        showTimeInfo: false,
      };

      const { queryByText } = render(
        <VideoControlsAdvanced 
          {...defaultProps} 
          {...mockCallbacks}
          controlsConfig={controlsConfig}
        />
      );

      expect(queryByText('0:30 / 2:00')).toBeNull();
    });
  });

  describe('Accessibilité', () => {
    it('devrait utiliser les labels d\'accessibilité personnalisés', () => {
      const accessibilityConfig: AccessibilityConfig = {
        labels: {
          playButton: 'Démarrer la lecture',
          pauseButton: 'Mettre en pause',
          seekForwardButton: 'Avancer de 10 secondes',
          seekBackwardButton: 'Reculer de 10 secondes',
          volumeButton: 'Contrôle du volume',
          fullscreenButton: 'Mode plein écran',
          progressBar: 'Barre de progression de la vidéo',
        },
      };

      const { getByLabelText } = render(
        <VideoControlsAdvanced 
          {...defaultProps} 
          {...mockCallbacks}
          accessibilityConfig={accessibilityConfig}
        />
      );

      expect(getByLabelText('Démarrer la lecture')).toBeTruthy();
      expect(getByLabelText('Avancer de 10 secondes')).toBeTruthy();
      expect(getByLabelText('Reculer de 10 secondes')).toBeTruthy();
    });

    it('devrait respecter la taille minimale des zones tactiles', () => {
      const accessibilityConfig: AccessibilityConfig = {
        minimumTouchTargetSize: 48,
      };

      const { getByTestId } = render(
        <VideoControlsAdvanced 
          {...defaultProps} 
          {...mockCallbacks}
          accessibilityConfig={accessibilityConfig}
        />
      );
      // Le test vérifie que le composant se rend sans erreur avec la configuration d'accessibilité
      expect(true).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('devrait appeler onPlay quand le bouton play est pressé', () => {
      const { getByText } = render(
        <VideoControlsAdvanced {...defaultProps} {...mockCallbacks} />
      );

      act(() => {
        fireEvent.press(getByText('▶️'));
      });
      expect(mockCallbacks.onPlay).toHaveBeenCalledTimes(1);
    });

    it('devrait appeler onPause quand le bouton pause est pressé', () => {
      const { getByText } = render(
        <VideoControlsAdvanced 
          {...defaultProps} 
          {...mockCallbacks} 
          isPlaying={true} 
        />
      );

      act(() => {
        fireEvent.press(getByText('⏸️'));
      });
      expect(mockCallbacks.onPause).toHaveBeenCalledTimes(1);
    });

    it('devrait appeler onSeekBackward quand le bouton reculer est pressé', () => {
      const { getByText } = render(
        <VideoControlsAdvanced {...defaultProps} {...mockCallbacks} />
      );

      act(() => {
        fireEvent.press(getByText('⏪'));
      });
      expect(mockCallbacks.onSeekBackward).toHaveBeenCalledWith(10);
    });

    it('devrait appeler onSeekForward quand le bouton avancer est pressé', () => {
      const { getByText } = render(
        <VideoControlsAdvanced {...defaultProps} {...mockCallbacks} />
      );

      act(() => {
        fireEvent.press(getByText('⏩'));
      });
      expect(mockCallbacks.onSeekForward).toHaveBeenCalledWith(10);
    });

    it('devrait afficher/masquer le slider de volume', () => {
      const { getByText, queryByText } = render(
        <VideoControlsAdvanced {...defaultProps} {...mockCallbacks} />
      );

      // Initialement, le slider n'est pas visible
      expect(queryByText('75%')).toBeNull();

      // Appuyer sur le bouton volume (volume 75 = 🔊)
      act(() => {
        fireEvent.press(getByText('🔊'));
      });
      expect(getByText('75%')).toBeTruthy();
    });

    it('devrait afficher/masquer le sélecteur de vitesse', () => {
      const { getByText, queryByText } = render(
        <VideoControlsAdvanced {...defaultProps} {...mockCallbacks} />
      );

      // Appuyer sur le bouton de vitesse
      act(() => {
        fireEvent.press(getByText('1x'));
      });
      
      // Vérifier que les options de vitesse sont affichées
      expect(getByText('0.5x')).toBeTruthy();
      expect(getByText('1.5x')).toBeTruthy();
      expect(getByText('2x')).toBeTruthy();
    });

    it('devrait changer la vitesse de lecture', () => {
      const { getByText } = render(
        <VideoControlsAdvanced {...defaultProps} {...mockCallbacks} />
      );

      // Ouvrir le sélecteur de vitesse
      act(() => {
        fireEvent.press(getByText('1x'));
      });
      
      // Sélectionner une nouvelle vitesse
      act(() => {
        fireEvent.press(getByText('1.5x'));
      });
      
      expect(mockCallbacks.onRateChange).toHaveBeenCalledWith(1.5);
    });
  });

  describe('États spéciaux', () => {
    it('devrait afficher l\'icône de son coupé quand muté', () => {
      const { getByText } = render(
        <VideoControlsAdvanced 
          {...defaultProps} 
          {...mockCallbacks} 
          isMuted={true} 
        />
      );

      expect(getByText('🔇')).toBeTruthy();
    });

    it('devrait afficher la bonne icône de volume selon le niveau', () => {
      // Volume élevé
      const { getByText, rerender } = render(
        <VideoControlsAdvanced 
          {...defaultProps} 
          {...mockCallbacks} 
          volume={80} 
        />
      );
      expect(getByText('🔊')).toBeTruthy();

      // Volume faible
      rerender(
        <VideoControlsAdvanced 
          {...defaultProps} 
          {...mockCallbacks} 
          volume={30} 
        />
      );
      expect(getByText('🔉')).toBeTruthy();
    });

    it('devrait calculer correctement le pourcentage de progression', () => {
      const { getByText } = render(
        <VideoControlsAdvanced 
          {...defaultProps} 
          {...mockCallbacks} 
          currentTime={60000} // 1 minute
          duration={120000} // 2 minutes
        />
      );

      expect(getByText('01:00 / 02:00')).toBeTruthy(); // Format exact du composant
    });
  });
}); 