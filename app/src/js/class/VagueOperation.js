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
            for (var j = h-px; j <= h+px; j++) {
                for(var k=w-px;k<=w+px;k++){
                    var tempData = this.findOneImgDataByXY(k,j,cpImgData);
                    if(tempData!=null){
                        ca++;
                        R+=tempData[0];
                        G+=tempData[1];
                        B+=tempData[2];
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
    findOneImgDataByXY:function(x,y,imgData) {
        var width = imgData.width;
        var data = imgData.data;
        var index = x + width * y;
        index *= 4;
        if (index < 0 || index >= data.length) {
            return null;
        }
        return [
            data[index],
            data[index + 1],
            data[index + 2],
            data[index + 3]
        ];
    }

});
module.exports = VagueOperation;