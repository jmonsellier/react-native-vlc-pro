/**
 * Tests pour le hook useVLCPlayer
 * Phase 1, Semaine 3 : Tests des contrôles avancés et de la gestion d'état
 */

import { renderHook, act } from '@testing-library/react-native';
import { useVLCPlayer } from '../../src/hooks/useVLCPlayer';

// Mock du composant VLCPlayerRef
const mockPlayerRef = {
  play: jest.fn(),
  pause: jest.fn(),
  stop: jest.fn(),
  seek: jest.fn(),
  seekForward: jest.fn(),
  seekBackward: jest.fn(),
  setVolume: jest.fn(),
  setMuted: jest.fn(),
  setRate: jest.fn(),
  getState: jest.fn(),
  getCurrentTime: jest.fn(),
  getDuration: jest.fn(),
  getVolume: jest.fn(),
  isMuted: jest.fn(),
  getRate: jest.fn(),
};

describe('useVLCPlayer', () => {
  const mockSource = {
    uri: 'https://example.com/test-video.mp4',
    title: 'Test Video',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() =>
      useVLCPlayer({
        source: mockSource,
      })
    );

    expect(result.current.state).toBe('idle');
    expect(result.current.currentTime).toBe(0);
    expect(result.current.duration).toBe(0);
    expect(result.current.volume).toBe(100);
    expect(result.current.muted).toBe(false);
    expect(result.current.rate).toBe(1.0);
    expect(result.current.error).toBeNull();
  });

  it('should initialize with custom values', () => {
    const { result } = renderHook(() =>
      useVLCPlayer({
        source: mockSource,
        volume: 50,
        muted: true,
        rate: 1.5,
      })
    );

    expect(result.current.volume).toBe(50);
    expect(result.current.muted).toBe(true);
    expect(result.current.rate).toBe(1.5);
  });

  describe('Player Controls', () => {
    it('should call play and update state', async () => {
      const { result } = renderHook(() =>
        useVLCPlayer({
          source: mockSource,
        })
      );

      // Mock the player ref
      result.current.playerRef.current = mockPlayerRef;
      mockPlayerRef.play.mockResolvedValue(undefined);

      await act(async () => {
        await result.current.controls.play();
      });

      expect(mockPlayerRef.play).toHaveBeenCalled();
      expect(result.current.state).toBe('playing');
      expect(result.current.error).toBeNull();
    });

    it('should call pause and update state', async () => {
      const { result } = renderHook(() =>
        useVLCPlayer({
          source: mockSource,
        })
      );

      result.current.playerRef.current = mockPlayerRef;
      mockPlayerRef.pause.mockResolvedValue(undefined);

      await act(async () => {
        await result.current.controls.pause();
      });

      expect(mockPlayerRef.pause).toHaveBeenCalled();
      expect(result.current.state).toBe('paused');
    });

    it('should call stop and update state', async () => {
      const { result } = renderHook(() =>
        useVLCPlayer({
          source: mockSource,
        })
      );

      result.current.playerRef.current = mockPlayerRef;
      mockPlayerRef.stop.mockResolvedValue(undefined);

      await act(async () => {
        await result.current.controls.stop();
      });

      expect(mockPlayerRef.stop).toHaveBeenCalled();
      expect(result.current.state).toBe('stopped');
      expect(result.current.currentTime).toBe(0);
    });

    it('should call seek and update current time', async () => {
      const { result } = renderHook(() =>
        useVLCPlayer({
          source: mockSource,
        })
      );

      result.current.playerRef.current = mockPlayerRef;
      mockPlayerRef.seek.mockResolvedValue(undefined);

      await act(async () => {
        await result.current.controls.seek(5000);
      });

      expect(mockPlayerRef.seek).toHaveBeenCalledWith(5000);
      expect(result.current.currentTime).toBe(5000);
    });

    it('should call seekForward', async () => {
      const { result } = renderHook(() =>
        useVLCPlayer({
          source: mockSource,
        })
      );

      result.current.playerRef.current = mockPlayerRef;
      mockPlayerRef.seekForward.mockResolvedValue(undefined);

      await act(async () => {
        await result.current.controls.seekForward(15);
      });

      expect(mockPlayerRef.seekForward).toHaveBeenCalledWith(15);
    });

    it('should call seekBackward', async () => {
      const { result } = renderHook(() =>
        useVLCPlayer({
          source: mockSource,
        })
      );

      result.current.playerRef.current = mockPlayerRef;
      mockPlayerRef.seekBackward.mockResolvedValue(undefined);

      await act(async () => {
        await result.current.controls.seekBackward(5);
      });

      expect(mockPlayerRef.seekBackward).toHaveBeenCalledWith(5);
    });
  });

  describe('Volume Controls', () => {
    it('should set volume and update state', async () => {
      const { result } = renderHook(() =>
        useVLCPlayer({
          source: mockSource,
        })
      );

      result.current.playerRef.current = mockPlayerRef;
      mockPlayerRef.setVolume.mockResolvedValue(undefined);

      await act(async () => {
        await result.current.controls.setVolume(75);
      });

      expect(mockPlayerRef.setVolume).toHaveBeenCalledWith(75);
      expect(result.current.volume).toBe(75);
    });

    it('should set muted state', async () => {
      const { result } = renderHook(() =>
        useVLCPlayer({
          source: mockSource,
        })
      );

      result.current.playerRef.current = mockPlayerRef;
      mockPlayerRef.setMuted.mockResolvedValue(undefined);

      await act(async () => {
        await result.current.controls.setMuted(true);
      });

      expect(mockPlayerRef.setMuted).toHaveBeenCalledWith(true);
      expect(result.current.muted).toBe(true);
    });

    it('should set playback rate', async () => {
      const { result } = renderHook(() =>
        useVLCPlayer({
          source: mockSource,
        })
      );

      result.current.playerRef.current = mockPlayerRef;
      mockPlayerRef.setRate.mockResolvedValue(undefined);

      await act(async () => {
        await result.current.controls.setRate(2.0);
      });

      expect(mockPlayerRef.setRate).toHaveBeenCalledWith(2.0);
      expect(result.current.rate).toBe(2.0);
    });
  });

  describe('Error Handling', () => {
    it('should handle play errors', async () => {
      const onError = jest.fn();
      const { result } = renderHook(() =>
        useVLCPlayer({
          source: mockSource,
          onError,
        })
      );

      result.current.playerRef.current = mockPlayerRef;
      const mockError = { code: 1, message: 'Play failed' };
      mockPlayerRef.play.mockRejectedValue(mockError);

      await act(async () => {
        await result.current.controls.play();
      });

      expect(result.current.error).toEqual(mockError);
      expect(onError).toHaveBeenCalledWith(mockError);
    });

    it('should handle seek errors', async () => {
      const onError = jest.fn();
      const { result } = renderHook(() =>
        useVLCPlayer({
          source: mockSource,
          onError,
        })
      );

      result.current.playerRef.current = mockPlayerRef;
      const mockError = { code: 2, message: 'Seek failed' };
      mockPlayerRef.seek.mockRejectedValue(mockError);

      await act(async () => {
        await result.current.controls.seek(1000);
      });

      expect(result.current.error).toEqual(mockError);
      expect(onError).toHaveBeenCalledWith(mockError);
    });

    it('should handle volume errors', async () => {
      const onError = jest.fn();
      const { result } = renderHook(() =>
        useVLCPlayer({
          source: mockSource,
          onError,
        })
      );

      result.current.playerRef.current = mockPlayerRef;
      const mockError = { code: 3, message: 'Volume failed' };
      mockPlayerRef.setVolume.mockRejectedValue(mockError);

      await act(async () => {
        await result.current.controls.setVolume(50);
      });

      expect(result.current.error).toEqual(mockError);
      expect(onError).toHaveBeenCalledWith(mockError);
    });
  });

  describe('State Change Callbacks', () => {
    it('should call onStateChange when state changes', async () => {
      const onStateChange = jest.fn();
      const { result } = renderHook(() =>
        useVLCPlayer({
          source: mockSource,
          onStateChange,
        })
      );

      result.current.playerRef.current = mockPlayerRef;
      mockPlayerRef.play.mockResolvedValue(undefined);

      await act(async () => {
        await result.current.controls.play();
      });

      expect(onStateChange).toHaveBeenCalledWith('playing');
    });
  });

  describe('Null Player Ref', () => {
    it('should handle null player ref gracefully', async () => {
      const { result } = renderHook(() =>
        useVLCPlayer({
          source: mockSource,
        })
      );

      // playerRef.current is null by default

      await act(async () => {
        await result.current.controls.play();
        await result.current.controls.pause();
        await result.current.controls.stop();
        await result.current.controls.seek(1000);
        await result.current.controls.setVolume(50);
        await result.current.controls.setMuted(true);
        await result.current.controls.setRate(1.5);
      });

      // Should not throw and state should remain unchanged
      expect(result.current.state).toBe('idle');
      expect(result.current.error).toBeNull();
    });
  });
}); 