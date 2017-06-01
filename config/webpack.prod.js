const path = require('path')
const commonConfig = require('./webpack.common.js')
const webpackMerge = require('webpack-merge')
const webpack = require('webpack')

const ENV = 'prod'

module.exports = webpackMerge(commonConfig, {
  devtool: '#source-map',
  output: {
    path: path.resolve(__dirname, '../docs'),
    publicPath: './',
    filename: '[name].[hash].js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[id].[hash].js'
  },
  plugins: [

  ]
})
