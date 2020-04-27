
const cssnano = require('cssnano');
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  plugins: [
    // 压缩css
    new OptimizeCSSAssetsPlugin({
      assetNameRegExg: /\.css$/g,
      cssProcessor: cssnano,
    }),
    // 将引入的依赖排除掉，减少打包后的文件体积
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://unpkg.com/react@16/umd/react.development.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://unpkg.com/react-dom@16/umd/react-dom.development.js',
          global: 'ReactDOM',
        },
      ],
    }),
  ],
  // 提取公共资源
  optimization: {
    splitChunks: {
      minSize: 0, // 引用资源超过该大小则提取
      cacheGroups: {
        commons: {
          name: 'commons', // 生成的文件名
          chunks: 'all',
          minChunks: 2, // 引用2次以上就提取出来
        },
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);
