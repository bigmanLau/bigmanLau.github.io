// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;


@ccclass
export default class Player extends cc.Component {


    private dir: number;

    _tileX: number=0;


    _tileY: number=0;


    mainLayer:cc.TiledLayer;

    brickLayer:cc.TiledLayer;

    bombPrefab:cc.Prefab;

    _map:cc.TiledMap;
    frames:[cc.SpriteFrame];
    bomb:cc.Node;
    bombTile:cc.Vec2;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    
     
        
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.goLeft();
                break;
            case cc.macro.KEY.right:
                this.goRight();
                break;
            case cc.macro.KEY.up:
                this.goUp();
                break;
            case cc.macro.KEY.down:
                this.goDown();
                break;
            case cc.macro.KEY.space:
                this.releaseBomb();
                break;

        }

    }
    goLeft() {
      
        this.dir = 3;
        this.movePlay(  this._tileX-1,this._tileY);
    }
    goRight() {
        this.dir = 4;
        this.movePlay(this._tileX+1,this._tileY);
    }
    goUp() {
        this.dir = 1;
        this.movePlay(this._tileX,this._tileY-1);
    }
    goDown() {
        this.dir = 2;
        this.movePlay(this._tileX,this._tileY+1);
    }
    releaseBomb() {
        if(!this.bomb){
        let bomb = cc.instantiate(this.bombPrefab);
        this.bombTile = cc.v2(this._tileX,this._tileY);
        bomb.setAnchorPoint(0, 0);
        this.mainLayer.node.addChild(bomb);
        let pos = this.mainLayer.getPositionAt(this.bombTile);
        bomb.setPosition(pos);
        this.bomb=bomb;
        }
    }

    /**
     * 移动玩家
     */
    movePlay(x,y) {
        let tilePos = cc.v2(x, y)
        if(this.mainLayer.getTileGIDAt(tilePos)){
            return false;
        }
        if(this.brickLayer.getTileGIDAt(tilePos)){
            return false;
        }
        this._tileX=x;
        this._tileY=y;
        let realPos=this.mainLayer.getPositionAt(tilePos)
        this.node.setPosition(realPos)
    }
}
