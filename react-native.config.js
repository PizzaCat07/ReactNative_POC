module.exports = {
  dependencies: {
    '@alentoma/react-native-selectable-text': {
      platforms: {
        android: null, // disable Android platform, other platforms will still autolink if provided,
      },
    },
    'react-native-sqlite-storage': {
      platforms: {
        android: {
          sourceDir:
            '../node_modules/react-native-sqlite-storage/platforms/android-native',
          packageImportPath: 'import io.liteglue.SQLitePluginPackage;',
          packageInstance: 'new SQLitePluginPackage()',
        },
      },
    },
  },
};
