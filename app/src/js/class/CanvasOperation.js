"use strict";
var HClass = require('./HClass');
var CanvasOperation = HClass.extend({
    canvas:null,
    domCanvas:null,
    ctx:null,
    img:null,
    ctor:function(img){
        if(img){
            this.img = img;
            this.initCanvas(img);
        }
    },
    initCanvas:function(img){
        this.canvas = $('<canvas></canvas>');
        var width = img.width;
        var height = img.height;
        this.canvas.css({
            "height":height+'px',
            "width":width+'px'
        });
        this.canvas.attr('height',height);
        this.canvas.attr('width',width);
        this.domCanvas = this.canvas[0];
        this.ctx = this.domCanvas.getContext('2d');
    },
    createImageDataFromImg:function(img){
        if(!this.canvas){
            this.initCanvas(img);
        }
        //draw
        this.ctx.drawImage(img,0,0);
        var rect = this.img;
        return this.ctx.getImageData(0,0,rect.width,rect.height);
    },
    operate:function(img){
        if(!img){
            img = this.img;
        }
        var imgData = this.createImageDataFromImg(img);
        imgData = this.operateData(imgData);
        var image = this.createImageFromImgData(imgData);
        return image;
    },
    operateData:function(imgData){
        console.log('need operate!');
        return imgData;
    },
    createImageFromImgData:function(imgData){
        var ctx = this.ctx;
        ctx.putImageData(imgData,0,0);
        var canvas = this.domCanvas;
        var image = new Image();
        image.src = canvas.toDataURL("image/png");
        this.destory();
        return image;
    },
    destory:function(){
        this.canvas=null;
        this.domCanvas=null;
        this.ctx=null;
        this.img=null;
    }
});
module.exports = CanvasOperation;