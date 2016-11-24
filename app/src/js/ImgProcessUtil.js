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
    createBWimg:function(w){
        var $canvas = $("<canvas></canvas>");
        var c = $canvas[0];
        var ctx = c.getContext("2d");
        $canvas.attr("width",w);
        $canvas.attr("height",w);
        ctx.fillStyle="#000000";
        ctx.fillRect(0,0,w/2,w);
        ctx.fillStyle="#ffffff";
        ctx.fillRect(w/2,0,w/2,w);
        var image = new Image();
        image.src = c.toDataURL("image/png");
        return image;
    },
    parseScaleImg:function(img,scale){
        var iw = img.width;
        var ih = img.height;
        var dw = iw*scale;
        var dh = ih*scale;
        return this.createImg(iw,ih,dw,dh,img);
    },
    parseBoxImg:function(img,w){
        if(!w){
            w = Math.min(img.width,img.height);
        }
        return this.createImg(w,w,w,w,img);
    },
    createImg:function(iw,ih,dw,dh,img){
        var $canvas = $("<canvas></canvas>");
        var c = $canvas[0];
        var ctx = c.getContext("2d");
        $canvas.attr("width",dw);
        $canvas.attr("height",dh);
        ctx.drawImage(img,0,0,iw,ih,0,0,dw,dh);
        var image = new Image();
        image.src = c.toDataURL("image/png");
        return image;
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
        return imp.gray().dft().createImg();
    }
};
module.exports = ImgProcessUtil;
