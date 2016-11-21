"use strict";
var VagueOperation = require('./VagueOperation');
var GaussOperation = VagueOperation.extend({
    findOneImgDataByXY:function(imgData,nowP,midP,px) {
        var x = nowP.x;
        var y = nowP.y;
        var mx = midP.x;
        var my = midP.y;
        var width = imgData.width;
        var data = imgData.data;
        var index = x + width * y;
        index *= 4;
        if (index < 0 || index >= data.length) {
            return null;
        }

        var diss = Math.pow(x-mx,2)+Math.pow(y-my,2);
        var sigma = px/3;
        var sigma2 = 2*sigma*sigma;
        var sigmaPi = sigma2*Math.PI;
        var quan = Math.exp(-diss/sigma2)/sigmaPi;

        return {
            quan:quan,
            pxData:[
                data[index],
                data[index + 1],
                data[index + 2],
                data[index + 3]
            ]
        };
    }

});
module.exports = GaussOperation;