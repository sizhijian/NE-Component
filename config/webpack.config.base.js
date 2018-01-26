const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

const cwd = process.cwd()
const nodeModulePath = path.join(cwd, 'node_modules')

const webpackConfig = {
  output: {
    path: path.join(cwd, './'),
    filename: '[name]-[hash:8].js',
    chunkFilename: '[name]-[chunkhash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss']
  },
  devtool: 'source-map',
  context: cwd,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(jpeg|jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'images/[path][name].[ext]',
            context: path.resolve(cwd, 'examples/assets/images'),
            hash: '[hash:8]'
          }
        }
      },
      {
        test: /\.(ttf|woff|woff|eot|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240,
            name: 'font/[name].[ext]',
            context: path.resolve(cwd, 'examples/assets/font'),
            hash: '[hash:8]'
          }
        }
      }
    ]
  }
}

module.exports = webpackConfig
