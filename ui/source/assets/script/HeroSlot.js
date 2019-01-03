const getRandomInt = function (min, max) {
    var ratio = Math.random();
    return min + Math.floor((max - min) * ratio);
};
cc.Class({
    extends: cc.Component,

    properties: {
        bgs: {
            default: [],
            type: cc.SpriteFrame
        },
        heros: {
            default: [],
            type: cc.SpriteFrame
        },
        stars: {
            default: [],
            type: cc.Sprite
        },
        heroLevel:{
            default:null,
            type:cc.Label
        },
        bg: cc.Sprite,
        hero: cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.refresh()
    },
    refresh() {
        //背景
        let bgIndex = getRandomInt(0, this.bgs.length)
        this.bg.spriteFrame = this.bgs[bgIndex]

        //英雄
        let heroIndex = getRandomInt(0, this.heros.length)
        this.hero.spriteFrame = this.heros[heroIndex]

        //星星
        let starIndex = getRandomInt(0, this.stars.length)
        this.refreshStars(starIndex)


        //等级
        let levelIndex=getRandomInt(0,100)
        this.heroLevel.string = 'LV.' + levelIndex;
    },

    refreshStars(starIndex) {
        for (let index = 0; index < this.stars.length; index++) {
            if(index<starIndex){
                this.stars[index].enabled = true;
            }else{
                this.stars[index].enabled = false;
            }
          
        }
    },

    // update (dt) {},
});
