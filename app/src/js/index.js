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
    drawImg:function(img){
        var canvas = this.domCanvas;
        var swidth = img.width;
        var sheight = img.height;
        var width = canvas.width;
        var height = width/swidth*sheight;

        this.ctx.drawImage(img,0,0,swidth,sheight,0,0,width,height);
    },
    testReverse:function(){
        var imgUrl = './src/img/test.jpg';
        var _this =this;
        ImgProcessUtil.loadImg(imgUrl,function(img){
            _this.drawImg(img);
            var nImg = ImgProcessUtil.parseReverseImg(img);
            _this.drawImg(nImg);
        });
    },
    testGray:function(){
        var imgUrl = './src/img/test1.jpg';
        var _this =this;
        ImgProcessUtil.loadImg(imgUrl,function(img){
            _this.drawImg(img);
            var nImg = ImgProcessUtil.parseGrayImg(img);
            _this.drawImg(nImg);
        });
    },
    testOld: function () {
        var imgUrl = './src/img/test1.jpg';
        var _this =this;
        ImgProcessUtil.loadImg(imgUrl,function(img){
            _this.drawImg(img);
            var nImg = ImgProcessUtil.parseOldImg(img);
            _this.drawImg(nImg);
        });
    },
    testBaoHe:function(){
        var imgUrl = './src/img/test1.jpg';
        var _this =this;
        ImgProcessUtil.loadImg(imgUrl,function(img){
            _this.drawImg(img);
            var nImg = ImgProcessUtil.parseBaoHeImg(img);
            _this.drawImg(nImg);
        });
    },
    testAf:function(){
        var imgUrl = './src/img/test1.jpg';
        var _this =this;
        ImgProcessUtil.loadImg(imgUrl,function(img){
            _this.drawImg(img);
            var nImg = ImgProcessUtil.parseAfImg(img);
            _this.drawImg(nImg);
        });
    }
}


window.onload = function(){
    TestPage.init();
    //TestPage.testReverse();
    //TestPage.testGray();
    //TestPage.testOld();
    //TestPage.testBaoHe();
    TestPage.testAf();
}