'use strict'; // eslint-disable-line

import webpack from 'webpack';
import path from 'path';
const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv === 'development';

// Setting webpack config
module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-eval-source-map' : 'hidden-source-map',
  context: path.join(process.cwd()),
  entry: ['axios', 'lodash'],
  output: {
    path: path.join(process.cwd(), './public/assets'),
    publicPath: '/assets/',
    // Don't use chunkhash in development it will increase compilation time
    filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDev ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
    pathinfo: isDev,
  },
  resolve: {
    modules: ['src', 'node_modules'],
  },
};
