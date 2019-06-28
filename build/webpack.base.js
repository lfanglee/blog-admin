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
        filename: 'js/[name].[chunkhash].js'
    },
    module: {
        rules: [
            ...scriptLoaders,
            ...styleLoaders,
            ...fileLoaders
        ]
    },
    externals: {
        react: 'window.React',
        'react-dom': 'window.ReactDOM'
    },
    resolve: {
        extensions: ['.tsx', '.jsx', '.ts', '.js', '.json'],
        alias: {
            '@': resolve('src')
        }
    },
    stats: {
        // warn => /Conflicting order between:/gm.test(warn)
        warningsFilter: warn => !~warn.indexOf('Conflicting order between') // if true will ignore
    }
};
