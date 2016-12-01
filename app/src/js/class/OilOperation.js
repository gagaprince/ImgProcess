"use strict";
//油画
var CanvasOperation = require('./CanvasOperation');
var RGBpx = require('./base/RGBpx');
var OilOperation = CanvasOperation.extend({
    r:5,
    grayNum:20,
    operate:function(img,r,grayNum){
        this.r = r||5;
        this.grayNum = grayNum||20;
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

            var grayArray = [];
            var rgbArr = [];
            for(var z=0;z<=grayNum;z++){
                grayArray.push(0);
                rgbArr.push(RGBpx.create(0,0,0))
            }

            for (var j = h-px; j <= h+px; j++) {
                for(var k=w-px;k<=w+px;k++){
                    var nowP = this.p(k,j);
                    var tempData = this.findOneRGBDataByXY(cpImgData,nowP);
                    if(!tempData)continue;
                    var grayLevel = Math.floor(tempData.gray()/255*grayNum);
                    rgbArr[grayLevel]=RGBpx.add(tempData,rgbArr[grayLevel]);
                    grayArray[grayLevel]++;
                }
            }

            var maxIndex = this.findMaxIndex(grayArray);
            var count = grayArray[maxIndex];

            rgbData[i]=RGBpx.divi(rgbArr[maxIndex],count);
            for(var z=0;z<=grayNum;z++){
                grayArray[z]=0;
                rgbArr[z]=RGBpx.create(0,0,0);
            }
        }
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
module.exports = OilOperation;