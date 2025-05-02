module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          "@components": "./src/components",
          "@screens": "./src/screens",
          "@types": "./src/types",
          "@utils": "./src/utils"
        }
      }
    ],
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
    }],
    ['react-native-reanimated/plugin']
  ]
};
