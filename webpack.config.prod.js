/* eslint-disable max-len */
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import WebpackBar from 'webpackbar'
import project from './config/project'
import site from './config/site'
import SetVersionPlugin from './tools/webpackPlugins/setVersion'
import repoInfo from './tools/getRepoInfo'
import TerserPlugin from 'terser-webpack-plugin'

const pathResolve = (dir) => path.resolve(__dirname, dir)
const px2vw = !!project.viewportWidth

// process.env.NODE_ENV = 'development'
const GLOBALS = {
  ...project.globals,
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.RUNTIME_ENV': JSON.stringify(process.env.RUNTIME_ENV),
  __DEV__: false,
}

module.exports = {
  stats: 'errors-only',
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx', '.json'],
    // To support react-hot-loader
    alias: {
      // 'react-dom': '@hot-loader/react-dom',
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
  devtool: false,
  // devtool: 'source-map',
  // devtool: 'cheap-module-source-map', // more info:https://webpack.js.org/guides/production/#source-mapping and https://webpack.js.org/configuration/devtool/
  entry: ['@babel/polyfill', pathResolve('src/index')],
  target: 'web',
  mode: 'production',
  // mode: 'development',
  output: {
    path: pathResolve('dist'),
    publicPath: '/',
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new SetVersionPlugin({
      version: project.globals.PROJECT_BUILD_VERSION,
      versionDirectory: pathResolve('src'),
      repoInfo,
    }),
    // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    new webpack.DefinePlugin(GLOBALS),
    // Generate an external css file with a hash in the filename
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),

    // Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      // favicon: 'src/assets/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      chunksSortMode: 'none',
      inject: true,
      // Note that you can add custom options here if you need to handle other custom logic in index.html
      // To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
      // trackJSToken: ''
    }),
    new webpack.BannerPlugin({
      banner: [project.buildTime, site.copyright].join('\n'),
    }),
    // new CleanWebpackPlugin()
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
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
              name: '[name].[ext]',
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
              name: '[name].[ext]',
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
              name: '[name].[ext]',
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
          MiniCssExtractPlugin.loader,
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
  optimization: {
    splitChunks: {
      // 默认打包node_modules到venders.js
      chunks: 'all',
      // cacheGroups: {
      //   // 将带bg的页面打包到一处，避免多次闪动
      //   fullbgPage: {
      //     name: 'fullbgPage',
      //     chunks: 'all',
      //     minChunks: 1,
      //     test: /(signupBase64|LoginPage|VerificationAccount|resetPassword\/index|signup\/index)\.js/,
      //     priority: 1,
      //     minSize: 0
      //   }
      // }
    },
    // 将webpack运行时生成代码打包到runtime.js
    runtimeChunk: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false, // 不将注释提取到单独的文件中
      }),
    ],
  },
}
