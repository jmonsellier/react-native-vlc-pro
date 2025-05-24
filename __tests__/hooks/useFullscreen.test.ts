/**
 * Tests pour useFullscreen
 * Phase 2, Semaine 6 : Mode plein écran natif
 */

import { renderHook, act } from '@testing-library/react-native';
import { Dimensions, StatusBar } from 'react-native';
import useFullscreen from '../../src/hooks/useFullscreen';

// Mock des modules React Native
jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn(() => ({ width: 375, height: 812 })),
    addEventListener: jest.fn(() => ({ remove: jest.fn() })),
  },
  StatusBar: {
    setHidden: jest.fn(),
  },
  Platform: {
    OS: 'ios',
  },
}));

describe('useFullscreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('État initial', () => {
    it('devrait initialiser avec isFullscreen à false', () => {
      const { result } = renderHook(() => useFullscreen());
      
      expect(result.current.isFullscreen).toBe(false);
    });

    it('devrait initialiser avec les dimensions de l\'écran', () => {
      const { result } = renderHook(() => useFullscreen());
      
      expect(result.current.screenDimensions).toEqual({
        width: 375,
        height: 812,
      });
    });
  });

  describe('Basculement en plein écran', () => {
    it('devrait basculer en plein écran avec toggleFullscreen', () => {
      const { result } = renderHook(() => useFullscreen());
      
      act(() => {
        result.current.toggleFullscreen();
      });
      
      expect(result.current.isFullscreen).toBe(true);
    });

    it('devrait entrer en plein écran avec enterFullscreen', () => {
      const { result } = renderHook(() => useFullscreen());
      
      act(() => {
        result.current.enterFullscreen();
      });
      
      expect(result.current.isFullscreen).toBe(true);
    });

    it('devrait sortir du plein écran avec exitFullscreen', () => {
      const { result } = renderHook(() => useFullscreen());
      
      // D'abord entrer en plein écran
      act(() => {
        result.current.enterFullscreen();
      });
      
      // Puis sortir
      act(() => {
        result.current.exitFullscreen();
      });
      
      expect(result.current.isFullscreen).toBe(false);
    });
  });

  describe('Gestion de la barre de statut', () => {
    it('devrait masquer la barre de statut en plein écran par défaut', () => {
      const { result } = renderHook(() => useFullscreen());
      
      act(() => {
        result.current.enterFullscreen();
      });
      
      expect(StatusBar.setHidden).toHaveBeenCalledWith(true, 'slide');
    });

    it('devrait afficher la barre de statut en sortant du plein écran', () => {
      const { result } = renderHook(() => useFullscreen());
      
      act(() => {
        result.current.enterFullscreen();
      });
      
      act(() => {
        result.current.exitFullscreen();
      });
      
      expect(StatusBar.setHidden).toHaveBeenCalledWith(false, 'slide');
    });

    it('ne devrait pas masquer la barre de statut si hideStatusBar est false', () => {
      const { result } = renderHook(() => 
        useFullscreen({ hideStatusBar: false })
      );
      
      act(() => {
        result.current.enterFullscreen();
      });
      
      expect(StatusBar.setHidden).toHaveBeenCalledWith(false, 'slide');
    });
  });

  describe('Callback de changement', () => {
    it('devrait appeler onFullscreenChange lors du changement d\'état', () => {
      const onFullscreenChange = jest.fn();
      const { result } = renderHook(() => 
        useFullscreen({ onFullscreenChange })
      );
      
      act(() => {
        result.current.toggleFullscreen();
      });
      
      expect(onFullscreenChange).toHaveBeenCalledWith(true);
    });

    it('devrait appeler onFullscreenChange avec false lors de la sortie', () => {
      const onFullscreenChange = jest.fn();
      const { result } = renderHook(() => 
        useFullscreen({ onFullscreenChange })
      );
      
      act(() => {
        result.current.enterFullscreen();
      });
      
      act(() => {
        result.current.exitFullscreen();
      });
      
      expect(onFullscreenChange).toHaveBeenLastCalledWith(false);
    });
  });

  describe('Écoute des changements de dimensions', () => {
    it('devrait s\'abonner aux changements de dimensions', () => {
      renderHook(() => useFullscreen());
      
      expect(Dimensions.addEventListener).toHaveBeenCalledWith(
        'change',
        expect.any(Function)
      );
    });

    it('devrait se désabonner lors du démontage', () => {
      const mockRemove = jest.fn();
      (Dimensions.addEventListener as jest.Mock).mockReturnValue({
        remove: mockRemove,
      });
      
      const { unmount } = renderHook(() => useFullscreen());
      
      unmount();
      
      expect(mockRemove).toHaveBeenCalled();
    });
  });

  describe('Options de configuration', () => {
    it('devrait accepter une orientation personnalisée', () => {
      const { result } = renderHook(() => 
        useFullscreen({ orientation: 'landscape' })
      );
      
      // Le hook devrait fonctionner normalement même avec une orientation spécifiée
      expect(result.current.isFullscreen).toBe(false);
    });

    it('devrait fonctionner avec toutes les options', () => {
      const onFullscreenChange = jest.fn();
      const { result } = renderHook(() => 
        useFullscreen({
          hideStatusBar: true,
          orientation: 'auto',
          onFullscreenChange,
        })
      );
      
      expect(result.current.isFullscreen).toBe(false);
      expect(typeof result.current.toggleFullscreen).toBe('function');
      expect(typeof result.current.enterFullscreen).toBe('function');
      expect(typeof result.current.exitFullscreen).toBe('function');
    });
  });
}); 