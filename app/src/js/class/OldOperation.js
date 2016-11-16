"use strict";
var CanvasOperation = require('./CanvasOperation');
var OldOperation = CanvasOperation.extend({
    matrix:[
        [0.393,0.769,0.189,0,0],
        [0.349,0.686,0.168,0,0],
        [0.272,0.534,0.131,0,0],
        [0,0,0,1,0]
    ],
    operateData:function(imgData){
        this.operateDataByMatrix(this.matrix,imgData);
        return imgData;
    }
});
module.exports = OldOperation;