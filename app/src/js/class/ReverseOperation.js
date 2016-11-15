"use strict";
var CanvasOperation = require('./CanvasOperation');
var ReverseOperation = CanvasOperation.extend({
    operateData:function(imgData){
        // 反转颜色
        var data = imgData.data;
        for (var i=0;i<data.length;i+=4)
        {
            data[i]=255-data[i];
            data[i+1]=255-data[i+1];
            data[i+2]=255-data[i+2];
            data[i+3]=255;
        }
        return imgData;
    }
});
module.exports = ReverseOperation;