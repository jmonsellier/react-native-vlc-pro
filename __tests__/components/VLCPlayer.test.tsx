/**
 * Tests pour le composant VLCPlayer
 * Phase 1, Semaine 1 : Tests de base pour l'infrastructure
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import VLCPlayer from '../../src/components/VLCPlayer';

// Mock simple du composant natif
jest.mock('../../src/components/VLCPlayerNative', () => {
  const React = require('react');
  return React.forwardRef((props: any, ref: any) => {
    const MockedComponent = 'VLCPlayerNative';
    return React.createElement(MockedComponent, { ...props, ref });
  });
});

describe('VLCPlayer', () => {
  const mockSource = {
    uri: 'https://example.com/test-video.mp4',
    title: 'Test Video',
  };

  it('should render without crashing', () => {
    const component = render(<VLCPlayer source={mockSource} />);

    expect(component).toBeTruthy();
  });

  it('should pass source prop to native component', () => {
    const { getByTestId } = render(
      <VLCPlayer source={mockSource} testID="vlc-player" />
    );

    const nativeComponent = getByTestId('vlc-player');
    expect(nativeComponent.props.source).toEqual(mockSource);
  });

  it('should accept style prop', () => {
    const customStyle = { width: 300, height: 200 };
    const { getByTestId } = render(
      <VLCPlayer source={mockSource} style={customStyle} testID="vlc-player" />
    );

    const player = getByTestId('vlc-player');
    expect(player.props.style).toEqual(customStyle);
  });

  it('should pass testID to native component', () => {
    const { getByTestId } = render(
      <VLCPlayer source={mockSource} testID="vlc-player" />
    );

    expect(getByTestId('vlc-player')).toBeTruthy();
  });

  it('should handle callbacks without errors', () => {
    const mockCallbacks = {
      onReady: jest.fn(),
      onPlay: jest.fn(),
      onPause: jest.fn(),
      onError: jest.fn(),
    };

    expect(() => {
      render(<VLCPlayer source={mockSource} {...mockCallbacks} />);
    }).not.toThrow();
  });
});
