const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');
const meta = {
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  description: 'PWA Demo 2019',
};

module.exports = {
  entry: {
    main: './src/index.js',
    listPage: './src/ListPage/index.js',
    detailPage: './src/DetailPage/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: dist,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'PWA Demo 2019 - Main Page',
      chunks: ['main'],
      filename: 'index.html',
      template: './src/index.html',
      meta,
    }),
    new HtmlWebpackPlugin({
      title: 'PWA Demo 2019 - List Page',
      chunks: ['listPage'],
      filename: 'list/index.html',
      template: './src/ListPage/index.html',
      meta,
    }),
    new HtmlWebpackPlugin({
      title: 'PWA Demo 2019 - Detail Page',
      chunks: ['detailPage'],
      filename: 'detail/index.html',
      template: './src/DetailPage/index.html',
      meta,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|gltf|bin|obj|mtl)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            },
          },
        ]
      },
    ]
  },
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    contentBase: dist,
  }
};