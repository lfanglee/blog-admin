const { resolve } = require('../utils');

const cacheLoader = {
    loader: 'cache-loader',
    options: {
        cacheDirectory: resolve('.cache-loader')
    }
};

module.exports = {
    cacheLoader
};
