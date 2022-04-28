const ModuleResolverPlugin = [
  'module-resolver',
  {
    root: ['./src'],
    extensions: ['.js', '.jsx', '.ios.js', '.android.js', '.json'],
    alias: {
      '@config': './src/config',
      '@components': './src/components',
      '@i18n': './src/i18n',
      '@screens': './src/screens',
      '@theme': './src/theme',
      '@utils': './src/utils',
      '@assets': './src/assets',
      '@hooks': './src/hooks',
      '@store': './src/store',
      '@navigation': './src/navigation',
    },
  },
];

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [ModuleResolverPlugin],
  env: {
    production: {
      plugins: ['react-native-paper/babel', 'transform-remove-console'],
    },
  },
};
