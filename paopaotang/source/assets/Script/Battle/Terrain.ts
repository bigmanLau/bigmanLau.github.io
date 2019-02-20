import Grid from "./Grid";



export default class Terrain {
    static Instance: Terrain;

    private tiledMap: cc.TiledMap;
    //图块的数量
    private mapSize: cc.Vec2;
    //图块的大小
    tileSize: cc.Vec2;
    //图块层        
    private square: cc.TiledLayer;
    mapContentSize:cc.Vec2;

    /** 地形 */
    private terrain: Grid[] = [];

    constructor(tiledMap?: cc.TiledMap) {
        
        if (Terrain.Instance) return Terrain.Instance;
        if (!tiledMap) return;
        Terrain.Instance = this;
        this.tiledMap = tiledMap;
        this.square = this.tiledMap.getLayer("Square");
     
        this.init();
    }
    /** 初始化地形 
     * 计算地图的X对应地形的Y 计算地图的Y对应地形的X
    */
    private init() {        
        //图边的大小 即地形分块大小
        var tileSize = this.tiledMap.getTileSize();
        this.tileSize = new cc.Vec2(tileSize.width, tileSize.height);

        //获取地图的长宽
        var size = this.tiledMap.getMapSize();
        

        this.mapSize = cc.v2(size.width, size.height);
        this.mapContentSize = cc.v2(this.tileSize.x*this.mapSize.x,this.tileSize.y*this.mapSize.y) 


        var GridSize = this.mapSize.x*this.mapSize.y;
            
        
       
        //tileMap地图坐标以左上角为原点 往右是x正方向 往下是y正方向
     
        for(var x=0;x<size.width;x++){
            for(var y=0;y<size.height;y++){                                
                var tile = this.getTile(x,y) as cc.TiledTile;                        
                var grid = new Grid(x,y,this.mapSize.x,this.mapSize.y,tile);
                grid.parent = this.terrain;
                var index = x+y*size.width;
                this.terrain[index] = grid;                    
            }
        }
            
    }

    private getTile(x,y){      
        var tile = this.square.getTiledTileAt(x,y,true);                
        if(tile.gid>0){
            var attr = this.tiledMap.getPropertiesForGID(tile.gid);
            if(attr){
                //给不同的tile碰撞器加上不同的Tag
                if(!tile.getComponent(cc.BoxCollider)){
                    var boxCollider = tile.node.addComponent(cc.BoxCollider);                        
                    tile.node.group = "Tile";
                    boxCollider.size = new cc.Size(this.tileSize.x,this.tileSize.y);
                    boxCollider.offset.x = this.tileSize.x/2;
                    boxCollider.offset.y = this.tileSize.y/2;    
                }
                return tile;                      
            }
        }
        return null;
    }

    /**
     * 获取地图坐标
     * 地图上的实际像素点转换成地图坐标点     
     */
    convertToMapSpace(point:cc.Vec2){
        var x = Math.floor(point.x/this.tileSize.x);
        var y = Math.ceil( (this.mapSize.y*this.tileSize.y-point.y)/this.tileSize.y )-1;
        return new cc.Vec2(x,y);
    }

    /** 获取图块的中心点位置像素坐标 */
    getTilePosition(v2:cc.Vec2){
        console.log(v2)        
        var v2 = this.square.getPositionAt(v2);   
        console.log(v2)  
        console.log(this.tileSize.mul(0.5))    
        console.log(v2.add( this.tileSize.mul(0.5)))
        console.log("---------------")                
        return v2.add( this.tileSize.mul(0.5) );
    }

    /**
     * 规范坐标点
     * 将像素坐标规范化
     */
    normalizeV2(v2:cc.Vec2){
        var mv = this.convertToMapSpace(v2);
        var x = mv.x*this.tileSize.x+this.tileSize.x/2
        var y = (this.mapSize.y-mv.y)*this.tileSize.y-this.tileSize.y/2
        return new cc.Vec2(x,y);
    }
    /**
     * 根据地图坐标 获取Grid
     * @param v2 
     */
    getGrid(v2:cc.Vec2,flag:boolean=false){
        if(flag){
            v2 = this.convertToMapSpace(v2);
        }
        
     
        var x = v2.x;
        var y= v2.y;        
        let index = Math.floor(x) + Math.floor(y) * this.mapSize.x;        
        return this.terrain[index];
    }

    /** 获取图块属性 */
    getAttr(gid:number){        
        return this.tiledMap.getPropertiesForGID(gid)
    }

    /** 移除图块 */
    removeTile(x,y){                      
        this.square.setTileGIDAt(0,x,y);            
    }

}

 