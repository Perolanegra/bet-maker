const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../dist/bet-back'),
  },
  resolve: {
    alias: {
      '@domain': join(__dirname, 'src/domain'),
      '@application': join(__dirname, 'src/application'),
      '@infrastructure': join(__dirname, 'src/infrastructure'),
      '@shared': join(__dirname, 'src/shared'),
    },
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: [],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
  ],
};
