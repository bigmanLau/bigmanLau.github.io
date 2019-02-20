import Terrain from "./Terrain";
import Player from "./Player";
import Role from "./Role";

const { ccclass, property } = cc._decorator;
@ccclass
export default class Map extends cc.Component {
    private tiledMap: cc.TiledMap;
    private playerPrefab:cc.Prefab;

    private players:Player[]=[]


    onLoad() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;
        cc.debug.setDisplayStats(false)

        this.playerPrefab = cc.loader.getRes("Player/Player",cc.Prefab);

        this.node.on("PlayerDie",this.PlayerDie,this);
    }
    start() {
        this.tiledMap = this.getComponent(cc.TiledMap);

        //加载地图 对地图进行地形数据处理
        var terrain = new Terrain(this.tiledMap)


        //创建游戏玩家            
        var node = cc.instantiate(this.playerPrefab);
        node.parent = this.node;
        var p1 = node.getComponent(Player)
        p1.init("宝宝",cc.v2(0,1));
        

          var keyValue = {
                up:38,
                down:40,
                left:37,
                right:39,
                attack:110            
        }
        var node1 = cc.instantiate(this.playerPrefab);
        node1.parent = this.node;
        var p2 = node1.getComponent(Player)
        p2.init("海盗船长",cc.v2(14,13),keyValue);        

        this.players.push(p1,p2);
        cc.log(this.players);
    }

    PlayerDie(event:cc.Event.EventCustom){

        for(var i=this.players.length-1;i>=0;i--){

            if(this.players[i].node==event.target){
                this.players.splice(i,1);
            }
        }

        if(this.players.length==1){
            this.players[0].state=5;

            //5秒后 重新开局
            this.scheduleOnce(()=>{               
                //cc.director.loadScene("Start");
            },5)

        }

    }
}

