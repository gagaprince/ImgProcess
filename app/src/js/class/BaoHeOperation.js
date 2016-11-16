"use strict";
var CanvasOperation = require('./CanvasOperation');
var BaoHeOperation = CanvasOperation.extend({
    matrix:[
        [1.438,-0.122,-0.016,0,-0.03],
        [-0.062,1.378,-0.016,0,0.05],
        [-0.062,-0.122,1.483,0,-0.02],
        [0,0,0,1,0]
    ],
    operateData:function(imgData){
        this.operateDataByMatrix(this.matrix,imgData);
        return imgData;
    }
});
module.exports = BaoHeOperation;