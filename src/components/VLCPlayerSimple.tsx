/**
 * Composant VLCPlayer simple pour test d'import
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { VLCPlayerProps } from '../types';

const VLCPlayerSimple: React.FC<VLCPlayerProps> = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.text}>🎬 VLC Player Simple</Text>
      <Text style={styles.subtext}>Module natif en cours de développement</Text>
      <Text style={styles.source}>Source: {props.source?.uri || 'Aucune'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: '#ffffff',
    fontSize: 24,
    marginBottom: 10,
  },
  subtext: {
    color: '#cccccc',
    fontSize: 14,
    marginBottom: 10,
  },
  source: {
    color: '#888888',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default VLCPlayerSimple; 