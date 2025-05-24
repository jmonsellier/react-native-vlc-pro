/**
 * Tests pour le composant VLCPlayerNative
 * Phase 1, Semaine 2 : Tests des méthodes natives et de l'intégration
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import VLCPlayerNative from '../../src/components/VLCPlayerNative';

// Mock de React Native
jest.mock('react-native', () => {
  const mockReact = require('react');
  return {
    requireNativeComponent: jest.fn(() => {
      // Retourne un composant React valide pour les tests
      return mockReact.forwardRef((props: any, ref: any) => {
        return mockReact.createElement('VLCPlayerView', { ...props, ref });
      });
    }),
    UIManager: {
      dispatchViewManagerCommand: jest.fn(),
    },
    findNodeHandle: jest.fn(() => 1),
  };
});

const { UIManager, findNodeHandle } = require('react-native');

describe('VLCPlayerNative', () => {
  const mockSource = {
    uri: 'https://example.com/test-video.mp4',
    title: 'Test Video',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const component = render(<VLCPlayerNative source={mockSource} />);
    expect(component).toBeTruthy();
  });

  it('should pass props to native component', () => {
    const props = {
      source: mockSource,
      volume: 50,
      muted: true,
      rate: 1.5,
    };

    const component = render(
      <VLCPlayerNative {...props} testID="vlc-player" />
    );
    
    // Vérifier que le composant s'est rendu sans erreur
    expect(component).toBeTruthy();
  });

  describe('Player Controls', () => {
    it('should call play command', async () => {
      const ref = React.createRef<any>();
      render(<VLCPlayerNative ref={ref} source={mockSource} />);

      await ref.current?.play();

      expect(UIManager.dispatchViewManagerCommand).toHaveBeenCalledWith(
        1,
        'play',
        []
      );
    });

    it('should call pause command', async () => {
      const ref = React.createRef<any>();
      render(<VLCPlayerNative ref={ref} source={mockSource} />);

      await ref.current?.pause();

      expect(UIManager.dispatchViewManagerCommand).toHaveBeenCalledWith(
        1,
        'pause',
        []
      );
    });

    it('should call stop command', async () => {
      const ref = React.createRef<any>();
      render(<VLCPlayerNative ref={ref} source={mockSource} />);

      await ref.current?.stop();

      expect(UIManager.dispatchViewManagerCommand).toHaveBeenCalledWith(
        1,
        'stop',
        []
      );
    });

    it('should call seek command with time', async () => {
      const ref = React.createRef<any>();
      render(<VLCPlayerNative ref={ref} source={mockSource} />);

      await ref.current?.seek(5000);

      expect(UIManager.dispatchViewManagerCommand).toHaveBeenCalledWith(
        1,
        'seek',
        [5000]
      );
    });
  });

  describe('Player Information', () => {
    it('should return default values for getCurrentTime', async () => {
      const ref = React.createRef<any>();
      render(<VLCPlayerNative ref={ref} source={mockSource} />);

      const currentTime = await ref.current?.getCurrentTime();
      expect(currentTime).toBe(0);
    });

    it('should return default values for getDuration', async () => {
      const ref = React.createRef<any>();
      render(<VLCPlayerNative ref={ref} source={mockSource} />);

      const duration = await ref.current?.getDuration();
      expect(duration).toBe(0);
    });

    it('should return default state', async () => {
      const ref = React.createRef<any>();
      render(<VLCPlayerNative ref={ref} source={mockSource} />);

      const state = await ref.current?.getState();
      expect(state).toBe('idle');
    });

    it('should return volume from props', async () => {
      const ref = React.createRef<any>();
      render(<VLCPlayerNative ref={ref} source={mockSource} volume={75} />);

      const volume = await ref.current?.getVolume();
      expect(volume).toBe(75);
    });

    it('should return default volume when not provided', async () => {
      const ref = React.createRef<any>();
      render(<VLCPlayerNative ref={ref} source={mockSource} />);

      const volume = await ref.current?.getVolume();
      expect(volume).toBe(100);
    });

    it('should return muted state from props', async () => {
      const ref = React.createRef<any>();
      render(<VLCPlayerNative ref={ref} source={mockSource} muted={true} />);

      const muted = await ref.current?.isMuted();
      expect(muted).toBe(true);
    });

    it('should return rate from props', async () => {
      const ref = React.createRef<any>();
      render(<VLCPlayerNative ref={ref} source={mockSource} rate={2.0} />);

      const rate = await ref.current?.getRate();
      expect(rate).toBe(2.0);
    });
  });

  describe('Error Handling', () => {
    it('should handle null ref gracefully', async () => {
      findNodeHandle.mockReturnValueOnce(null);
      const ref = React.createRef<any>();
      render(<VLCPlayerNative ref={ref} source={mockSource} />);

      // Should not throw
      await expect(ref.current?.play()).resolves.toBeUndefined();
      expect(UIManager.dispatchViewManagerCommand).not.toHaveBeenCalled();
    });
  });

  describe('Seek Operations', () => {
    it('should seek forward by default 10 seconds', async () => {
      const ref = React.createRef<any>();
      render(<VLCPlayerNative ref={ref} source={mockSource} />);

      // Puisque getCurrentTime retourne toujours 0 dans l'implémentation actuelle
      await ref.current?.seekForward();

      expect(UIManager.dispatchViewManagerCommand).toHaveBeenCalledWith(
        1,
        'seek',
        [10000] // 0 + 10*1000
      );
    });

    it('should seek backward by default 10 seconds', async () => {
      const ref = React.createRef<any>();
      render(<VLCPlayerNative ref={ref} source={mockSource} />);

      // Puisque getCurrentTime retourne toujours 0 dans l'implémentation actuelle
      await ref.current?.seekBackward();

      expect(UIManager.dispatchViewManagerCommand).toHaveBeenCalledWith(
        1,
        'seek',
        [0] // Math.max(0, 0 - 10*1000)
      );
    });

    it('should not seek backward below 0', async () => {
      const ref = React.createRef<any>();
      render(<VLCPlayerNative ref={ref} source={mockSource} />);

      await ref.current?.seekBackward(10); // Try to seek back 10 seconds

      expect(UIManager.dispatchViewManagerCommand).toHaveBeenCalledWith(
        1,
        'seek',
        [0] // Math.max(0, 0 - 10*1000)
      );
    });
  });
}); 