import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const IS_PROD: boolean = process.argv.indexOf('-p') > -1;
const OPEN_WEATHER_MAP_API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY;

export default {
  devtool: IS_PROD ? 'source-map' : 'eval',
  entry: path.join(__dirname, 'demo', 'entry.ts'),
  output: {
    filename: IS_PROD ? '[name]-[chunkhash].js' : '[name].js'
  },
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'prettier-loader',
      exclude: /node_modules/,
      enforce: 'pre',
      options: {
        singleQuote: true,
        parser: 'typescript'
      }
    }, {
      test: /\.ts$/,
      loader: 'tslint-loader',
      exclude: /node_modules/,
      enforce: 'pre'
    }, {
      test: /\.ts$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      options: {
        transpileOnly: !IS_PROD
      }
    }]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    port: 3001,
    inline: true,
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    ...(IS_PROD ? [] : [
      new webpack.HotModuleReplacementPlugin(),
      new ForkTsCheckerWebpackPlugin({
        watch: ['./src', './demo']
      })
    ]),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(IS_PROD ? 'production' : 'development'),
      OPEN_WEATHER_MAP_API_KEY: JSON.stringify(OPEN_WEATHER_MAP_API_KEY)
    }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.join(__dirname, 'src')
    ),
    new webpack.ContextReplacementPlugin(/\@angular\b.*\b(bundles|linker)/, path.join(__dirname, 'src')), // Workaround for https://github.com/angular/angular/issues/11580
    new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, path.join(__dirname, 'src')), // Workaround for https://github.com/angular/angular/issues/14898
    new webpack.ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/, path.join(__dirname, 'src')), // Workaround for https://github.com/angular/angular/issues/20357
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'demo', 'index.ejs')
    })
  ]
};
