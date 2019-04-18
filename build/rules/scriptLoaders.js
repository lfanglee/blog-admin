const { resolve } = require('../utils');

module.exports = [
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
                    cacheDirectory: resolve('.cache-loader')
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
