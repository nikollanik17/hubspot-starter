const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function(configDirs) {
    var prodConfig = Object.assign({}, require('./common')(configDirs));

    prodConfig.devtool = '';
    prodConfig.devServer.compress = true;

    prodConfig.optimization.minimizer.push(
        new TerserPlugin(),
        new OptimizeCssAssetsPlugin({})
    );

    prodConfig.plugins.push(
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        })
    );

    console.log('\x1b[36m%s\x1b[0m', 'Building for production ...');

    return prodConfig;
};
