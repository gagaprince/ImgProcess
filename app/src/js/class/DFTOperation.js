"use strict";
var CanvasOperation = require('./CanvasOperation');
var Cnum = require('./math/Complex');
var flag = true;
var DFTOperation = CanvasOperation.extend({
    operate:function(img){
        if(!img){
            img = this.img;
        }
        var imgData = this.createImageDataFromImg(img);
        imgData = this.operateData(imgData);
        var image = this.createImageFromImgData(imgData);
        return image;
    },
    operateData:function(imgData){
        var cpImageData = this.copy(imgData);
        var width = imgData.width;
        var height = imgData.height;
        for(var i=0;i<width;i++){
            var fm = this.parseFMfromImgDataX(cpImageData,i);
            var dfm = this.dft(fm);
            this.parseFMintoImgDataX(cpImageData,i,dfm);
        }
        for(var i=0;i<height;i++){
            var fm = this.parseFMfromImgDataY(cpImageData,i);
            var dfm = this.dft(fm,1);
            this.gdft(dfm);
            this.parseFMintoImgDataY(imgData,i,dfm);
        }
        //将cpImageData中的数据返衍到imageData中
        //this.reSetImgData(cpImageData,imgData);
        console.log(imgData);

        return imgData;
    },
    parseFMintoImgDataY:function(imgData,y,fm){
        var width = imgData.width;
        for(var i=0;i<width;i++){
            var tempArr = fm[i];
            this.setOneImgDataByXY(imgData,this.p(i,y),tempArr);
        }
    },
    parseFMintoImgDataX:function(imgData,x,fm){
        var height = imgData.height;
        for(var i=0;i<height;i++){
            var tempArr = fm[i];
            this.setOneImgDataByXY(imgData,this.p(x,i),tempArr);
        }
    },
    //找出每行的像素数组
    parseFMfromImgDataY:function(imgData,y){
        var width = imgData.width;
        var fm = [];
        for(var i=0;i<width;i++){
            var pxDatas =  this.findOneImgDataByXY(imgData,this.p(i,y));
            fm.push(this.transformCarray(pxDatas));
        }
        return fm;
    },
    parseFMfromImgDataX:function(imgData,x){
        var height = imgData.height;
        var fm = [];
        for(var i=0;i<height;i++){
            var pxDatas =  this.findOneImgDataByXY(imgData,this.p(x,i));
            fm.push(this.transformCarray(pxDatas));
        }
        return fm;
    },
    transformCarray:function(array){
        var len = array.length;
        for(var i=0;i<len;i++){
            var ele = array[i];
            if(typeof ele == "number"){
                var cn = Cnum.create(ele,0);
                array[i] = cn;
            }
        }
        return array;
    },
    p: function (x,y) {
        return {
            x:x,
            y:y
        }
    },
    setOneImgDataByXY:function(imgData,nowP,arr){
        var x = nowP.x;
        var y = nowP.y;
        var width = imgData.width;
        var data = imgData.data;
        var index = x + width * y;
        index *= 4;
        data[index]=arr[0];
        data[index+1]=arr[1];
        data[index+2]=arr[2];
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
        return [
                data[index],
                data[index + 1],
                data[index + 2]
            ];

    },

    dft:function(fm){
        //传入一个 离散 矩阵序列
        var N = fm.length;
        var dfm = [];
        var w = 2*Math.PI/N;
        for(var n=0;n<N;n++){
            var xn = [Cnum.create(0,0),Cnum.create(0,0),Cnum.create(0,0)];
            for(var k=0;k<N;k++){
                var alf = w*k*n;

                xn = this.addArray(xn,
                    this.chengArray(fm[k],Cnum.create(Math.cos(alf),-Math.sin(alf))));
//                    this.chengArray(fm[k],Math.cos(alf)-Math.sin(alf)));
            }
            dfm.push(xn);
        }
        return dfm;
        //回传一个ft变换的矩阵数组
    },
    gdft:function(fm){
        //对数组每个分量做归一化处理
        //具体方式为 找到每个分量的最大值和最小值，然后映射 0，255 之后将其他分量
        //按比例放缩
        var jzArray = this.findJZArray(fm);
        for(var i=0;i<fm.length;i++){
            var item = fm[i];
            this.normalizationOne(jzArray,item,255);
        }
        return fm;

    },
    normalizationOne:function(jzArray,ar,dis){
        var minM = jzArray.minM;
        var maxM = jzArray.maxM;

        var len = ar.length;
        for(var i=0;i<len;i++){
            var nowC = ar[i];
            var min = minM[i];
            var max = maxM[i];
            if(max==min){
                ar[i]=122;
            }else{
                ar[i]=dis/(max-min)*(nowC.getM()-min);
            }
        }
    },
    copyArray:function(ar){
        var arr = [];
        for(var i=0;i<ar.length;i++){
            arr.push(ar[i].clone().getM());
        }
        return arr;
    },
    findJZArray:function(fm){
        //找到这个向量数组中的极大极小数组
        var len = fm.length;
        var arrayLen = fm[0].length;
        var minM = this.copyArray(fm[0]);
        var maxM = this.copyArray(fm[0]);
        for(var i=0;i<len;i++){
            var array = fm[i];
            for(var j=0;j<arrayLen;j++){
                if(minM[j]>array[j].getM()){
                    minM[j]=array[j].getM();
                }else if(maxM[j]<array[j].getM()){
                    maxM[j]=array[j].getM();
                }
            }
        }
        return {
            minM:minM,
            maxM:maxM
        }
    },
    addArray: function (a1,a2) {
        if(a1.length!=a2.length){
            throw "两个向量长度不同 不能相加";
        }
        for(var i=0;i<a1.length;i++){
            a1[i].add(a2[i]);
        }
        return a1;
    },
    chengArray:function(a1,num){
        for(var i=0;i<a1.length;i++){
            a1[i].cheng(num);
        }
        return a1;
    }

});
module.exports = DFTOperation;