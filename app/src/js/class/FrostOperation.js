"use strict";
//毛玻璃
var CanvasOperation = require('./CanvasOperation');
var RGBpx = require('./base/RGBpx');
var FrostOperation = CanvasOperation.extend({
    r:5,
    operate:function(img,r){
        this.r = r||5;
        return this._super(img);
    },
    operateData:function(imgData){
        var cpImgData = this.copyToRGB(imgData);
        var rgbData = cpImgData.rgbData;
        var px = this.r;
        var grayNum = this.grayNum;
        var width = cpImgData.width;
        var height = cpImgData.height;
        for (var i=0;i<rgbData.length;i++) {
            var h = Math.floor(i/width);
            var w = i%width;

            var j = h+Math.round(Math.random()*2*px)-px;
            var k = w+Math.round(Math.random()*2*px)-px;

            var nowP = this.p(k,j);
            var tempData = this.findOneRGBDataByXY(cpImgData,nowP);
            if(!tempData){
                tempData = this.findOneRGBDataByXY(cpImgData,this.p(w,h));
            }
            //这里直接对rgbData赋值 其实会造成一些误差，但是不是很影响
            rgbData[i]=RGBpx.divi(tempData,1);
        }
        console.log(cpImgData);
        this.rgbToImg(imgData,cpImgData);
        return imgData;
    },
    findMaxIndex:function(grayArray){
        var maxNum = 0;
        var maxIndex = 0;
        for(var i=0;i<grayArray.length;i++){
            if(maxNum<grayArray[i]){
                maxNum=grayArray[i];
                maxIndex=i;
            }
        }
        return maxIndex;
    }
});
module.exports = FrostOperation;