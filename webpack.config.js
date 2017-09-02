/*
* @Author: Shusheng Shi
* @Date:   2017-08-30 18:38:59
* @Last Modified by:   Shusheng Shi
* @Last Modified time: 2017-08-31 20:22:49
*/
var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量的配置, dev / online
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);
// 获取html-webpack-plugin参数的方法     传入的参数为页面名,用于将参数渲染回去
var getHtmlConfig = function (name, title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    };
};

// webpack config
var config = {
    entry: {
        'common'    :['./src/page/common/index.js'],
        'index'     : ['./src/page/index/index.js'],
        'login'     : ['./src/page/login/index.js'],
        'result'    : ['./src/page/result/index.js'],
    },
    output: {
        // 存放文件的路径
        path: './dist',
        // 访问文件的路径
        publicPath : '/dist',
        filename: 'js/[name].js'
    },
    externals : {
        'jquery' : 'window.jQuery'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            // 图片字体处理   参数限制大小及规定文件名
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader'}
        ]
    },
    resolve : {
        alias : {
            node_modules       : __dirname + '/node_modules',
            util               : __dirname + '/src/util',
            page               : __dirname + '/src/page',
            service            : __dirname + '/src/service',
            image              : __dirname + '/src/image'

        }
    },
    plugins: [
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
    ]
};

if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http:localhost:8088/');
}

module.exports = config;