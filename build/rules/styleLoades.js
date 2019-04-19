const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { cacheLoader } = require('./loaders');
const { resolve } = require('../utils');
const theme = require('../../theme');

const baseLoaders = () => {
    return [
        MiniCssExtractPlugin.loader,
        cacheLoader,
        'css-loader',
        'postcss-loader'
    ];
};

module.exports = [
    {
        test: /\.css$/,
        use: baseLoaders()
    },
    {
        test: /\.scss$/,
        use: [...baseLoaders(), 'sass-loader'],
        include: [resolve('src')]
    },
    {
        test: /\.less$/,
        use: [...baseLoaders(), {
            loader: 'less-loader',
            options: {
                javascriptEnabled: true,
                modifyVars: theme
            }
        }],
        include: [resolve('node_modules')]
    }
];
