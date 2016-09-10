var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
 
    entry: './app/index.js',

    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },

    // module: {
    //     loaders: [
    //         { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    //     ]
    // },

    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.html',
            inject: 'body',
        })
    ],
};
