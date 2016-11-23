"use strict";
var CanvasOperation = require('./CanvasOperation');
var DFTOperation = CanvasOperation.extend({
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
        var fm = this.parseFMfromImgData();
        var dfm = this.dft(fm);
        console.log(dfm);
        return imgData;
    },
    parseFMfromImgData:function(){
        return [1,2,3,4,5,6,7,8];
    },
    dft:function(fm){
        //传入一个 离散 矩阵序列
        var N = fm.length;
        var dfm = [];
        var w = 2*Math.PI/N;
        for(var n=0;n<N;n++){
            var xn = 0;
            for(var k=0;k<N;k++){
                var alf = w*k*n;
                xn+=fm[k]*(Math.sin(alf)+Math.cos(alf));
            }
            dfm.push(xn);
        }
        return dfm;
        //回传一个ft变换的矩阵数组
    }

});
module.exports = DFTOperation;