'use strict';

const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base');
const config = require('./config');

module.exports = merge(baseConfig, {
    mode: 'production',
    output: {
        filename: 'js/[name].[chunkhash].js',
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
            },
            mode: 'production'
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
                default: false,
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
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
