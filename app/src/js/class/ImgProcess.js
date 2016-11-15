"use strict";
var HClass = require('./HClass');
var ReverseOperation = require('./ReverseOperation');
var ImgProcess = HClass.extend({
    img:null,
    ctor:function(img){
        this.img = img;
    },
    reverse:function(){
        var op = new ReverseOperation(this.img);
        this.img = op.operate();
        return this;
    },
    createImg:function(){
        return this.img;
    }
});
ImgProcess.create = function(img){
    return new ImgProcess(img);
}
module.exports = ImgProcess;