module.exports = {
  dependencies: {
    'react-native-vlc-pro': {
      platforms: {
        android: {
          sourceDir: '../node_modules/react-native-vlc-pro/android',
          packageImportPath: 'import com.vlcpro.VLCPlayerPackage;',
        },
        ios: {
          podspecPath: '../node_modules/react-native-vlc-pro/react-native-vlc-pro.podspec',
        },
      },
    },
  },
}; 