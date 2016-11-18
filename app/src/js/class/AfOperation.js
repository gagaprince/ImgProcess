"use strict";
var CanvasOperation = require('./CanvasOperation');
var AfOperation = CanvasOperation.extend({
    matrix:[
        [1,0,0,0,0],
        [0,1,0,0,0],
        [0,0,1,0,0],
        [0,0,0,0.9,0]
    ],
    operateData:function(imgData){
        this.operateDataByMatrix(this.matrix,imgData);
        return imgData;
    }
});
module.exports = AfOperation;