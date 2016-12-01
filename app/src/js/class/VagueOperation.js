"use strict";
var CanvasOperation = require('./CanvasOperation');
var VagueOperation = CanvasOperation.extend({
    operate:function(img,px){
        if(!img){
            img = this.img;
        }
        var imgData = this.createImageDataFromImg(img);
        console.log(imgData);
        imgData = this.operateData(imgData,px);
        var image = this.createImageFromImgData(imgData);
        return image;
    },
    operateData:function(imgData,px){
        var cpImgData = this.copy(imgData);
        var data = imgData.data;
        for (var i=0;i<data.length;i+=4) {

            var R = 0;
            var G = 0;
            var B = 0;

            var ca = 0;
            var h = Math.floor(i/4/imgData.width);
            var w = (i/4)%imgData.width;
            var midP = this.p(w,h);
            for (var j = h-px; j <= h+px; j++) {
                for(var k=w-px;k<=w+px;k++){
                    var nowP = this.p(k,j);
                    var tempData = this.findOneImgDataByXY(cpImgData,nowP,midP,px);
                    if(tempData!=null){
                        var quan = tempData.quan;
                        var pxData = tempData.pxData;
                        ca+=quan;
                        R+=quan*pxData[0];
                        G+=quan*pxData[1];
                        B+=quan*pxData[2];
                    }
                }
            }
            if(ca==0){
                ca=1;
            }
            R = R/ca;
            G = G/ca;
            B = B/ca;

            data[i] = R;
            data[i + 1] = G;
            data[i + 2] = B;

        }
        return imgData;
    },
    findOneImgDataByXY:function(imgData,nowP) {
        var x = nowP.x;
        var y = nowP.y;
        var width = imgData.width;
        var data = imgData.data;
        var index = x + width * y;
        index *= 4;
        if (index < 0 || index >= data.length) {
            return null;
        }
        return {
            quan:1,
            pxData:[
                data[index],
                data[index + 1],
                data[index + 2],
                data[index + 3]
            ]
        };
    }

});
module.exports = VagueOperation;