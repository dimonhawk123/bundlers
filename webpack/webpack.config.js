const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

config = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),        
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use : {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }                
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                        MiniCssExtractPlugin.loader, 
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'sass-loader',
                        } 
                    ],
            },
            {
                test: /\.css$/,
                use: [
                        MiniCssExtractPlugin.loader, 
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'postcss-loader'
                        },
                    ],
            },
            {
                test: /\.(png|svg|jpg|jpeg)$/,
                use: ['file-loader']
            }
        ]        
    },
    optimization: {

    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        }),
        // new CopyWebpackPlugin([
        //     {
        //         from: '',
        //         to: ''
        //     }
        // ])
    ],
};

module.exports = (env, options) => {
    let isDev = options.mode === 'development';

    config.devtool = isDev ? 'source-map' : '';

    if (!isDev) {
        config.optimization.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config;
}