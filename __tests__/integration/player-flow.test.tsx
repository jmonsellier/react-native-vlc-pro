/**
 * Tests d'intégration pour le flux complet du lecteur VLC
 * Phase 1 : Tests de l'interaction entre composants et hooks
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { renderHook, act } from '@testing-library/react-native';
import VLCPlayer from '../../src/components/VLCPlayer';
import { useVLCPlayer } from '../../src/hooks/useVLCPlayer';

// Mock du composant natif
jest.mock('../../src/components/VLCPlayerNative', () => {
  const React = require('react');
  return React.forwardRef((props: any, ref: any) => {
    const MockedComponent = 'VLCPlayerNative';
    return React.createElement(MockedComponent, { ...props, ref });
  });
});

describe('Player Integration Flow', () => {
  const mockSource = {
    uri: 'https://example.com/test-video.mp4',
    title: 'Test Video',
  };

  describe('Component and Hook Integration', () => {
    it('should integrate VLCPlayer with useVLCPlayer hook', () => {
      const TestComponent = () => {
        const { playerRef, state, controls } = useVLCPlayer({
          source: mockSource,
        });

        return (
          <VLCPlayer
            ref={playerRef}
            source={mockSource}
            testID="integrated-player"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);
      const player = getByTestId('integrated-player');

      expect(player).toBeTruthy();
      expect(player.props.source).toEqual(mockSource);
    });

    it('should handle state changes through the hook', async () => {
      const onStateChange = jest.fn();
      const { result } = renderHook(() =>
        useVLCPlayer({
          source: mockSource,
          onStateChange,
        })
      );

      // Mock player ref
      const mockPlayerRef = {
        play: jest.fn().mockResolvedValue(undefined),
        pause: jest.fn().mockResolvedValue(undefined),
        stop: jest.fn().mockResolvedValue(undefined),
      };

      result.current.playerRef.current = mockPlayerRef as any;

      // Test play flow
      await act(async () => {
        await result.current.controls.play();
      });

      expect(result.current.state).toBe('playing');
      expect(onStateChange).toHaveBeenCalledWith('playing');

      // Test pause flow
      await act(async () => {
        await result.current.controls.pause();
      });

      expect(result.current.state).toBe('paused');
      expect(onStateChange).toHaveBeenCalledWith('paused');

      // Test stop flow
      await act(async () => {
        await result.current.controls.stop();
      });

      expect(result.current.state).toBe('stopped');
      expect(onStateChange).toHaveBeenCalledWith('stopped');
    });
  });

  describe('Error Propagation', () => {
    it('should propagate errors from native component to hook', async () => {
      const onError = jest.fn();
      const { result } = renderHook(() =>
        useVLCPlayer({
          source: mockSource,
          onError,
        })
      );

      const mockError = { code: 1, message: 'Playback failed' };
      const mockPlayerRef = {
        play: jest.fn().mockRejectedValue(mockError),
      };

      result.current.playerRef.current = mockPlayerRef as any;

      await act(async () => {
        await result.current.controls.play();
      });

      expect(result.current.error).toEqual(mockError);
      expect(onError).toHaveBeenCalledWith(mockError);
    });
  });

  describe('Props Synchronization', () => {
    it('should synchronize props between component and hook', () => {
      const TestComponent = ({ volume, muted, rate }: any) => {
        const { playerRef } = useVLCPlayer({
          source: mockSource,
          volume,
          muted,
          rate,
        });

        return (
          <VLCPlayer
            ref={playerRef}
            source={mockSource}
            volume={volume}
            muted={muted}
            rate={rate}
            testID="synced-player"
          />
        );
      };

      const { getByTestId, rerender } = render(
        <TestComponent volume={50} muted={false} rate={1.0} />
      );

      let player = getByTestId('synced-player');
      expect(player.props.volume).toBe(50);
      expect(player.props.muted).toBe(false);
      expect(player.props.rate).toBe(1.0);

      // Update props
      rerender(<TestComponent volume={75} muted={true} rate={1.5} />);

      player = getByTestId('synced-player');
      expect(player.props.volume).toBe(75);
      expect(player.props.muted).toBe(true);
      expect(player.props.rate).toBe(1.5);
    });
  });

  describe('Callback Chain', () => {
    it('should handle callback chain from component to hook', async () => {
      const onPlay = jest.fn();
      const onPause = jest.fn();
      const onError = jest.fn();

      const TestComponent = () => {
        const { playerRef, controls } = useVLCPlayer({
          source: mockSource,
          onError,
        });

        return (
          <VLCPlayer
            ref={playerRef}
            source={mockSource}
            onPlay={onPlay}
            onPause={onPause}
            onError={onError}
            testID="callback-player"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);
      const player = getByTestId('callback-player');

      expect(player.props.onPlay).toBe(onPlay);
      expect(player.props.onPause).toBe(onPause);
      expect(player.props.onError).toBe(onError);
    });
  });

  describe('Memory Management', () => {
    it('should handle component unmounting gracefully', () => {
      const TestComponent = () => {
        const { playerRef } = useVLCPlayer({
          source: mockSource,
        });

        return <VLCPlayer ref={playerRef} source={mockSource} />;
      };

      const { unmount } = render(<TestComponent />);

      // Should not throw when unmounting
      expect(() => unmount()).not.toThrow();
    });
  });

  describe('Multiple Instances', () => {
    it('should handle multiple player instances independently', () => {
      const TestComponent = ({ testId }: { testId: string }) => {
        const { playerRef } = useVLCPlayer({
          source: mockSource,
        });

        return (
          <VLCPlayer ref={playerRef} source={mockSource} testID={testId} />
        );
      };

      const { getByTestId } = render(
        <>
          <TestComponent testId="player-1" />
          <TestComponent testId="player-2" />
        </>
      );

      const player1 = getByTestId('player-1');
      const player2 = getByTestId('player-2');

      expect(player1).toBeTruthy();
      expect(player2).toBeTruthy();
      expect(player1).not.toBe(player2);
    });
  });
}); 