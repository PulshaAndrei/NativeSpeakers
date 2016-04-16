var webpack = require("webpack");

module.exports = {
  entry: './index.js',

  output: {
    filename: 'bundle.js',
    publicPath: '',
    path: './'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.optimize.UglifyJsPlugin({ output: {comments: false} })
  ]
}

