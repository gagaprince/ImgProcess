"use strict";
var HClass = require('../base/HClass');
var Complex = HClass.extend({
    a:0,//实数部分
    b:0,//虚数部分
    m:0,
    ctor:function(a,b){
        this.a = a;
        this.b = b;
        this.m = this.mod();
    },
    add:function(num){
        //复数的加法
        this.a += num.a;
        this.b += num.b;
        this.m = this.mod();
    },
    cheng:function(num){
        var a = this.a;
        var b = this.b;
        var a1 = num.a;
        var b1 = num.b;
        //console.log("a:"+a+"b:"+b+"a1:"+a1+"b1:"+b1);
        this.a = a*a1-b*b1;
        this.b = a*b1+b*a1;
        this.m=this.mod();
    },
    getM:function(){
        return this.m;
    },
    mod:function(){
        //取摸
        var a = this.a;
        var b = this.b;
        return Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
    },
    clone:function(){
        return Complex.create(this.a,this.b);
    }
});
Complex.create =function(a,b){
    return new Complex(a,b);
}
module.exports = Complex;