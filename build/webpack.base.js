'use strict';

const scriptLoaders = require('./rules/scriptLoaders');
const styleLoaders = require('./rules/styleLoades');
const fileLoaders = require('./rules/fileLoaders');

const { resolve } = require('./utils');

module.exports = {
    entry: {
        app: '@/index.tsx'
    },
    output: {
        path: resolve('dist'),
        filename: 'js/[name].[hash].js'
    },
    module: {
        rules: [
            ...scriptLoaders,
            ...styleLoaders,
            ...fileLoaders
        ]
    },
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
        }
    },
    resolve: {
        extensions: ['.tsx', '.jsx', '.ts', '.js', '.json'],
        alias: {
            '@': resolve('src')
        }
    }
};
