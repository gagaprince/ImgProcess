"use strict";
//油画
var VagueOperation = require('./VagueOperation');
var OilOperation = VagueOperation.extend({
    r:5,
    grayNum:20,
    operate:function(img,r,grayNum){
        this.r = r||5;
        this.grayNum = grayNum||20;
        return this._super(img);
    },
    operateData:function(imgData){
        var cpImgData = this.copy(imgData);
        var data = imgData.data;
        var px = this.r;
        var grayNum = this.grayNum;
        for (var i=0;i<data.length;i+=4) {
            var h = Math.floor(i/4/imgData.width);
            var w = (i/4)%imgData.width;

            var grayArray = [];
            var rarr = [];
            var garr = [];
            var barr = [];
            for(var z=0;z<grayNum;z++){
                grayArray.push(0);
                rarr.push(0);
                garr.push(0);
                barr.push(0);
            }

            for (var j = h-px; j <= h+px; j++) {
                for(var k=w-px;k<=w+px;k++){
                    var nowP = this.p(k,j);
                    var tempData = this.findOneImgDataByXY(cpImgData,nowP);
                    if(!tempData)continue;
                    var tR = tempData[0];
                    var tG = tempData[1];
                    var tB = tempData[2];
                    var grayLevel = Math.floor((tR+tB+tG)/3/255*grayNum);
                    rarr[grayLevel]+=tR;
                    garr[grayLevel]+=tG;
                    barr[grayLevel]+=tB;
                    grayArray[grayLevel]++;
                }
            }

            var maxIndex = this.findMaxIndex(grayArray);
            var count = grayArray[maxIndex];

            data[i] = rarr[maxIndex]/count;
            data[i + 1] = garr[maxIndex]/count;
            data[i + 2] = barr[maxIndex]/count;

            for(var z=0;z<grayNum;z++){
                grayArray[z]=0;
                rarr[z]=0;
                garr[z]=0;
                barr[z]=0;
            }

        }
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
    },
    findOneImgDataByXY:function(imgData,nowP) {
        var tempData = this._super(imgData,nowP);
        if(tempData){
            return tempData.pxData;
        }
        return null;
    }
});
module.exports = OilOperation;