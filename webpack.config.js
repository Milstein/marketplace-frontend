const path = require('path');

var config = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    inline: true,
    port: 3000
 },
 module: {
  loaders: [
     {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
           presets: ['es2015', 'react']
        }
     }
    ]
  }
};

module.exports = config;