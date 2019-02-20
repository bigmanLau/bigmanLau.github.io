import Terrain from "./Terrain";
import Bomb from "./Bomb";
import Role from "./Role";


const {ccclass, property} = cc._decorator;
@ccclass
export default class Player extends cc.Component {
  
    private roleAnimCom:cc.Animation
    private effectAnimCom:cc.Animation;

    private boxCollider:cc.BoxCollider;
    
    private roleData;
    
    /** 状态 1正常 2移动 3被困 4死亡 5胜利 */
    private _state:number=1;
    set state(value){
        if(this.state==value) return;
        this._state = value;
        this.playAnim();
    }
    get state(){
        return this._state
    }
    /** 方向 1上 2下 3左 4右 */
    private _dir:number=1;
    get dir(){
        return this._dir;
    }
    set dir(value){
        if(this.dir==value)return;
        this._dir = value;
        this.playAnim();
    }
    /** 移动速度 */
    private speed:number=3


    private lastPosition:cc.Vec2;
    private isCollider:boolean=false;
    private offsetDir:number=0;

    private max_inclusive:cc.Vec2;
    private min_inclusive:cc.Vec2;
 
    /** 威力 */
    private power:number = 1;
   
    /** 死亡倒计时 */
    private dieTimer=5;
    private dieIndex=0;
    



    private _terrain:Terrain;
    get terrain(){
        if(!this._terrain){
            this._terrain = new Terrain()
        }
        return this._terrain;
    }
  
    private bombPrefab:cc.Prefab;

    private keyValue={
        up:87,
        down:83,
        left:65,
        right:68,
        attack:17
    }



    onLoad(){  
        this.bombPrefab = cc.loader.getRes("Bomb/Bomb",cc.Prefab);
        this.roleAnimCom = this.node.getChildByName("texture").getComponent(cc.Animation);
        this.effectAnimCom = this.node.getChildByName("effect").getComponent(cc.Animation);
        this.boxCollider = this.getComponent(cc.BoxCollider);
        
        var size = this.boxCollider.size;
        this.min_inclusive = cc.v2(size.width/2,size.height/2) 
        var map = this.terrain.mapContentSize;
        map.y-=this.terrain.tileSize.y;
        this.max_inclusive = map.sub(this.min_inclusive);
        

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.KeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.KeyUp,this);
        
    }

    init(name:string,position:cc.Vec2,keyValue?:any){                             
        if(keyValue){
            this.keyValue = keyValue;
        }
        this.node.position = this.terrain.getTilePosition( position );                       
        
        var data = Role.Instance.getRole(name);
        this.roleData = data;
        
        //创建动画
        var atlas:cc.SpriteAtlas = cc.loader.getRes("Role/"+data.texture,cc.SpriteAtlas);
        //创建待机与移动4方向动画
        for(var i=1;i<=4;i++){
            var clip = cc.AnimationClip.createWithSpriteFrames( [atlas.getSpriteFrame("1"+i+"1")] ,1 ) ;
            clip.name = "1-"+i;
            this.roleAnimCom.addClip(clip)

            //移动
            var sps=[];
            for(var j=1;j<=6;j++){
                sps.push( atlas.getSpriteFrame("2"+i+j) );
            }

            var clip1 = cc.AnimationClip.createWithSpriteFrames( sps as [cc.SpriteFrame],6 );
            clip1.name="2-"+i;
            clip1.wrapMode = cc.WrapMode.Loop;
            this.roleAnimCom.addClip(clip1)
        }

        //创建死亡动画
        var sps = [];
        for(var i=1;i<=11;i++){
            var key = i<10?("0"+i):i.toString();
            sps.push(atlas.getSpriteFrame("4"+key)) 
        }
        var clip2 = cc.AnimationClip.createWithSpriteFrames( sps as [cc.SpriteFrame],11);
        clip2.name = "4";
        this.roleAnimCom.addClip(clip2)

        //创建胜利动画
        sps = [];
        for(var i=1;i<=8;i++){
            sps.push(atlas.getSpriteFrame("50"+i));
        }
        var clip3 = cc.AnimationClip.createWithSpriteFrames( sps as [cc.SpriteFrame],8 )
        clip3.name = "5";
        clip3.wrapMode = cc.WrapMode.Loop;
        this.roleAnimCom.addClip(clip3);

        this.speed = this.roleData.speed;
        this.power = this.roleData.power;

        this.playAnim();
        
    }


    /** 播放动画 */
    playAnim(){
        var state = this.state;
        var dir = this.dir;        
        this.node.pauseAllActions()
                

        if(state<=2){
            var name = state+"-"+dir;
            this.roleAnimCom.node.scale = 1;
            this.effectAnimCom.stop();
            this.roleAnimCom.play(name);
        }
        if(state==3){            
            this.roleAnimCom.stop();
            this.roleAnimCom.node.scale = 0.8;
            this.effectAnimCom.play("3");
            this.effectAnimCom.on("finished",()=>{
                var a1 = cc.moveBy(0.6,0,5);
                var a2 = cc.moveBy(0.6,0,-5);
                var a3 = cc.moveBy(0.6,0,-5);
                var a4 = cc.moveBy(0.6,0,5);
                var seq = cc.sequence(a1,a2,a3,a4); 
                var f = cc.repeatForever(seq);       
                f.setTag(9);                
                this.node.runAction(f)
            })    
        }else if(state==4){            
            this.effectAnimCom.play("4");
            var event = new cc.Event.EventCustom("PlayerDie",true);
            this.node.dispatchEvent(event);
            this.effectAnimCom.on("finished",()=>{
                this.roleAnimCom.node.scale=1;
                this.roleAnimCom.play("4");
            })
        }else if(state==5){
            this.roleAnimCom.play("5");
        }
    }
  

    KeyDown(event:cc.Event.EventKeyboard){                
        if(this.state>2) return ;
        switch(event.keyCode){
            case this.keyValue.up://上
                this.dir = 1;
                this.state=2;                
            break
            case this.keyValue.down://下
                this.dir = 2;                
                this.state=2;                
            break
            case this.keyValue.left://左
                this.dir = 3;                
                this.state=2;                
            break
            case this.keyValue.right://右
                this.dir = 4;                
                this.state=2;                
            break
        }
    }
    KeyUp(event:cc.Event.EventKeyboard){
        if(this.state>2) return ;
        switch(event.keyCode){
            case this.keyValue.up://上
            case this.keyValue.down://下
            case this.keyValue.left://左
            case this.keyValue.right://右
                this.state = 1;                  
            break
            case this.keyValue.attack: //空格                
                this.putBomb();
            break
        }    
    }

    /** 放炸弹 */
    putBomb(){
        //先判断当前地点是否存在炸弹
       
        
      
        var grid = this.terrain.getGrid(this.node.position,true);
        if(grid.getData()) return false;
               
        //将炸弹放到格子内 设置炸弹的格子
        var node = cc.instantiate(this.bombPrefab);        
        node.parent = this.node.parent;
        node.position = this.terrain.normalizeV2(this.node.position);
        var bomb = node.getComponent(Bomb);
        bomb.player = this;        
        bomb.grid = grid;
        grid.setData(bomb);
    }

    /** 获取炸弹的威力 */
    getPower(){
        return this.power;
    }

    /** 升级炸弹威力 */
    upPower(){
        this.power++;
    }

    update(dt){
        // console.log("update")
        if(this.state==2){       
            this.move()
        }
        if(this.state==3){
            if(this.dieIndex>=this.dieTimer){
                this.dieIndex =0;            
                this.state=4;
                return;
            }
            this.dieIndex+=dt                        
        }

    }
    private move(){        
        //根据方向移动
        var v2 = cc.Vec2.ZERO;
        switch(this.dir){
            case 1:
                v2.y=1
            break;
            case 2:
                v2.y=-1
            break;
            case 3:
                v2.x=-1
            break;
            case 4:
                v2.x=1
            break;
        }

        v2.mulSelf(this.speed);


        //当前人物的位置
        var p1 = this.node.position.clone();
        //移动后的人物位置
        p1 = p1.add(v2);

        
        p1 = p1.clampf(this.min_inclusive,this.max_inclusive)        
        this.node.position = p1;  
      
    }

    lateUpdate(){        
        // console.log("lateUpdate")
        if(this.state==2&&this.isCollider){     
            var p1 = this.lastPosition;
            console.log(p1)
            if(this.offsetDir){
                switch(this.offsetDir){
                    case 1:
                        p1.y+=this.speed;
                    break;
                    case 2:
                        p1.y-=this.speed;
                    break
                    case 3:
                        p1.x-=this.speed
                    break;
                    case 4:
                        p1.x+=this.speed
                    break
                }

            }
            this.node.position = p1;                                
        }
        this.lastPosition = this.node.position;        
    }

    onCollisionEnter(other:cc.BoxCollider,self:cc.BoxCollider){                      
        if(other.node.group=="Attack"){                        
            this.state = 3;
            return ;
        }
        
        var isBombMove=false;
        if(other.node.group=="Bomb"){
            var bomb = other.getComponent(Bomb);      
            if(!bomb.isPlayerStop && bomb.player==this){
                isBombMove = true
            }
        }



        this.offsetDir = 0;
        var rect1 = self.world.aabb;
        var rect2 = other.world.aabb;

        if(this.dir==3 || this.dir==4){
            if(rect1.y<(rect2.y-rect2.height/2) ){        
                this.offsetDir = 2
            }
            if(rect1.y>(rect2.y+rect2.height/2)){
                this.offsetDir = 1            
            }    
        }
        if(this.dir==1 || this.dir==2){            
            if(rect1.x<(rect2.x-rect2.width/2)){
                this.offsetDir = 3;
            }
            if(rect1.x>(rect2.x+rect2.width/2)){
                this.offsetDir = 4
            }
        }


        if(isBombMove){

        }else{
            this.isCollider = true;    
        }
        
    }
    onCollisionExit(){
        this.isCollider = false;
    }


}
