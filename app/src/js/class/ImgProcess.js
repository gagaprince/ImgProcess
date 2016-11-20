"use strict";
var HClass = require('./HClass');
var ReverseOperation = require('./ReverseOperation');
var GrayOperation = require('./GrayOperation');
var OldOperation = require('./OldOperation');
var BaoHeOperation = require('./BaoHeOperation');
var AfOperation = require('./AfOperation');
var VagueOperation = require('./VagueOperation');
var ImgProcess = HClass.extend({
    img:null,
    ctor:function(img){
        this.img = img;
    },
    reverse:function(){
        var op = new ReverseOperation(this.img);
        this.img = op.operate();
        return this;
    },
    gray:function(){
        var op = new GrayOperation(this.img);
        this.img = op.operate();
        return this;
    },
    old:function(){
        var op = new OldOperation(this.img);
        this.img = op.operate();
        return this;
    },
    baohe:function(){
        var op = new BaoHeOperation(this.img);
        this.img = op.operate();
        return this;
    },
    touming:function(){
        var op = new AfOperation(this.img);
        this.img = op.operate();
        return this;

    },
    vague:function(px){
        var op = new VagueOperation(this.img);
        this.img = op.operate(this.img,px);
        return this;
    },
    createImg:function(){
        return this.img;
    }
});
ImgProcess.create = function(img){
    return new ImgProcess(img);
}
module.exports = ImgProcess;