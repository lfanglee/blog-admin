const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { cacheLoader } = require('./loaders');
const { resolve } = require('../utils');

const baseLoaders = () => {
    return [
        MiniCssExtractPlugin.loader,
        cacheLoader,
        'css-loader',
        'postcss-loader'
    ];
}

module.exports = [
    {
        test: /\.css$/,
        use: baseLoaders()
    },
    {
        test: /\.scss$/,
        use: [...baseLoaders(), 'sass-loader'],
        include: [resolve('src')]
    }
];
