"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Composant VLCPlayer simple pour test d'import
 */

const VLCPlayerSimple = props => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, props.style]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.text
  }, "\uD83C\uDFAC VLC Player Simple"), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.subtext
  }, "Module natif en cours de d\xE9veloppement"), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.source
  }, "Source: ", props.source?.uri || 'Aucune'));
};
const styles = _reactNative.StyleSheet.create({
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
var _default = exports.default = VLCPlayerSimple;
//# sourceMappingURL=VLCPlayerSimple.js.map