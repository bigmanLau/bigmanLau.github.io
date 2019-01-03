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
        scrollView: cc.ScrollView,
        totalCount: 0,
        hero: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() { 
        this.init()
    },
    init() {
        this.heroSlots = []

        for (let index = 0; index < this.totalCount; index++) {
            let heroslot = this.addHeroSlot()
            this.heroSlots.push(heroslot)
        }
    },
    addHeroSlot() {
        let heroslot = cc.instantiate(this.hero)
        this.scrollView.content.addChild(heroslot)
        return heroslot
    },
    show() {
        this.node.active = true;
        this.node.emit('fade-in')

    },
    hide() {
        this.node.emit('fade-out')
    },

    start() {

    },

    // update (dt) {},
});
