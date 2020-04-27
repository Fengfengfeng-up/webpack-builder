
// 通过webapck-merge插件实现将模块化的配置合并
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  plugins: [
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'errors-only',
  },
  // devtool: 'source-map' // 开启source-map 方便调试
  devtool: 'cheap-source-map', // 报错定位到行
};

module.exports = merge(baseConfig, devConfig);
