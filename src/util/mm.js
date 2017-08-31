/*
* @Author: Shusheng Shi
* @Date:   2017-08-30 21:36:42
* @Last Modified by:   Shusheng Shi
* @Last Modified time: 2017-08-30 21:56:58
*/
'use strict';

var _mm = {
    // 需要请求后端数据
    request : function(param){
        //暂存_mm对象
        var _this = this;
        // jquery的ajax
        $.ajax({
            type        : param.method || 'get',
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
    }
    // 封装为统一的登录处理,重定向到需登录时页面
    doLogin : function() {
        //有特殊字符,防止截断,因此进行完全编码
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    }
};

module.exports = _mm;