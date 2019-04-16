const path = require('path')
const webpack = require('webpack')

const ENV = 'umd'

module.exports = {
  devtool: '#inline-source-map',
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, '../bundles'),
    publicPath: '/',
    filename: 'angular-custom-tour.umd.min.js',
    libraryTarget: 'umd',
    library: 'angular-custom-tour'
  },
  // require those dependencies but don't bundle them
  externals: [/^\@angular\//, /^rxjs\//],
  module: {
    rules: [{
      test: /\.ts$/,
      use: [
        'ts-loader',
        'angular2-template-loader'
      ],
      exclude: [/\.(spec|e2e)\.ts$/]
    },
      // See: https://github.com/webpack/raw-loader
    {
      test: /\.html$/,
      use: 'raw-loader',
      exclude: [path.resolve(__dirname, 'server/index.html')]
    },
    {
      test: /\.css$/,
      use: 'raw-loader'
    }]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(@angular|esm5)/,
      path.resolve(__dirname, '../src')
    ),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,

      mangle: {
        screw_ie8: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ]
}
