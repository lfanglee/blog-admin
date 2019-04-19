const tsImportPluginFactory = require('ts-import-plugin');
const { resolve } = require('../utils');
const config = require('../config');

const createLintingRules = () => ({
    test: /\.(j|t)sx?$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: resolve('src')
});

module.exports = [
    ...(config.dev.useEslint ? [createLintingRules()] : []),
    {
        test: /\.jsx?$/,
        use: {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
                presets: ['@babel/env']
            }
        },
        include: resolve('src')
    },
    {
        test: /\.tsx?$/,
        use: [
            {
                loader: 'awesome-typescript-loader',
                options: {
                    useCache: true,
                    cacheDirectory: resolve('.cache-loader'),
                    getCustomTransformers: () => ({
                        before: [
                            tsImportPluginFactory({
                                libraryName: 'antd',
                                libraryDirectory: 'lib',
                                style: true
                            })
                        ]
                    })
                }
            }
        ],
        include: resolve('src')
    },
    {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader'
    }
];
