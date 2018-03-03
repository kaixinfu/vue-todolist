const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin')//将非js的代码单独打包成一个单独的静态资源文件

const isDve = process.env.NODE_ENV === 'development';

const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(jpg|gif|jpeg|svg|png)$/,
                use: [
                    {
                        loader: 'url-loader',//把图片转base64  直接写在js里面  减少http请求
                        options: {
                            limit: 1024,
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDve ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
}

if (isDve) {
    config.module.rules.push({
        test: /\.styl/,
        use:[
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap:true
                }
            },
            'stylus-loader'
        ]
    })
    config.devtool = '#cheap-module-eval-source-map';
    config.devServer = {
        port: 9000,
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        hot: true
        // historyFallback: {
        //
        // }
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NodeEnvironmentPlugin()
    )
} else {
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push({
        test: /\.styl/,
        use:ExtractPlugin.extract({
            fallback: 'style-loader',
            use:[
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap:true
                    }
                },
                'stylus-loader'
            ]
        })
    })
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css')
    )
}

module.exports = config