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
        subBtnsAnim:cc.Animation,
        btnContainer:cc.Node,
        btnShowSub:cc.Button,
        btnHideSub:cc.Button
    },

    showSubBtns: function () {
        this.btnContainer.active = true;
        this.subBtnsAnim.play('sub_up');
    },

    hideSubBtns: function () {
        this.subBtnsAnim.play('sub_fold');
    },
    onFinishAnim: function (finishFold) {
        this.btnShowSub.active = finishFold;
        this.btnHideSub.active = !finishFold;
    },

    start () {

    },

    // update (dt) {},
});
