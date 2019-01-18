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
enum DIR {LEFT, RIGHT, UP,DOWN};
@ccclass
export default class Enermy extends cc.Component {


    // LIFE-CYCLE CALLBACKS:
    _tileX: number = 0;


    _tileY: number = 0;

    x: number = 0;


    y: number = 0;
    count:number=0;
    mainLayer: cc.TiledLayer;

    brickLayer: cc.TiledLayer;
    /**
     * 方向 1 横向左移 2 横向右移  3竖向上移 4竖向下移
     */
    private dir: number = 1;
    

    onLoad() {
    //   this.schedule(()=>{
    //     this.doMove()
    //   },1)
    }

    doMove() {
        let x=this._tileX;
        let y=this._tileY;
        this.dir=Math.floor(Math.random()*4+1)
        if (this.dir == 1) {
           x--;
        }
        if (this.dir == 2) {
            x++;
        }
        if (this.dir == 3) {
          y--;
        }
        if (this.dir == 4) {
            y++;
        }
        this.move(x,y);
    }

    move(x, y) {
        let tilePos = cc.v2(x, y)
        if (this.mainLayer.getTileGIDAt(tilePos)) {
            return false;
        }
        if (this.brickLayer.getTileGIDAt(tilePos)) {
            return false;
        }
        this._tileX = x;
        this._tileY = y;
        let realPos = this.mainLayer.getPositionAt(tilePos)
        this.node.setPosition(realPos)
    }
 
    update(dt){
        // 敌人的逻辑
        if(this.count+dt>60){
            this.doMove();
            this.count=0;
        }else{
            this.count++;
        }
       
    }
}
