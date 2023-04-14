module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@app': './app',
          '@feature': './app/features',
          '@component': './app/components',
          '@container': './app/containers',
          '@config': './app/config',
          '@api': './app/config/api.ts',
          '@type': './app/types',
          '@helpers': './app/helpers',
          '@navigation': './app/navigations/NavigationService.ts',
        },
      },
    ],
  ],
};
