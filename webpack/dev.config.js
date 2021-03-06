const webpack = require('webpack');
const merge = require('webpack-merge').smart;

const PATHS = require('./paths.js')
const common = require('./common.config.js')

module.exports = merge({
  devtool: 'inline-source-maps',

  devServer: {
    contentBase: PATHS.build,
    host: '0.0.0.0',
    port: 8000,
    inline: true,
    hot: true,
    stats: 'errors-only',
    historyApiFallback: {
      index: 'index.html'
    },
    watchOptions: { poll: true, ignored: /node_modules/ },
    proxy: {
      '/api': {
        target: 'http://localhost:8080/api',
        secure: false,
        pathRewrite: {
          '/api' : ''
        }
      }
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify('development')
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}, common)
