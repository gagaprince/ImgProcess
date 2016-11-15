"use strict";
var CanvasOperation = require('./CanvasOperation');
var GrayOperation = CanvasOperation.extend({
    operateData:function(imgData){
        // 反转颜色
        var data = imgData.data;
        for (var i=0;i<data.length;i+=4)
        {
            var r  = data[i];
            var g  = data[i+1];
            var b  = data[i+2];
            var a  = data[i+3];
            var gray = Math.floor((r+g+b)/3);
            data[i]=gray;
            data[i+1]=gray;
            data[i+2]=gray;
            data[i+3]=255;
        }
        return imgData;
    }
});
module.exports = GrayOperation;