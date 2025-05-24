"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * Composant TrackSelector pour react-native-vlc-pro
 * Phase 2, Semaine 6 : Gestion des pistes audio/sous-titres
 */

const {
  width: screenWidth,
  height: screenHeight
} = _reactNative.Dimensions.get('window');
const TrackSelector = ({
  audioTracks,
  subtitleTracks,
  selectedAudioTrack,
  selectedSubtitleTrack,
  visible,
  theme = 'dark',
  customTheme,
  onAudioTrackSelect,
  onSubtitleTrackSelect,
  onClose
}) => {
  const [activeTab, setActiveTab] = (0, _react.useState)('audio');
  const styles = getStyles(theme, customTheme);
  const handleAudioTrackSelect = trackId => {
    onAudioTrackSelect?.(trackId);
    onClose?.();
  };
  const handleSubtitleTrackSelect = trackId => {
    onSubtitleTrackSelect?.(trackId);
    onClose?.();
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    visible: visible,
    transparent: true,
    animationType: "slide",
    onRequestClose: onClose
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.overlay
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.header
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.title
  }, "S\xE9lection des pistes"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.closeButton,
    onPress: onClose,
    accessible: true,
    accessibilityLabel: "Fermer",
    accessibilityRole: "button"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.closeButtonText
  }, "\u2715"))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.tabContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: [styles.tab, activeTab === 'audio' && styles.activeTab],
    onPress: () => setActiveTab('audio'),
    accessible: true,
    accessibilityLabel: "Pistes audio",
    accessibilityRole: "tab"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.tabText, activeTab === 'audio' && styles.activeTabText]
  }, "Audio (", audioTracks.length, ")")), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: [styles.tab, activeTab === 'subtitle' && styles.activeTab],
    onPress: () => setActiveTab('subtitle'),
    accessible: true,
    accessibilityLabel: "Sous-titres",
    accessibilityRole: "tab"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.tabText, activeTab === 'subtitle' && styles.activeTabText]
  }, "Sous-titres (", subtitleTracks.length, ")"))), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.content
  }, activeTab === 'audio' ?
  /*#__PURE__*/
  // Pistes audio
  _react.default.createElement(_reactNative.View, null, audioTracks.length === 0 ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.emptyText
  }, "Aucune piste audio disponible") : audioTracks.map(track => /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    key: track.id,
    style: [styles.trackItem, selectedAudioTrack === track.id && styles.selectedTrack],
    onPress: () => handleAudioTrackSelect(track.id),
    accessible: true,
    accessibilityLabel: `Piste audio: ${track.name || track.language || `Piste ${track.id}`}`,
    accessibilityRole: "button"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.trackInfo
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.trackName
  }, track.name || track.language || `Piste ${track.id}`), track.language && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.trackLanguage
  }, track.language), track.description && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.trackCodec
  }, track.description)), selectedAudioTrack === track.id && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.selectedIcon
  }, "\u2713")))) :
  /*#__PURE__*/
  // Pistes de sous-titres
  _react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: [styles.trackItem, selectedSubtitleTrack === -1 && styles.selectedTrack],
    onPress: () => handleSubtitleTrackSelect(-1),
    accessible: true,
    accessibilityLabel: "Aucun sous-titre",
    accessibilityRole: "button"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.trackInfo
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.trackName
  }, "Aucun sous-titre")), selectedSubtitleTrack === -1 && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.selectedIcon
  }, "\u2713")), subtitleTracks.length === 0 ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.emptyText
  }, "Aucune piste de sous-titres disponible") : subtitleTracks.map(track => /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    key: track.id,
    style: [styles.trackItem, selectedSubtitleTrack === track.id && styles.selectedTrack],
    onPress: () => handleSubtitleTrackSelect(track.id),
    accessible: true,
    accessibilityLabel: `Sous-titre: ${track.name || track.language || `Piste ${track.id}`}`,
    accessibilityRole: "button"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.trackInfo
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.trackName
  }, track.name || track.language || `Piste ${track.id}`), track.language && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.trackLanguage
  }, track.language), track.encoding && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.trackCodec
  }, track.encoding)), selectedSubtitleTrack === track.id && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.selectedIcon
  }, "\u2713"))))))));
};
const getStyles = (theme, customTheme) => {
  const isDark = theme === 'dark';
  const isCustom = theme === 'custom' && customTheme;
  return _reactNative.StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center'
    },
    container: {
      width: screenWidth * 0.9,
      maxHeight: screenHeight * 0.8,
      backgroundColor: isCustom ? customTheme?.backgroundColor || 'rgba(0, 0, 0, 0.95)' : isDark ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      borderRadius: isCustom ? customTheme?.borderRadius || 10 : 10,
      overflow: 'hidden'
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isCustom ? customTheme?.textColor || 'white' : isDark ? 'white' : 'black'
    },
    closeButton: {
      padding: 5,
      borderRadius: 15,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      minWidth: 30,
      alignItems: 'center'
    },
    closeButtonText: {
      fontSize: 16,
      color: isCustom ? customTheme?.textColor || 'white' : isDark ? 'white' : 'black'
    },
    tabContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
    },
    tab: {
      flex: 1,
      paddingVertical: 15,
      alignItems: 'center',
      backgroundColor: 'transparent'
    },
    activeTab: {
      backgroundColor: isCustom ? customTheme?.buttonColor || 'rgba(33, 150, 243, 0.2)' : 'rgba(33, 150, 243, 0.2)',
      borderBottomWidth: 2,
      borderBottomColor: isCustom ? customTheme?.progressColor || '#2196F3' : '#2196F3'
    },
    tabText: {
      fontSize: 14,
      color: isCustom ? customTheme?.textColor || 'white' : isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
    },
    activeTabText: {
      color: isCustom ? customTheme?.progressColor || '#2196F3' : '#2196F3',
      fontWeight: '600'
    },
    content: {
      flex: 1,
      padding: 10
    },
    trackItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      marginVertical: 2,
      borderRadius: 8,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
    },
    selectedTrack: {
      backgroundColor: isCustom ? customTheme?.buttonColor || 'rgba(33, 150, 243, 0.2)' : 'rgba(33, 150, 243, 0.2)',
      borderWidth: 1,
      borderColor: isCustom ? customTheme?.progressColor || '#2196F3' : '#2196F3'
    },
    trackInfo: {
      flex: 1
    },
    trackName: {
      fontSize: 16,
      fontWeight: '500',
      color: isCustom ? customTheme?.textColor || 'white' : isDark ? 'white' : 'black',
      marginBottom: 2
    },
    trackLanguage: {
      fontSize: 14,
      color: isCustom ? customTheme?.textColor || 'white' : isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
      marginBottom: 2
    },
    trackCodec: {
      fontSize: 12,
      color: isCustom ? customTheme?.textColor || 'white' : isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
      fontFamily: 'monospace'
    },
    selectedIcon: {
      fontSize: 18,
      color: isCustom ? customTheme?.progressColor || '#2196F3' : '#2196F3',
      fontWeight: 'bold'
    },
    emptyText: {
      textAlign: 'center',
      fontSize: 16,
      color: isCustom ? customTheme?.textColor || 'white' : isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
      marginTop: 20,
      fontStyle: 'italic'
    }
  });
};
var _default = exports.default = TrackSelector;
//# sourceMappingURL=TrackSelector.js.map