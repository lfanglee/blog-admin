const path = require('path');

module.exports = {
    dev: {
        env: 'development',
        outputPath: path.resolve(__dirname, '../dist'),
        outputPublicPath: '/',

        host: 'http://127.0.0.1',
        port: 3000,
        autoOpenBroswer: false,    // 开启在有的电脑上可能出现spawn eacces 错误，权限问题
        useEslint: true
    },
    pro: {
        env: '"production"',
        outputPath: path.resolve(__dirname, '../dist'),
        outputPublicPath: './'
    }
};
