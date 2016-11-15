"use strict";

var TestPage = {
    canvas:null,
    domCanvas:null,
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
    }
}


window.onload = function(){
    TestPage.init();
}