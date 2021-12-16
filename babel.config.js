const ModuleResolverPlugin = [
  'module-resolver',
  {
    root: ['./src'],
    extensions: ['.js', '.jsx', '.ios.js', '.android.js', '.json'],
    alias: {},
  },
];

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [ModuleResolverPlugin],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
