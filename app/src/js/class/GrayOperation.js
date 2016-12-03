"use strict";
var CanvasOperation = require('./CanvasOperation');
var GrayOperation = CanvasOperation.extend({
    matrix:[
        [0.299,0.587,0.114,0,0],
        [0.299,0.587,0.114,0,0],
        [0.299,0.587,0.114,0,0],
        [0,0,0,1,0]
    ],
    //matrix:[
    //    [0.33,0.59,0.11,0,0],
    //    [0.33,0.59,0.11,0,0],
    //    [0.33,0.59,0.11,0,0],
    //    [0,0,0,1,0]
    //],
    //matrix:[
    //    [1,0,0,0,0],
    //    [1,0,0,0,0],
    //    [1,0,0,0,0],
    //    [0,0,0,1,0]
    //],
    operateData:function(imgData){
        // 灰度颜色
        //var data = imgData.data;
        //for (var i=0;i<data.length;i+=4)
        //{
        //    var r  = data[i];
        //    var g  = data[i+1];
        //    var b  = data[i+2];
        //    var a  = data[i+3];
        //    var gray = Math.floor((r+g+b)/3);
        //    data[i]=gray;
        //    data[i+1]=gray;
        //    data[i+2]=gray;
        //    data[i+3]=255;
        //}
        this.operateDataByMatrix(this.matrix,imgData);
        return imgData;
    }
});
module.exports = GrayOperation;