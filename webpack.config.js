const path = require('path')
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const NODE_ENV = process.env.NODE_ENV

const webpackConfig = {
    mode: NODE_ENV == 'production' ? 'production' : 'development',
    // entry: {main:"./src/index.js"},
    // entry: "./src/index.js",
    entry: ["babel-polyfill","./src/index.js"],
    output: {
        path: path.resolve(__dirname, './'),
        publicPath: "/",
        filename: 'build/index.js'
    },
    module: {
        rules: [{
            test: /\.(jsx|js)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: "babel-loader"
            }
        }, {
            test: /\.css$/,
            exclude: '/node_modules/',
            use: ['style-loader', 'css-loader'],
        }, {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'build/images/[name].[hash:8].[ext]', // 放在文件夹的路径及命名
                }
            }]
        }]
    },
    optimization: {},
    resolve: {
        extensions: ['.js', '.vue', '.css'],
        alias: {}
    },
    plugins: [new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, './build/index.html'),
        template: path.resolve(__dirname, './src/index.html'),
        chunks: ['main'],
        chunksSortMode: 'manual',
        inject: 'body',
    })]
}
/*测试*/
if (NODE_ENV == 'development') {
    webpackConfig.devServer = {
        host: '0.0.0.0',
        useLocalIp: true,
        contentBase: path.resolve(__dirname, './build/'),
        port: 8081,
        compress: true,
        open: true,
        openPage : 'index.html',
        inline: true
    };
    webpackConfig.devtool = 'cheap-module-eval-source-map';
}

module.exports = webpackConfig;
