const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    devtool: 'source-map',

    entry: {
        'index': './src/index.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.(gif|png|jpg|webp)$/g,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: './images',
                        publicPath: '../images',
                        limit: 100
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    // 'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            import: true
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            // 输入
            template: './template/index.html',
            // 输出，针对全局的 output.path
            filename: 'index.html',
            title: "开课吧"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: './css/[name].css'
        })
    ],

    devServer: {
        // 扩展的虚拟路径
        // contentBase: "../abc",
        // 自动开启浏览器
        // open: true,
        // 端口
        port: 8081,
        proxy: {
            '/api': {
                target: 'http://localhost:8787',
                pathRewrite: {
                    '^/api': '/kkb'
                }
            }
        },

        // 开启热更新
        hot:true,
        // 即使 HMR 不生效，也不去刷新整个页面(选择开启)
        hotOnly:true,
    }

}