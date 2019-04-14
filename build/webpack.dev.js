'use strict';

const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.base');
const config = require('./config');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        // host: config.dev.host,
        port: config.dev.port,
        open: config.dev.autoOpenBroswer,
        inline: true,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: `${config.dev.host}:${config.dev.port}/mock`,
                pathRewrite: (_path, req) => {
                    const realUrl = req.url.split('?')[0];
                    if (!path.extname(realUrl)) {
                        req.url = realUrl + '.json';
                    }
                    req.url = req.url.replace(/\/api/, '');
                },
                secure: false
            }
        }
    },
    output: {
        path: config.dev.outputPath,
        publicPath: config.dev.outputPublicPath
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../public/index.html'),
            title: 'blog-admin',
            inject: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:7].css'
        })
    ]
});
