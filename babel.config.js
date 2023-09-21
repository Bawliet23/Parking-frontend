module.exports = api => {
  api.cache(false);
  const presets = ['module:metro-react-native-babel-preset'];
  const plugins = [
    'nativewind/babel',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
  ];
  return {
    presets,
    plugins,
  };
};
