const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'whistle.js',
    path: path.join(__dirname, 'dist'),
    library: 'Whistle',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ],
    postLoaders: [
      {
        test: /\.js$/,
        loader: 'es3ify-loader'
      }
    ]
  },
  externals: {
    'react': {
      umd: 'react',
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      umd: 'react-dom',
    },
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      }
    })
  ]
};
