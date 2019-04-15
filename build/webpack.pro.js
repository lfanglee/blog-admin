'use strict';

const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base');
const config = require('./config');

module.exports = merge(baseConfig, {
    mode: 'production',
    output: {
        path: config.pro.outputPath,
        publicPath: config.pro.outputPublicPath
    },
    plugins: [
        new HtmlWebpackPlugin({
            // favicon: path.resolve(__dirname, '../favicon.ico'),
            filename: 'index.html',
            template: path.resolve(__dirname, '../public/index.html'),
            title: 'blog-admin',
            inject: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:7].css'
        }),
        new CleanWebpackPlugin()
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    compress: {
                        warnings: false
                    }
                }
            }),
            new optimizeCssAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    reduceIdents: false,
                    autoprefixer: false
                }
            })
        ]
    }
});