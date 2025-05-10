const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  const { transformer, resolver } = config;

  // ✅ תמיכה בקבצי SVG
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
  };

  // ✅ הכללה של סוגי קבצים נוספים
  config.resolver.assetExts.push('png', 'jpg', 'jpeg', 'gif', 'webp');

  // ✅ הכללה של תיקיית assets שלך
  config.watchFolders = [...(config.watchFolders || []), './assets'];

  // ✅ תמיכה בקבצי CJS – חשוב ל־Firebase v11+ ב-SDK 53
  config.resolver.sourceExts.push('cjs');
  config.resolver.unstable_enablePackageExports = false;

  return config;
})();
