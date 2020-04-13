/*
 * @Author: your name
 * @Date: 2020-03-09 16:18:30
 * @LastEditTime: 2020-04-13 16:03:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miaomiao/src/components/JS/index.js
 */
import Vue from 'vue';
import MessageBox from './MessageBox';

export var messageBox = (function(){

    var defaults = {//默认值
        title:'',
        content:'',
        cancel:'',
        ok:'',
        handleCancel : null,
        handeleOk : null,
    };

    return function(opts){//配置参数
        for (var attr in opts) {
            defaults[attr] = opts[attr];
        }

        var MyCompontent = Vue.extend(messageBox);

        var vm = new MyCompontent({
            el:document.createElement('div'),
            data : {
                title : defaults.title,
                content : defaults.content,
                cancel : defaults.cancel,
                ok : defaults.ok,
            },
            methods : {
                handleCancel(){
                    defaults.handleCancel && defaults.handleCancel.call(this);
                    document.body.removeChild( vm.$el )
                },
                handeleOk(){
                    defaults.handeleOk && defaults.handeleOk.bind(this);
                    document.body.removeChild( vm.$el )
                }
            }
 
        document.body.appendChild( vm.$el )
    }
})();