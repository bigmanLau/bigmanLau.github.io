import Grid from "./Grid";
import Terrain from "./Terrain";
import Player from "./Player";
import BombEffect from "./BombEffect";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bomb extends cc.Component {   
    private boxCollider:cc.BoxCollider;
    isPlayerStop:boolean = false;

    /** 是否已爆炸 */
    private isBombed:boolean=false;
    private effectPrefab:cc.Prefab;


    grid:Grid
    player:Player

    private timer=2;
    private index=0;

   
    onLoad () {
        this.boxCollider = this.getComponent(cc.BoxCollider);
        this.effectPrefab = cc.loader.getRes("Bomb/Effect");
    }

    update(dt){
        if(this.isBombed) return;
        if(this.index>=this.timer){
            this.Bomb();
            return;
        }
        this.index+=dt;
    }

    onCollisionExit(other,self){        
        if(!this.isPlayerStop){            
            if(other.node==this.player.node){
                this.isPlayerStop = true;
            }            
        }
    }

    Bomb(){
        
        if(this.isBombed) return;

        this.index=0;
        this.isBombed = true;

        var up = this.getLength("up");
        var down = this.getLength("down");
        var left = this.getLength("left");
        var right = this.getLength("right");
      
      
        
        var node = cc.instantiate(this.effectPrefab);
        node.position = this.node.position;
        node.parent = this.node.parent;
        node.getComponent(BombEffect).show(up,down,left,right);

        this.grid.clear();

        this.node.parent = null;
    }

    getLength(dir:string){
        //往上炸
        var res = 0;     
        debugger   
        var grid = this.grid[dir];
   
        var length = this.player.getPower();

        while(length){            
            length--;            
       
            if(grid===false) break;
            if(grid.data==null){
                res++;
            }else{                
                //先判断g1.data 是tile 还是Bomb
            
                if( grid.data instanceof cc.TiledTile ){
                    //判断地图是可破坏的 还是不可破坏的
                    var attr = Terrain.Instance.getAttr(grid.data.gid);                
                    if(attr.sturdy=="false"){//可破坏的                    
                        res++;                        
                        //清除这个图块
                        grid.clear();
                    }
                    break;
                }else if(grid.data instanceof Bomb){
                    cc.log("炸弹")
                    grid.data.Bomb();
                }
            }                    
            grid = grid[dir]
        }        
        return res
    }

}
