const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const config = require('config');

module.exports = {
  devtool: 'source-map',
  entry: ['./src/front/index.js', 'pdfjs-dist/build/pdf.worker.entry'],
  output: {
    path: `${__dirname}/public`,
    filename: 'javascripts/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    modules: ['node_modules'],
    alias: {
      vue: 'vue/dist/vue.common.js'
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '',
    noInfo: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new VueLoaderPlugin(),
    new webpack.EnvironmentPlugin({
      API_URL: config.get('apiHost')
    })
  ]
};
