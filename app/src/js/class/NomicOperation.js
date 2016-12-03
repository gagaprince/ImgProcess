
//局部均方差 磨皮
var CanvasOperation = require('./CanvasOperation');
var RGBpx = require('./base/RGBpx');
var NomicOperation = CanvasOperation.extend({
    xr:2,//局部半径
    yr:2,//局部y方向半径
    c:2,
    operate:function(img,xr,yr,c){
        this.xr = xr;
        this.yr = yr;
        this.c = c;
        return this._super(img);
    },
    operateData:function(imgData){
        var cpImgData = this.copyToRGB(imgData);

        var mImgData = this.caculateMij(imgData);
        var vImgData = this.caculateVij(imgData);



        var kImgData = this.caculateKij(vImgData,this.c);
        var yImgData = this.caculateYij(kImgData);

        cpImgData = this._addAllDataM(
            this._mutiData(yImgData,mImgData),
            this._mutiData(kImgData,cpImgData)
        );
        this.rgbToImg(imgData,cpImgData);
        console.log(cpImgData);
        return imgData;
    },
    caculateYij:function(kImgData){
        var cpKImgData = this.copyToRGB(kImgData);
        var rgbData = cpKImgData.rgbData;
        for(var i=0;i<rgbData.length;i++){
            var item = rgbData[i];
            rgbData[i] = RGBpx.minus(RGBpx.create(1,1,1),rgbData[i]);
        }
        return cpKImgData;
    },
    caculateKij:function(vImgData,c){
        var cpVImgData = this.copyToRGB(vImgData);
        cpVImgData = this._addAllData(cpVImgData,c);
        vImgData = this._diviAllDataM(vImgData,cpVImgData);
        return vImgData;
    },

    //计算均方矩阵
    caculateVij:function(imgData){
        var v2ImgData = this.copyToRGB(imgData);
        var vlImgData = this.copyToRGB(imgData);
        var temp = this.copyToRGB(imgData);
        var xr = this.xr;
        var yr = this.yr;
        var n = (2*xr+1)*(2*yr+1);

        v2ImgData = this._powData(v2ImgData,2);
        v2ImgData = this.caculateSumij(v2ImgData);

        vlImgData = this.caculateSumij(vlImgData);
        vlImgData = this._powData(vlImgData,2);
        vlImgData = this._diviAllData(vlImgData,n);

        var vImgData = this._minusData(v2ImgData,vlImgData);
        vImgData = this._diviAllData(vImgData,n);

        return vImgData;
    },

    //计算均值矩阵
    caculateMij:function(imgData){
        var xr = this.xr;
        var yr = this.yr;
        var cpImgData = this.caculateSumij(imgData);
        cpImgData = this._diviAllData(cpImgData,(2*xr+1)*(2*yr+1));
        return cpImgData;
    },
    caculateSumij:function(imgData){
        var cpImgData = this.copyToRGB(imgData);
        //首先计算差值  计算m(i,j) 和 m(i-1,j)的差值 计算m(0,j)和m(0,j-1)的差值
        //保存差值矩阵
        var dImgData = this.caculateDij(imgData);

        //计算和值
        var width = cpImgData.width;
        var height = cpImgData.height;
        var xr = this.xr;
        var yr = this.yr;
        for(var j=0;j<height;j++){
            for(var i=0;i<width;i++) {
                var p = this.p(i,j);
                if(i==0&&j==0){
                    var mrgb = this._cacuSum00(cpImgData, xr, yr);
                    this.setOneRGBDataByXY(cpImgData, this.p(0, 0), mrgb);
                }else if(i==0){
                    var ditem = this.findOneRGBDataByXY(dImgData,p);
                    var mlast = this.findOneRGBDataByXY(cpImgData,this.p(i,j-0));
                    var sum = RGBpx.add(ditem,mlast);
                    this.setOneRGBDataByXY(cpImgData,p,sum);
                }else{
                    var ditem = this.findOneRGBDataByXY(dImgData,p);
                    var mlast = this.findOneRGBDataByXY(cpImgData,this.p(i-1,j));
                    //console.log(p);
                    //console.log(ditem);
                    var sum = RGBpx.add(ditem,mlast);
                    this.setOneRGBDataByXY(cpImgData,p,sum);
                }
            }
        }
        return cpImgData;
    },
    caculateDij:function(imgData){
        var oldImgData = this.copyToRGB(imgData);
        var dImgData = this.copyToRGB(imgData);
        var width = oldImgData.width;
        var height = oldImgData.height;
        var xr = this.xr;
        var yr = this.yr;
        for(var j=0;j<height;j++){
            for(var i=0;i<width;i++) {
                var p = this.p(i,j);
                if(i==0){
                    //计算行的和
                    var sumi0 = this._cacuDijByRow(oldImgData,p,xr);
                    this.setOneRGBDataByXY(dImgData,p,sumi0);
                }else if(j==0){
                    //计算列的和
                    var sumi0 = this._cacuDijByCol(oldImgData,p,yr);
                    this.setOneRGBDataByXY(dImgData,p,sumi0);
                }else{
                    //计算其他列的差值
                    //使用当前位置上的数字快速计算列差
                    var sumi0 = this._cacuDijByCol(oldImgData,p,yr,
                        this.findOneRGBDataByXY(dImgData,this.p(i,j-1)));
                    this.setOneRGBDataByXY(dImgData,sumi0);
                }
            }
        }
        return dImgData;
    },
    _cacuSum00:function(cpImgData,xr,yr){
        var sumRgb = RGBpx.create();
        for(var i=-xr;i<=xr;i++){
            for(var j=-yr;j<=yr;j++){
                var rgb = this.findOneRGBDataByXY(cpImgData,this.p(i,j));
                if(rgb){
                    sumRgb = RGBpx.add(rgb,sumRgb);
                }
            }
        }
        return sumRgb;
    },
    _cacuDijByCol:function(cpImgData,nowP,yr,sum){
        var x = nowP.x;
        var y = nowP.y;
        var minus = null;
        var add = null;
        var returnData = null;
        if(typeof sum!="undefined"){
            add = this.findOneRGBDataByXY(cpImgData,this.p(x,y+yr));
            minus = this.findOneRGBDataByXY(cpImgData,this.p(x,y-yr-1));
            if(add){
                sum = RGBpx.add(sum,add);
            }
            if(minus){
                sum = RGBpx.minus(sum,minus);
            }
            returnData = sum;
        }else{
            var sum = RGBpx.create();
            for(var i=y-yr;i<=y+yr;i++){
                var item = this.findOneRGBDataByXY(cpImgData,this.p(x,i));
                if(item){
                    sum = RGBpx.add(sum,item);
                }
            }
            returnData = sum;
        }
        return returnData;
    },
    _cacuDijByRow:function(cpImgData,nowP,xr){
        var x = nowP.x;
        var y = nowP.y;
        var returnData = null;
        var sum = RGBpx.create();
        for(var i=x-xr;i<=x+xr;i++){
            var item = this.findOneRGBDataByXY(cpImgData,this.p(i,y));
            if(item){
                sum = RGBpx.add(sum,item);
            }
        }
        returnData = sum;
        return returnData;
    },
    _addAllData:function(imgData,num){
        var data = imgData.rgbData;
        for(var i=0;i<data.length;i++){
            var itemData = data[i];
            data[i]=RGBpx.add(itemData,RGBpx.create(num,num,num));
        }
        return imgData;
    },
    _addAllDataM:function(imgData1,imgData2){
        var data1 = imgData1.rgbData;
        var data2 = imgData2.rgbData;
        for(var i=0;i<data1.length;i++){
            var itemData1 = data1[i];
            var itemData2 = data2[i];
            data1[i]=RGBpx.add(itemData1,itemData2);
        }
        return imgData1;
    },
    _diviAllDataM:function(imgData1,imgData2){
        var data1 = imgData1.rgbData;
        var data2 = imgData2.rgbData;
        for(var i=0;i<data1.length;i++){
            var itemData1 = data1[i];
            var itemData2 = data2[i];
            data1[i]=RGBpx.diviM(itemData1,itemData2);
        }
        return imgData1;
    },
    _diviAllData:function(imgData,n){
        var data = imgData.rgbData;
        for(var i=0;i<data.length;i++){
            var itemData = data[i];
            data[i]=RGBpx.divi(itemData,n);
        }
        return imgData;
    },
    _powData:function(imgData,n){
        var data = imgData.rgbData;
        for(var i=0;i<data.length;i++){
            var itemData = data[i];
            data[i]=RGBpx.pow(itemData,n);
        }
        return imgData;
    },
    _minusData:function(imgData1,imgData2){
        var data1 = imgData1.rgbData;
        var data2 = imgData2.rgbData;
        for(var i=0;i<data1.length;i++){
            var itemData1 = data1[i];
            var itemData2 = data2[i];
            data1[i]=RGBpx.minus(itemData1,itemData2);
        }
        return imgData1;
    },
    _mutiData:function(imgData1,imgData2){
        var data1 = imgData1.rgbData;
        var data2 = imgData2.rgbData;
        for(var i=0;i<data1.length;i++){
            var itemData1 = data1[i];
            var itemData2 = data2[i];
            data1[i]=RGBpx.mutiM(itemData1,itemData2);
        }
        return imgData1;
    }
});
module.exports = NomicOperation;