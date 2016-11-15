"use strict";
var HClass = require('./HClass');
var CanvasOperation = HClass.extend({
    canvas:null,
    domCanvas:null,
    ctx:null,
    rect:null,
    ctor:function(rect){
        if(rect){
            this.initCanvas(rect);
        }
    },
    initCanvas:function(rect){
        this.canvas = $('<canvas></canvas>');
        var width = rect.width;
        var height = rect.height;
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
        var rect = this.rect;
        return ctx.getImageData(0,0,rect.width,rect.height);
    },
    createImageFromImgData:function(imgData){
        var ctx = this.ctx;
        ctx.putImageData(imgData,0,0);
        var canvas = this.domCanvas;
        var image = new Image();
        image.src = canvas.toDataURL("image/png");
        return image;
    }
});
module.exports = CanvasOperation;