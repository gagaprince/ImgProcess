"use strict";
var HClass = require('./base/HClass');
var RGBpx = require('./base/RGBpx');
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
    p:function(x,y){
        return {
            x:x,
            y:y
        }
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
    copyToRGB:function(imgData){
        var cpImg = {
            rgbData:[],
            width:imgData.width,
            height:imgData.height
        }
        var data = imgData.data;
        for(var i=0;i<data.length;i+=4){
            cpImg.rgbData.push(RGBpx.create(data[i],data[i+1],data[i+2]));
        }
        return cpImg;
    },
    rgbToImg:function(imgData,rgbImgData){
        var data = imgData.data;
        var rgbData = rgbImgData.rgbData;
        for(var i=0;i<data.length;i+=4){
            var index = i/4;
            var rgb = rgbData[index];
            data[i]=rgb.r;
            data[i+1]=rgb.g;
            data[i+2]=rgb.b;
        }
        return imgData;
    },
    findOneRGBDataByXY:function(imgRgbData,nowP){
        var x = nowP.x;
        var y = nowP.y;
        var width = imgRgbData.width;
        var rgbData = imgRgbData.rgbData;
        var index = x + width * y;
        if (index < 0 || index >= rgbData.length) {
            return null;
        }
        return rgbData[index];
    },
    copy:function(imgData){
        var cpImg = {
            data:[],
            width:imgData.width,
            height:imgData.height
        }
        for(var i=0;i<imgData.data.length;i++){
            cpImg.data.push(imgData.data[i]);
        }
        return cpImg;
    },

    addArray: function (a1,a2) {
        if(a1.length!=a2.length){
            throw "两个向量长度不同 不能相加";
        }
        for(var i=0;i<a1.length;i++){
            a1[i]+=a2[i];
        }
        return a1;
    },
    chengArray:function(a1,num){
        for(var i=0;i<a1.length;i++){
            a1[i]*=num;
        }
        return a1;
    },
    destory:function(){
        this.canvas=null;
        this.domCanvas=null;
        this.ctx=null;
        this.img=null;
    }
});
module.exports = CanvasOperation;