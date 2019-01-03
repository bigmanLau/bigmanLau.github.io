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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        anim:cc.Animation,
        figure:cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.figure.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1,1,0.96), cc.scaleTo(1, 1, 1))))
    },
    show() {
        this.node.active = true;
        this.playstate=this.anim.play('shop_intro');
    },
    hide() {
    
        this.anim.play('shop_out');
    },
    onOutFinish(){
         this.node.active=false;
    },
    start() {

    },

    // update (dt) {},
});
