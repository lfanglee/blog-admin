'use strict';

const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
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
        hot: true,
        historyApiFallback: true,
        disableHostCheck: true, //  新增该配置项
        proxy: {
            '/api': {
                target: `http://${config.dev.host}:${config.dev.port}/mock`,
                pathRewrite: (_path, req) => {
                    const realUrl = req.url.split('?')[0];
                    const reqMethod = req.method;

                    if (req.method !== 'GET') {
                        req.method = 'GET';
                    }
                    if (!path.extname(realUrl)) {
                        req.url = `${realUrl}.json`;
                    }
                    req.url = req.url.replace(/\/api/, `/${reqMethod}`);
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
            inject: true,
            mode: 'development'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:7].css'
        }),
        new FilterWarningsPlugin({
            exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
        }),
        new FilterWarningsPlugin({
            exclude: /Cannot find SourceMap/,
        })
    ]
});
