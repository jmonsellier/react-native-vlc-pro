const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  watchFolders: [
    path.resolve(__dirname, '..'),
  ],
  resolver: {
    alias: {
      'react-native-vlc-pro': path.resolve(__dirname, '..'),
    },
  },
};

module.exports = mergeConfig(defaultConfig, config); 