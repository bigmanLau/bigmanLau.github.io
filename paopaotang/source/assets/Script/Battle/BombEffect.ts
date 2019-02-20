const {ccclass, property} = cc._decorator;
@ccclass
export default class BombEffect extends cc.Component {
    private upNode:cc.Node;
    private upScaleNode:cc.Node;
    private downNode:cc.Node;
    private downScaleNode:cc.Node;
    private leftNode:cc.Node;
    private leftScaleNode:cc.Node;
    private rightNode:cc.Node;
    private rightScaleNode:cc.Node;


    private up:number;
    private down:number;
    private left:number;
    private right:number;

    private tileH = 44;
    private tileW = 40;

    private isStartAnim:boolean = false;


    private speed=12;
    /** 往上的动画是否已完成 */
    private upAnimed:boolean = false;
    private downAnimed:boolean=false;
    private leftAnimed:boolean = false;
    private rightAnimed:boolean = false;

    onLoad(){
        this.upNode = this.node.getChildByName("up");
        this.upScaleNode = this.node.getChildByName("upScale");
        
        this.downNode = this.node.getChildByName("down");
        this.downScaleNode = this.node.getChildByName("downScale");

        this.leftNode = this.node.getChildByName("left");
        this.leftScaleNode = this.node.getChildByName("leftScale");

        this.rightNode = this.node.getChildByName("right");
        this.rightScaleNode = this.node.getChildByName("rightScale");
    }

    start(){

    }

    show(up:number,down:number,left:number,right:number){
        this.up = up;
        this.down = down;
        this.left = left;
        this.right = right;
        
        if(this.up>0){
            this.upNode.active = true;
        }
        if(this.down>0){
            this.downNode.active = true;
        }
        if(this.left>0){
            this.leftNode.active = true;
        }
        if(this.right>0){
            this.rightNode.active = true;
        }

        this.isStartAnim=true;        
    }

    update(){
        if(!this.isStartAnim) return;
        if(!this.upAnimed){
            //往上的动画没有完成的时候
            if(this.upScaleNode.height<(this.up-1)*this.tileH){                
                this.upScaleNode.height+=this.speed;                
            }
            if(this.upNode.y<(this.up)*this.tileH){
                this.upNode.y+=this.speed;
            }else{
                this.upNode.y = this.up*this.tileH;
                this.upAnimed = true;
            }
        }
        if(!this.downAnimed){
            if(this.downScaleNode.height<(this.down-1)*this.tileH){
                this.downScaleNode.height+=this.speed;
            }
            if(this.downNode.y>-this.down*this.tileH){
                this.downNode.y-=this.speed;
            }else{
                this.downNode.y=-this.down*this.tileH;
                this.downAnimed=true;
            }
        }
        if(!this.leftAnimed){            
            if(this.leftScaleNode.width<(this.left-1)*this.tileW){                
                this.leftScaleNode.width+=this.speed;
            }
            if(this.leftNode.x>-this.left*this.tileW){
                this.leftNode.x-=this.speed;
            }else{
                this.leftNode.x=-this.left*this.tileW;
                this.leftAnimed = true;
            }
        }
        
        if(!this.rightAnimed){            
            if(this.right>0 && this.rightScaleNode.width<(this.right-1)*this.tileW ){
                this.rightScaleNode.width+=this.speed;
            }
            if(this.rightNode.x<this.right*this.tileW){
                this.rightNode.x+=this.speed
            }else{
                this.rightNode.x = this.right*this.tileW;
                this.rightAnimed=true;
            }
        }

        if(this.upAnimed && this.downAnimed && this.leftAnimed && this.rightAnimed){
            this.isStartAnim = true;
            this.node.parent = null;
        }
    }




    
}
