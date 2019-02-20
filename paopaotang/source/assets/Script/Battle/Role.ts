interface RoleData{
    /** 名称 */
    name:string
    /** 图集名 */
    texture:string
    /** 当前可放炸弹数量 */
    count:number
    /** 最大可放炸弹数量 */
    maxcount:number
    /** 炸弹的当前威力 */
    power:number
    /** 炸弹的最大威力 */
    maxpower:number
    /** 移动速度 */
    speed:number
    /** 最大移动速度 */
    maxspeed:number
    /** 描述 */
    desc:string
}

const {ccclass, property} = cc._decorator;
@ccclass
export default class Role{
    static readonly Instance:Role=new Role;
    private data:RoleData[]=[
        {
            name:"宝宝",
            texture:"role1",
            count:1,
            maxcount:6,
            power:1,
            maxpower:7,
            speed:5,
            maxspeed:9,
            desc:"又懒又爱睡觉，但是很乐观的孩子。"
        },
        {
            name:"海盗船长",
            texture:"role2",
            count:3,
            maxcount:10,
            power:6,
            maxpower:10,
            speed:3,
            maxspeed:10,
            desc:"以再洗为中心活动的海盗头领，很残忍，不喜欢孩子，但是怕水的很奇怪的海盗。"
        }
    ];
    
    getRole(name:string){
        for(var i=0;i<this.data.length;i++){
            if(this.data[i].name==name){
                return this.data[i];
            }
        }
    }
}


