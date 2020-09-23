const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',

    entry: {
        main: './src/index.js'
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname,'dist')
    }, 
    devServer: {
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin(), // 生成html文件
        new webpack.HotModuleReplacementPlugin()
    ]

}