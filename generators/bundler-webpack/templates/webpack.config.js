const path = require('path');
const webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
  },
  entry: {
    main: [
      'webpack-hot-middleware/client?reload=true',
      './src/js/main.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          }, 
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    })
  ],
  stats: 'minimal',
  devtool: 'cheap-module-eval-source-map',
  watch: true,
};
