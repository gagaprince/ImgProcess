"use strict";
var ImgProcessUtil = require('./ImgProcessUtil');
var TestPage = {
    canvas:null,
    domCanvas:null,
    ctx:null,
    init:function(){
        this.initCanvas();
    },
    initCanvas:function(){
        this.canvas = $("#testCanvas");
        this.domCanvas = this.canvas[0];
        //设置canvas的宽高
        var height = window.innerHeight;
        var width = window.innerWidth;
        this.canvas.css({
            "height":height+'px',
            "width":width+'px'
        });
        this.canvas.attr('height',height);
        this.canvas.attr('width',width);
        this.ctx = this.domCanvas.getContext('2d');
    },
    drawImg:function(img,index){
        if(!index){
            index=0;
        }
        var canvas = this.domCanvas;
        var swidth = img.width;
        var sheight = img.height;
        var width = canvas.width/2;
        var height = width/swidth*sheight;
        this.ctx.drawImage(img,0,0,swidth,sheight,index*width,0,width,height);
    },
    testReverse:function(){
        var imgUrl = './src/img/test1.jpg';
        var _this =this;
        ImgProcessUtil.loadImg(imgUrl,function(img){
            _this.drawImg(img);
            var nImg = ImgProcessUtil.parseReverseImg(img);
            _this.drawImg(nImg,1);
        });
    },
    testGray:function(){
        var imgUrl = './src/img/test1.jpg';
        var _this =this;
        ImgProcessUtil.loadImg(imgUrl,function(img){
            _this.drawImg(img);
            var nImg = ImgProcessUtil.parseGrayImg(img);
            _this.drawImg(nImg,1);
        });
    },
    testOld: function () {
        var imgUrl = './src/img/test1.jpg';
        var _this =this;
        ImgProcessUtil.loadImg(imgUrl,function(img){
            _this.drawImg(img);
            var nImg = ImgProcessUtil.parseOldImg(img);
            _this.drawImg(nImg,1);
        });
    },
    testBaoHe:function(){
        var imgUrl = './src/img/test1.jpg';
        var _this =this;
        ImgProcessUtil.loadImg(imgUrl,function(img){
            _this.drawImg(img);
            var nImg = ImgProcessUtil.parseBaoHeImg(img);
            _this.drawImg(nImg,1);
        });
    },
    testAf:function(){
        var imgUrl = './src/img/test1.jpg';
        var _this =this;
        ImgProcessUtil.loadImg(imgUrl,function(img){
            _this.drawImg(img);
            var nImg = ImgProcessUtil.parseAfImg(img);
            _this.drawImg(nImg,1);
        });
    },
    testVague:function(){
        var imgUrl = './src/img/test1.jpg';
        var _this =this;
        ImgProcessUtil.loadImg(imgUrl,function(img){
            //var nImg = ImgProcessUtil.parseUGaussImg(img,10);
            _this.drawImg(img);
            //var nImg = ImgProcessUtil.parseGaussImg(img,2);
            //var nImg = ImgProcessUtil.parseVagueImg(img,100);
            //_this.drawImg(nImg);
            var nImg = ImgProcessUtil.parseUVagueImg(img,100);
            //var nImg = ImgProcessUtil.parseDFTImg(img);
            _this.drawImg(nImg,1);
        });
    },
    testDFT:function(){
        var imgUrl = './src/img/test1.jpg';
        var _this =this;
        ImgProcessUtil.loadImg(imgUrl,function(img){
//            var img = ImgProcessUtil.createBWimg(128);
            img = ImgProcessUtil.parseScaleImg(img,1);
//            img = ImgProcessUtil.parseBoxImg(img);
            console.log(img.width);
            console.log(img.height);
            _this.drawImg(img);
            var nImg = ImgProcessUtil.parseDFTImg(img);
            _this.drawImg(nImg,1);
        });
    },
    testOil:function(){
        var imgUrl = './src/img/test2.jpg';
        var _this =this;
        ImgProcessUtil.loadImg(imgUrl,function(img){
            img = ImgProcessUtil.parseScaleImg(img,1);
            //var img = ImgProcessUtil.createBWimg(128);
            _this.drawImg(img);
            var nImg = ImgProcessUtil.parseOilImg(img,1);
            _this.drawImg(nImg,1);
        });
    },
    testFrost:function(){
        var imgUrl = './src/img/test2.jpg';
        var _this =this;
        ImgProcessUtil.loadImg(imgUrl,function(img){
            img = ImgProcessUtil.parseScaleImg(img,0.5);
//            var img = ImgProcessUtil.createBWimg(128);
            _this.drawImg(img);
            var nImg = ImgProcessUtil.parseFrostImg(img,5);
            _this.drawImg(nImg,1);
        });
    },
    testNomic:function(){
        var imgUrl = './src/img/test4.jpg';
        var _this =this;
        ImgProcessUtil.loadImg(imgUrl,function(img){
            img = ImgProcessUtil.parseScaleImg(img,1);
//            var img = ImgProcessUtil.createBWimg(128);
            _this.drawImg(img);
            var nImg = ImgProcessUtil.parseNomicImg(img,20,20,2000,1);
            _this.drawImg(nImg,1);
        });
    }
}


window.onload = function(){
    TestPage.init();
    //TestPage.testReverse();
    //TestPage.testGray();
    //TestPage.testOld();
    //TestPage.testBaoHe();
    //TestPage.testAf();
    //TestPage.testVague();
    //TestPage.testDFT();
    //TestPage.testOil();
    //TestPage.testFrost();
    TestPage.testNomic();
}