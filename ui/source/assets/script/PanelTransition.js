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
        duration: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //we cannot see it
        this.outOfWorld = cc.v2(3000, 0)
        this.node.position = this.outOfWorld
        let cbFadeOut = cc.callFunc(this.onFadeOutFinish, this)
        let cbFadeIn = cc.callFunc(this.onFadeInFinish, this)
        this.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(this.duration, 255), cc.scaleTo(this.duration, 1.0)), cbFadeIn)
        this.actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(this.duration, 0), cc.scaleTo(this.duration, 2.0)), cbFadeOut)
        this.node.on('fade-in', this.startFadeIn, this)
        this.node.on('fade-out', this.startFadeOut, this)

    },
    startFadeIn() {
        this.node.pauseSystemEvents(true)
        this.node.position = cc.v2(0, 0)
        this.node.setScale(2)
        this.node.opacity = 0;
        this.node.runAction(this.actionFadeIn)
    },
    startFadeOut() {
        this.node.pauseSystemEvents(true)
        this.node.runAction(this.actionFadeOut)
    },
    onFadeOutFinish() {
        this.node.position = this.outOfWorld;
    },
    onFadeInFinish() {
        this.node.resumeSystemEvents(true)
    },

    start() {

    },

    // update (dt) {},
});
