var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: './text',
    port: 8080
  },
    entry: [
    './source/js/app.js'
    ],
    output: {
        path: __dirname + '/build',
        filename:'boundle.js',
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', 'less']
    },
    module: {
        loaders: [
            {
                test:/\.js[x]?$/,
                include: path.resolve(__dirname, 'source/js'),
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                },
                loader: 'babel'
            },
            {
                test:/\.less$/, 
                include: path.resolve(__dirname, 'source/css'),
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader')
            },
            {
                test: /\.(woff)|(eot)|(svg)|(ttf)$/,
                include: path.resolve(__dirname, 'source/fonts'),
                exclude: /node_modules/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new ExtractTextPlugin("main.css")
    ]
}