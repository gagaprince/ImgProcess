"use strict";
var ImgProcess = require('./class/ImgProcess');
var ImgProcessUtil = {
    loadImg:function(imgUrl,callback){
        var image = new Image();
//        image.crossOrigin='Anonymous';
        image.src = imgUrl;
        image.onload=function(){
            if(callback){
                var now = new Date().getTime();
                callback(image);
                var now2 = new Date().getTime();
                console.log("处理耗时："+(now2-now)+"ms");
            }
        }
    },
    parseReverseImg:function(img){
        var imp = ImgProcess.create(img);
        return imp.reverse().createImg();
    },
    parseGrayImg:function(img){
        var imp = ImgProcess.create(img);
        return imp.gray().createImg();
    },
    parseOldImg:function(img){
        var imp = ImgProcess.create(img);
        return imp.old().createImg();
    },
    parseBaoHeImg:function(img){
        var imp = ImgProcess.create(img);
        return imp.baohe().createImg();
    },
    parseAfImg:function(img){
        var imp = ImgProcess.create(img);
        return imp.touming().createImg();
    },
    parseVagueImg:function(img,px){
        var imp = ImgProcess.create(img);
        return imp.vague(px).createImg();
    },
    parseUVagueImg:function(img,px){
        var imp = ImgProcess.create(img);
        return imp.uvague(px).createImg();
    },
    parseGaussImg:function(img,px){
        var imp = ImgProcess.create(img);
        return imp.gauss(px).createImg();
    },
    parseUGaussImg:function(img,px){
        var imp = ImgProcess.create(img);
        return imp.ugauss(px).createImg();
    },
    parseDFTImg:function(img){
        var imp = ImgProcess.create(img);
        return imp.dft().createImg();
    }
};
module.exports = ImgProcessUtil;
