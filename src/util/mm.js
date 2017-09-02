/*
* @Author: Shusheng Shi
* @Date:   2017-08-30 21:36:42
* @Last Modified by:   Shusheng Shi
* @Last Modified time: 2017-08-31 21:41:21
*/
'use strict';
var Hogan = require('hogan');
var conf = {
    serverHost : ''
}

var _mm = {
    // 网络请求后端数据
    request : function(param){
        //暂存_mm对象
        var _this = this;
        // jquery的ajax实现
        $.ajax({
            type        : param.method || 'get',/*默认GET*/
            url         : param.url    || '',
            dataType    : param.type   ||  'json',
            data        : param.date   || '',
            success     : function(res){
                // 请求成功
                if (0 === res.status) {
                    // 若是fun,则回调,这样只有在status为0时,信息数据才会返回回去
                    typeof param.success === 'function' && param.success(res.data,res.msg)
                }
                // 未登录状态,需要强制登录
                else if (10 === res.status) {
                    _this.doLogin();
                }
                // 请求数据错误,只返回错误信息
                else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg)
                }

            },
            error       : function(err){
                typeof param.error === 'function' && param.error(err.statusText)
            } 
        });
    },
    // 获取服务器地址
    getServerUrl : function (path) {
        return conf.serverHost + path;
    },
    // 获取URL参数
    getUrlParam : function (name) {
        //happymmall.com/product/list?keyword=xxx&page=1
        // 左边为空或&再加上name(关键词)再加上=,参数字符串,非&就不结束,一直匹配到&或者字符串末位结束
        var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        // window.location.search.substr(1)就是URL中?的那段参数再去掉?
        var result  = window.location.search.substr(1).match(reg);
        //result数组的第二个元素即为匹配到的值
        // 由于传参时有URLencode所以需要decodeURIComponent
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 渲染HTML模板的方法,将传入的模板与数据进行拼接
    renderHtml : function (htmlTemplate,data) {
        var tempalte = Hogan.compile(htmlTemplate),
        result = tempalte.render(data);
        return result;
        
    },
    // 成功提示
    successTips : function (msg) {
        alert(msg || '操作成功');
    },
    // 错误提示
    errorTips : function (msg) {
        alert(msg || '哪里不对了~');
    },
    // 字段的验证,支持非空,手机,邮箱的判断
    validate : function (value, type) {
        //去掉前后空格,且若为非字符串类型会被转为字符串类型
        var value = $.trim(value);
        // 字段必须有值
        if ('required' ===  type) {
            // 将value强转成布尔型 非空验证
            return !!value;
        }
        // 手机号验证
        if ('phone' === type) {
            // 1开头的11位数字
            return /^1\d{10}$/.test(value);
        }
        // 邮箱格式验证
        if ('email' === type) {
            // 1开头的11位数字
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    // 统一登录处理,重定向到需登录时页面
    doLogin : function() {
        //有特殊字符,防止截断,因此进行完全编码
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome : function () {
        window.location.href = './index.html';
    }
};

module.exports = _mm;