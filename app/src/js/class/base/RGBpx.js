"use strict";
var HClass = require('./HClass');
var RGBpx = HClass.extend({
    r:0,
    g:0,
    b:0,
    ctor:function(r,g,b){
        this.set(r,g,b);
    },
    set:function(r,g,b){
        this.r=r||0;
        this.g=g||0;
        this.b=b||0;
    },
    gray:function(){
        return (this.r+this.g+this.b)/3;
    },
    clone:function(){
        return new RGBpx(this.r,this.g,this.b);
    }
});
RGBpx.create = function(r,g,b){
    return new RGBpx(r,g,b);
};
RGBpx.add=function(p1,p2){
    return new RGBpx(p1.r+p2.r,p1.g+p2.g,p1.b+p2.b);
}
RGBpx.minus=function(p1,p2){
    return new RGBpx(p1.r-p2.r,p1.g-p2.g,p1.b-p2.b);
}
RGBpx.divi = function(p1,num){
    if(num==0){
        throw "divi num can not be zero!";
        return;
    }
    return new RGBpx(p1.r/num,p1.g/num,p1.b/num);
}
RGBpx.diviM = function(p1,p2){
    return new RGBpx(p1.r/p2.r,p1.g/p2.g,p1.b/p2.b);
}
RGBpx.muti = function(p1,num){
    return new RGBpx(p1.r*num,p1.g*num,p1.b*num);
}
RGBpx.mutiM = function(p1,p2){
    return new RGBpx(p1.r*p2.r,p1.g*p2.g,p1.b*p2.b);
}

RGBpx.pow = function(p1,n){
    var p = RGBpx.create(1,1,1);
    for(var i=0;i<n;i++){
        p = RGBpx.mutiM(p1,p);
    }
    return p;
}
module.exports = RGBpx;
