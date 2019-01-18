// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import Player from './player'
import Enermy from './enermy'
const { ccclass, property } = cc._decorator;

@ccclass
export default class Map extends cc.Component {

    @property(cc.TiledMap)
    map: cc.TiledMap = null;

    @property(cc.Prefab)
    enermy: cc.Prefab = null;

    @property(cc.Prefab)
    player: cc.Prefab = null;

    @property(cc.Prefab)
    bombPrefab: cc.Prefab;

    @property(cc.TiledLayer)
    mainLayer: cc.TiledLayer = null;

    @property(cc.TiledObjectGroup)
    objectLayer: cc.TiledObjectGroup = null;

    @property(cc.TiledLayer)
    brickLayer: cc.TiledLayer = null;

    /**
     * 玩家脚本
     */
    private playerComponent: Player;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.loadMap()
        this.mainLayer.node.on("exploded", () => {
            if (this.brickLayer.getTileGIDAt(this.playerComponent.bombTile.x-1,this.playerComponent.bombTile.y)){
               cc.log("left")
               this.brickLayer.setTileGIDAt(0,this.playerComponent.bombTile.x-1,this.playerComponent.bombTile.y)
            }
            if (this.brickLayer.getTileGIDAt(this.playerComponent.bombTile.x+1,this.playerComponent.bombTile.y)){
                cc.log("right")
                this.brickLayer.setTileGIDAt(0,this.playerComponent.bombTile.x+1,this.playerComponent.bombTile.y)
             }
             if (this.brickLayer.getTileGIDAt(this.playerComponent.bombTile.x,this.playerComponent.bombTile.y-1)){
                cc.log("up")
                this.brickLayer.setTileGIDAt(0,this.playerComponent.bombTile.x,this.playerComponent.bombTile.y-1)
             }
             if (this.brickLayer.getTileGIDAt(this.playerComponent.bombTile.x,this.playerComponent.bombTile.y+1)){
                cc.log("down")
                this.brickLayer.setTileGIDAt(0,this.playerComponent.bombTile.x,this.playerComponent.bombTile.y+1)
             }

            
            this.mainLayer.node.removeChild(this.playerComponent.bomb)
            this.playerComponent.bomb=null;
       }, this)
    }

    /**
     * 加载地图
     */
    loadMap() {

        let objects = this.map.getObjectGroup('object').getObjects();
        objects.forEach(item => {
            if (item.type == 0) {
                this.playerGenarate(item)
            } else if (item.type == 1) {
                this.enerymyGenarate(item)
            }
        })


    }

    /**
     *生成敌人列表
     */
    enerymyGenarate(item) {
        let enermyItem = cc.instantiate(this.enermy)
        this.map.node.addChild(enermyItem)
        let pos = cc.v2(item.offset.x, item.offset.y)
        let tile = this.getTilePosition(pos);
        let pos2 = this.mainLayer.getPositionAt(tile)

        let comp = enermyItem.getComponent(Enermy);
        comp._tileX = tile.x;
        comp._tileY = tile.y;
        comp.mainLayer = this.mainLayer;
        comp.brickLayer = this.brickLayer;
    
        enermyItem.setAnchorPoint(0, 0);
        enermyItem.setPosition(pos2)
    }

    /**
     *生成玩家数据
     */
    playerGenarate(item) {
        let enermyItem = cc.instantiate(this.player)
        this.objectLayer.node.addChild(enermyItem)
        let pos = cc.v2(item.offset.x, item.offset.y)
        let tile = this.getTilePosition(pos);

        let pos2 = this.mainLayer.getPositionAt(tile)
        let comp = enermyItem.getComponent(Player);
        comp._tileX = tile.x;
        comp._tileY = tile.y;
        comp.mainLayer = this.mainLayer;
        comp.brickLayer = this.brickLayer;
        comp._map = this.map;
        comp.bombPrefab = this.bombPrefab;
        this.playerComponent = comp;

        enermyItem.setAnchorPoint(0, 0);
        if (pos2) {
            enermyItem.setPosition(pos2)
        }

    }
    /**
     * 将地图中的坐标转为瓦片的坐标
    */
    public getTilePosition(posInPixel) {
        let mapSize = this.node.getContentSize();
        let tileSize = this.map.getTileSize();
        let x = Math.floor(posInPixel.x / tileSize.width);
        let y = Math.floor(posInPixel.y / tileSize.height);
        return cc.v2(x, y);
    }

    start() {

    }

    // update (dt) {}
}
