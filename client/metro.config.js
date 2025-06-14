/**
 * File: metro.config.js
 *
 * Purpose:
 * This configuration customizes the Metro bundler used by Expo.
 * It enables support for SVGs, images, CommonJS modules, and watches additional folders like `assets`.
 * This is especially important for Firebase SDK 11+ and using Expo SDK 53 or newer.
 */

const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  const { transformer, resolver } = config;

  // Enable support for importing SVG files as React components
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };

  config.resolver = {
    ...resolver,
    // Remove SVG from assetExts so it can be handled as a source file
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    // Add .svg as a source extension to be processed by the transformer
    sourceExts: [...resolver.sourceExts, 'svg'],
  };

  // Allow bundling additional image types
  config.resolver.assetExts.push('png', 'jpg', 'jpeg', 'gif', 'webp');

  // Include custom folders like `./assets` in the watch list
  config.watchFolders = [...(config.watchFolders || []), './assets'];

  // Add support for .cjs files (CommonJS), required by Firebase SDK v11+ with Expo SDK 53+
  config.resolver.sourceExts.push('cjs');

  // Disable unstable export handling to avoid module resolution issues with some packages
  config.resolver.unstable_enablePackageExports = false;

  return config;
})();
