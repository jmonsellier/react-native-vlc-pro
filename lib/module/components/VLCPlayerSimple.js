/**
 * Composant VLCPlayer simple pour test d'import
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const VLCPlayerSimple = props => {
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, props.style]
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.text
  }, "\uD83C\uDFAC VLC Player Simple"), /*#__PURE__*/React.createElement(Text, {
    style: styles.subtext
  }, "Module natif en cours de d\xE9veloppement"), /*#__PURE__*/React.createElement(Text, {
    style: styles.source
  }, "Source: ", props.source?.uri || 'Aucune'));
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  text: {
    color: '#ffffff',
    fontSize: 24,
    marginBottom: 10
  },
  subtext: {
    color: '#cccccc',
    fontSize: 14,
    marginBottom: 10
  },
  source: {
    color: '#888888',
    fontSize: 12,
    textAlign: 'center'
  }
});
export default VLCPlayerSimple;
//# sourceMappingURL=VLCPlayerSimple.js.map