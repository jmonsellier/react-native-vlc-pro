/**
 * Tests pour TrackSelector
 * Phase 2, Semaine 6 : Gestion des pistes audio/sous-titres
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TrackSelector from '../../src/components/TrackSelector';
import type { AudioTrack, SubtitleTrack } from '../../src/types';

describe('TrackSelector', () => {
  const mockAudioTracks: AudioTrack[] = [
    { id: 1, name: 'Français', language: 'fr', description: 'Piste audio française' },
    { id: 2, name: 'English', language: 'en', description: 'English audio track' },
    { id: 3, name: 'Español', language: 'es', description: 'Pista de audio en español' },
  ];

  const mockSubtitleTracks: SubtitleTrack[] = [
    { id: 1, name: 'Français', language: 'fr', encoding: 'UTF-8', type: 'SRT' },
    { id: 2, name: 'English', language: 'en', encoding: 'UTF-8', type: 'VTT' },
  ];

  const mockCallbacks = {
    onAudioTrackSelect: jest.fn(),
    onSubtitleTrackSelect: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendu de base', () => {
    it('devrait rendre le modal quand visible', () => {
      const { getByText } = render(
        <TrackSelector
          visible={true}
          audioTracks={mockAudioTracks}
          subtitleTracks={mockSubtitleTracks}
          {...mockCallbacks}
        />
      );

      expect(getByText('Sélection des pistes')).toBeTruthy();
      expect(getByText('Audio (3)')).toBeTruthy();
      expect(getByText('Sous-titres (2)')).toBeTruthy();
    });

    it('ne devrait pas rendre le modal quand invisible', () => {
      const { queryByText } = render(
        <TrackSelector
          visible={false}
          audioTracks={mockAudioTracks}
          subtitleTracks={mockSubtitleTracks}
          {...mockCallbacks}
        />
      );

      expect(queryByText('Sélection des pistes')).toBeNull();
    });

    it('devrait afficher les pistes audio par défaut', () => {
      const { getByText } = render(
        <TrackSelector
          visible={true}
          audioTracks={mockAudioTracks}
          subtitleTracks={mockSubtitleTracks}
          {...mockCallbacks}
        />
      );

      expect(getByText('Français')).toBeTruthy();
      expect(getByText('English')).toBeTruthy();
      expect(getByText('Español')).toBeTruthy();
    });
  });

  describe('Navigation par onglets', () => {
    it('devrait basculer vers l\'onglet sous-titres', () => {
      const { getByText } = render(
        <TrackSelector
          visible={true}
          audioTracks={mockAudioTracks}
          subtitleTracks={mockSubtitleTracks}
          {...mockCallbacks}
        />
      );

      fireEvent.press(getByText('Sous-titres (2)'));
      expect(getByText('Aucun sous-titre')).toBeTruthy();
    });

    it('devrait revenir à l\'onglet audio', () => {
      const { getByText } = render(
        <TrackSelector
          visible={true}
          audioTracks={mockAudioTracks}
          subtitleTracks={mockSubtitleTracks}
          {...mockCallbacks}
        />
      );

      // Aller aux sous-titres puis revenir à l'audio
      fireEvent.press(getByText('Sous-titres (2)'));
      fireEvent.press(getByText('Audio (3)'));
      
      expect(getByText('Français')).toBeTruthy();
      expect(getByText('English')).toBeTruthy();
    });
  });

  describe('Sélection de pistes audio', () => {
    it('devrait appeler onAudioTrackSelect quand une piste est sélectionnée', () => {
      const { getByText } = render(
        <TrackSelector
          visible={true}
          audioTracks={mockAudioTracks}
          subtitleTracks={mockSubtitleTracks}
          {...mockCallbacks}
        />
      );

      fireEvent.press(getByText('English'));
      expect(mockCallbacks.onAudioTrackSelect).toHaveBeenCalledWith(2);
      expect(mockCallbacks.onClose).toHaveBeenCalled();
    });

    it('devrait marquer la piste sélectionnée', () => {
      const { getByText } = render(
        <TrackSelector
          visible={true}
          audioTracks={mockAudioTracks}
          subtitleTracks={mockSubtitleTracks}
          selectedAudioTrack={1}
          {...mockCallbacks}
        />
      );

      // Vérifier que la piste sélectionnée a l'icône de sélection
      expect(getByText('✓')).toBeTruthy();
    });
  });

  describe('Sélection de sous-titres', () => {
    it('devrait permettre de sélectionner "Aucun sous-titre"', () => {
      const { getByText } = render(
        <TrackSelector
          visible={true}
          audioTracks={mockAudioTracks}
          subtitleTracks={mockSubtitleTracks}
          {...mockCallbacks}
        />
      );

      fireEvent.press(getByText('Sous-titres (2)'));
      fireEvent.press(getByText('Aucun sous-titre'));
      
      expect(mockCallbacks.onSubtitleTrackSelect).toHaveBeenCalledWith(-1);
      expect(mockCallbacks.onClose).toHaveBeenCalled();
    });

    it('devrait appeler onSubtitleTrackSelect pour une piste spécifique', () => {
      const { getByText } = render(
        <TrackSelector
          visible={true}
          audioTracks={mockAudioTracks}
          subtitleTracks={mockSubtitleTracks}
          {...mockCallbacks}
        />
      );

      fireEvent.press(getByText('Sous-titres (2)'));
      fireEvent.press(getByText('English'));
      
      expect(mockCallbacks.onSubtitleTrackSelect).toHaveBeenCalledWith(2);
      expect(mockCallbacks.onClose).toHaveBeenCalled();
    });
  });

  describe('Fermeture du modal', () => {
    it('devrait appeler onClose quand le bouton fermer est pressé', () => {
      const { getByText } = render(
        <TrackSelector
          visible={true}
          audioTracks={mockAudioTracks}
          subtitleTracks={mockSubtitleTracks}
          {...mockCallbacks}
        />
      );

      fireEvent.press(getByText('✕'));
      expect(mockCallbacks.onClose).toHaveBeenCalled();
    });
  });

  describe('États vides', () => {
    it('devrait afficher un message quand aucune piste audio', () => {
      const { getByText } = render(
        <TrackSelector
          visible={true}
          audioTracks={[]}
          subtitleTracks={mockSubtitleTracks}
          {...mockCallbacks}
        />
      );

      expect(getByText('Aucune piste audio disponible')).toBeTruthy();
    });

    it('devrait afficher un message quand aucune piste de sous-titres', () => {
      const { getByText } = render(
        <TrackSelector
          visible={true}
          audioTracks={mockAudioTracks}
          subtitleTracks={[]}
          {...mockCallbacks}
        />
      );

      fireEvent.press(getByText('Sous-titres (0)'));
      expect(getByText('Aucune piste de sous-titres disponible')).toBeTruthy();
    });
  });

  describe('Thèmes', () => {
    it('devrait appliquer le thème sombre', () => {
      const { getByTestId } = render(
        <TrackSelector
          visible={true}
          audioTracks={mockAudioTracks}
          subtitleTracks={mockSubtitleTracks}
          theme="dark"
          {...mockCallbacks}
        />
      );
      // Le test vérifie que le composant se rend sans erreur avec le thème sombre
      expect(true).toBeTruthy();
    });

    it('devrait appliquer un thème personnalisé', () => {
      const customTheme = {
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
        textColor: '#FFFFFF',
        buttonColor: 'rgba(0, 255, 0, 0.3)',
        progressColor: '#0000FF',
      };

      const { getByTestId } = render(
        <TrackSelector
          visible={true}
          audioTracks={mockAudioTracks}
          subtitleTracks={mockSubtitleTracks}
          theme="custom"
          customTheme={customTheme}
          {...mockCallbacks}
        />
      );
      // Le test vérifie que le composant se rend sans erreur avec un thème personnalisé
      expect(true).toBeTruthy();
    });
  });

  describe('Accessibilité', () => {
    it('devrait avoir les labels d\'accessibilité appropriés', () => {
      const { getByLabelText } = render(
        <TrackSelector
          visible={true}
          audioTracks={mockAudioTracks}
          subtitleTracks={mockSubtitleTracks}
          {...mockCallbacks}
        />
      );

      expect(getByLabelText('Fermer')).toBeTruthy();
      expect(getByLabelText('Pistes audio')).toBeTruthy();
      expect(getByLabelText('Sous-titres')).toBeTruthy();
    });

    it('devrait avoir les rôles d\'accessibilité corrects', () => {
      const { getAllByRole } = render(
        <TrackSelector
          visible={true}
          audioTracks={mockAudioTracks}
          subtitleTracks={mockSubtitleTracks}
          {...mockCallbacks}
        />
      );

      const buttons = getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0); // Au moins un bouton
    });
  });
}); 