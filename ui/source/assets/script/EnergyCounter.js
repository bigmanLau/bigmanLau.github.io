// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        progressBar:cc.ProgressBar,
        leftTimeLabel:cc.Label,
        totalTime:15,
        currentTime:0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        let ration=this.currentTime/this.totalTime;
        this.progressBar.progress=ration;
        this.currentTime += dt;
        let lefttime=this.totalTime-Math.floor(this.currentTime);
        lefttime= lefttime>=10?lefttime:"0"+lefttime;
        this.leftTimeLabel.string="00:"+lefttime; 
        if(this.currentTime>=this.totalTime){
            this.currentTime=0;
        }
    },
});
