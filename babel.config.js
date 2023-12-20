module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@interfaces': './src/interfaces',
          '@screens': './src/screens',
          '@router': './src/router',
        },
      },
    ],
  ],
}
