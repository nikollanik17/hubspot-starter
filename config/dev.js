const path = require('path');

module.exports = function(configDirs) {
    let prodConfig = Object.assign({}, require('./common')(configDirs));

    prodConfig.devtool = 'inline-source-map';
    prodConfig.output.publicPath = '/';
    prodConfig.devServer.contentBase = path.resolve(__dirname, '../');

    console.log('\x1b[36m%s\x1b[0m', 'Building for development ...');

    return prodConfig;
};
