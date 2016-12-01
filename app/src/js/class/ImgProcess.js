"use strict";
var HClass = require('./base/HClass');
var ReverseOperation = require('./ReverseOperation');
var GrayOperation = require('./GrayOperation');
var OldOperation = require('./OldOperation');
var BaoHeOperation = require('./BaoHeOperation');
var AfOperation = require('./AfOperation');
var VagueOperation = require('./VagueOperation');
var UVagueOperation = require('./UVagueOperation');
var GaussOperation = require('./GaussOperation');
var UGaussOperation = require('./UGaussOperation');
var DFTOperation = require('./DFTOperation');
var OilOperation = require('./OilOperation');
var FrostOperation = require('./FrostOperation');
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
    uvague:function(px){
        var op = new UVagueOperation(this.img);
        this.img = op.operate(this.img,px);
        return this;
    },
    gauss:function(px){
        var op = new GaussOperation(this.img);
        this.img = op.operate(this.img,px);
        return this;
    },
    ugauss:function(px){
        var op = new UGaussOperation(this.img);
        this.img = op.operate(this.img,px);
        return this;
    },
    dft:function(){
        var op = new DFTOperation(this.img);
        this.img = op.operate(this.img);
        return this;
    },
    oil:function(r,grayNum){
        var op = new OilOperation(this.img);
        this.img = op.operate(this.img,r,grayNum);
        return this;
    },
    frost:function(r){
        var op = new FrostOperation(this.img);
        this.img = op.operate(this.img,r);
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