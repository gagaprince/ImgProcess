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
    /**
     * matrix 的格式
     * [
     * a,b,c,d,e,
     * f,g,h,i,j,
     * k,l,m,n,o,
     * p,q,r,s,t
     * ]
     * */
    operateDataByMatrix:function(matrix,imgData){
        var data = imgData.data;
        //var i=0;
        for (var i=0;i<data.length;i+=4)
        {
            var R  = data[i];
            var G  = data[i+1];
            var B  = data[i+2];
            var A  = data[i+3];
            var I = 255;
            var nowM = [
                [R],[G],[B],[A],[I]
            ]
            var rm = this._matrixCheng(matrix,nowM);
            //console.log(nowM);
            //console.log(rm);
            data[i]=rm[0][0];
            data[i+1]=rm[1][0];
            data[i+2]=rm[2][0];
            data[i+3]=rm[3][0];
        }
        return imgData;
    },
    //矩阵乘法
    _matrixCheng:function(m1,m2){
        if(m1[0].length!=m2.length){
            throw "the two matrix cannot cheng!";
            return [];
        }
        var rm = [];
        for(var i=0;i<m1.length;i++){
            var rmx = [];
            for(var j=0;j<m2[0].length;j++){
                var sum = 0;
                for(var k=0;k<m1[0].length;k++){
                    sum+=m1[i][k]*m2[k][j];
                }
                rmx.push(sum);
            }
            rm.push(rmx);
        }
        return rm;
    },
    /*_findMatrixValue:function(matrix,x,y){
        var len = matrix[0].length;
        return matrix[y][y*len+x];
    },*/
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