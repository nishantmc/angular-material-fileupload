var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  /* Providing the mode configuration option tells webpack to use its built-in optimizations accordingly.*/
  mode: 'development', 

  /* This option controls if and how source maps are generated. */
  devtool: 'cheap-module-eval-source-map',

  output: {
    /* The output directory as an absolute path. */
    path: helpers.root('dist'),

    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },

  /* Use the optimization.noEmitOnErrors to skip the emitting phase whenever there are errors 
  while compiling. This ensures that no erroring assets are emitted. The emitted flag in the 
  stats is false for all assets. */
  optimization: {
    noEmitOnErrors: true
  },

  module: {
    rules: [
        {
            test: /\.ts$/,
            loaders: [
                {
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: helpers.root('src/tsconfig.app.json')
                    }
                },
                'angular2-template-loader'
            ],
            exclude: [/node_modules/]
        }
    ]
},

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    disableHostCheck: true
  }
});
