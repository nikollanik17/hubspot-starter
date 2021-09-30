const path = require('path');
const webpack = require('webpack');
const sass = require('node-sass');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const SassGlobbing = require('sass-globbing');
function buildConfig (configDirs) {
    return {
        mode: 'development',
        entry: {
            main: configDirs.APP_DIR + '/index.js'
        },
        output: {
            filename: 'assets/js/[name].bundle.js',
            path: configDirs.BUILD_DIR,
            publicPath: '/build/assets/js'
        },
        devtool: 'inline-source-map',
        devServer: {
            contentBase: path.resolve(__dirname, '../build'),
            compress: true,
        },
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader',
                    options: {
                        formatter: require('semistandard'),
                        configFile: '.eslintrc.js'
                    }
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'resolve-url-loader',
                        options: {
                            sourceMap: true,
                            engine: 'postcss',
                            keepQuery: true

                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sourceMapContents: false
                        }
                    }
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|woff(2)?|ttf|eot|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]',
                                context: 'src/assets',
                                outputPath: 'assets',
                                publicPath: '../',
                                useRelativePaths: true
                            }
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65
                                },
                                pngquant: {
                                    quality: '65-90',
                                    speed: 4
                                },
                                bypassOnDebug: true,
                                enforce: 'pre',
                                name: '[path][name].[ext]',
                                context: 'src/assets',
                                fallback: 'file-loader',
                                outputPath: 'assets'
                            }
                        }
                    ]
                }
            ]
        },
        externals: {
            jquery: 'jQuery',
            gsap: 'gsap',
            swiper: 'Swiper',
        },
        optimization: {
            minimizer: []
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'assets/css/[name].css',
                chunkFilename: '[id].css'
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
            })
        ],
        stats: {
            colors: true,
            modules: true,
            reasons: true,
            errorDetails: true,
            warnings: true
        }
    };
}

module.exports = buildConfig;
