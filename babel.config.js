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
    ]
  ]
};
