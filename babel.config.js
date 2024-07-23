module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'transform-inline-environment-variables',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@apis': './src/apis',
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@libs': './src/libs',
          '@models': './src/models',
          '@navigators': './src/navigators',
          '@screens': './src/screens',
          '@styles': './src/styles',
          '@types': './src/types',
          '@utils': './src/utils',
        },
      },
    ],
    'nativewind/babel',
  ],
};
