const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjector = require('html-webpack-injector');
const WebpackConcatPlugin = require('webpack-concat-files-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    app: './src/app.js',
    _head: './src/head.js',
  },
  plugins: [
    new Dotenv({
      systemvars: true,
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/images", to: "images" },
        { from: "./src/assets", to: "assets" },
        { from: "./src/util", to: "util" },
        { from: "./src/js", to: "js" },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'VR Podcast Universe',
      template: './src/index.html',
      chunks: ["app", "_head"],
      chunksConfig: {
        async: ["app"],
        defer: [],
      }
    }),
    new WebpackConcatPlugin({
      bundles: [
        {
          dest: './dist/components.min.js',
          src: './src/components/**/*.js',
        },
      ],
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackInjector(),
  ],
  // watch: true,
  // watchOptions: {
  //   ignored: /node_modules/,
  // },
  // resolve: {
  //   alias: {
  //     process: "process/browser"
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        type: 'file?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
    ],
  },
  output: {
    filename: '[name].bundle.[fullhash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};