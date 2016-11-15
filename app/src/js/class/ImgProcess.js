"use strict";
var HClass = require('./HClass');
var ImgProcess = HClass.extend({
    img:null,
    ctor:function(img){
        this.img = img;
    }
});
ImgProcess.create = function(img){
    return new ImgProcess(img);
}
module.exports = ImgProcess;