/*
* @Author: Shusheng Shi
* @Date:   2017-08-30 18:38:59
* @Last Modified by:   Shusheng Shi
* @Last Modified time: 2017-08-31 20:22:49
*/
var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//��������������, dev / online
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);
// ��ȡhtml-webpack-plugin�����ķ���     ����Ĳ���Ϊҳ����,���ڽ�������Ⱦ��ȥ
var getHtmlConfig = function(name) {
    return {
         template : './src/view/'+name+'.html',
            filename : 'view/'+name+'.html',
            inject   : true,
            hash     : true,
            chunks   : ['common',name]
    };
}

// webpack config
var config = {
 entry: {
    'common':['./src/page/common/index.js'],
    'index' : ['./src/page/index/index.js'],
    'login' : ['./src/page/login/index.js'],
 },
 output: {
    // ����ļ���·��
    path: './dist',
    // �����ļ���·��
    publicPath : '/dist',
    filename: 'js/[name].js'
 },
 externals : {
    'jquery' : 'window.jQuery'
 },
 module: {
    loaders: [
        { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
        // ͼƬ���崦��   �������ƴ�С���涨�ļ���
        { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' }
    ]
 },
 /*resolve : {
    alias : {
        util        : __dirname + '/src/util'
        page        : __dirname + '/src/page'
        service     : __dirname + '/src/service'
        image       : __dirname + '/src/image'
    }
 }*/
 plugins: [
    // ����ͨ��ģ�鵽js/base.js
    new webpack.optimize.CommonsChunkPlugin({
        name : 'common',
        filename : 'js/base.js' 
    }),
    // ��css����������ļ���
    new ExtractTextPlugin("css/[name].css"),
    // htmlģ��Ĵ���
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login')),
    
 ]
};

if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http:localhost:8088/');
}

module.exports = config;