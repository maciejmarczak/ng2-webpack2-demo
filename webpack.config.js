const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = function(env) {
    const srcDir = path.resolve(__dirname, './src');
    const distDir = path.resolve(__dirname, './dist');

    return {
        context: srcDir,
        entry: {
            app: './main.ts',
            vendors: './vendors.ts'
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: distDir
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [
                        'ts-loader',
                        'angular2-template-loader'
                    ]
                },
                {
                    test: /\.html$/,
                    use: 'html-loader'
                },
                {
                    test: /\.scss$/,
                    use: [
                        'to-string-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.ts']
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendors', 'manifest']
            })
        ],
        devServer: {
            contentBase: distDir
        }
    }
};