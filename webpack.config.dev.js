/* eslint-disable max-len */
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import WebpackBar from 'webpackbar'
import project from './config/project'
import repoInfo from './tools/getRepoInfo'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

const pathResolve = (dir) => path.resolve(__dirname, dir)
const px2vw = !!project.viewportWidth

const GLOBALS = {
  ...project.globals,
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.RUNTIME_ENV': JSON.stringify(process.env.RUNTIME_ENV),
  __DEV__: true,
  REPO_INFO: JSON.stringify(repoInfo),
}

module.exports = {
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx', '.json'],
    // To support react-hot-loader
    alias: {
      'react-dom': '@hot-loader/react-dom',
      hooks: pathResolve('src/hooks'),
      actions: pathResolve('src/actions'),
      assets: pathResolve('src/assets'),
      components: pathResolve('src/components'),
      constants: pathResolve('src/constants'),
      pages: pathResolve('src/pages'),
      reducers: pathResolve('src/reducers'),
      styled: pathResolve('src/styled'),
      utils: pathResolve('src/utils'),
      config: pathResolve('config'),
      api: pathResolve('api'),
      lib: pathResolve('src/lib'),
      antd: pathResolve('src/components/antd/index.js'),
      _history: pathResolve('src/store/history.js'),
      ...(px2vw ? { 'styled-components': pathResolve('src/utils/styled-px2vw.js') } : {}),
    },
  },
  devtool: 'source-map',
  // devtool: 'cheap-module-eval-source-map', // more info:https://webpack.js.org/guides/development/#using-source-maps and https://webpack.js.org/configuration/devtool/
  entry: [
    // must be first entry to properly set public path
    // '@babel/polyfill',
    './src/webpack-public-path',
    'webpack-hot-middleware/client?reload=true',
    // Defining path seems necessary for this to work consistently on Windows machines.
    path.resolve(__dirname, 'src/index.js'),
  ],
  target: 'web',
  mode: 'development',
  output: {
    // Note: Physical files are only output by the production build task `npm run build`.
    path: pathResolve('dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    // new HardSourceWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockIntegration: 'whm',
      },
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      // Create HTML file that includes references to bundled CSS and JS.
      template: 'src/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      chunksSortMode: 'none',
      inject: true,
      // title: SITE.title
    }),
    new WebpackBar(),
  ],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: px2vw ? /node_modules\/(?!(styled-components)\/).*/ : /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: px2vw ? /node_modules\/(?!(styled-components)\/).*/ : /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: ['file-loader'],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
            },
          },
        ],
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/octet-stream',
            },
          },
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/svg+xml',
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 处理小于10kB的图片为base64
              limit: 81920,
              name: '[name]-[hash:5].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(txt|csv)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash:5].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(css|scss|sass)$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [pathResolve('src')],
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
}
