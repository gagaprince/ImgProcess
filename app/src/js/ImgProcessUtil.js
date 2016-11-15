"use strict";
var ImgProcess = require('./class/ImgProcess');
var ImgProcessUtil = {
    loadImg:function(imgUrl,callback){
        var image = new Image();
//        image.crossOrigin='Anonymous';
        image.src = imgUrl;
        image.onload=function(){
            if(callback){
                callback(image);
            }
        }
    },
    parseReverseImg:function(img){
        var imp = ImgProcess.create(img);
        return imp.reverse().createImg();
    }
};
module.exports = ImgProcessUtil;
