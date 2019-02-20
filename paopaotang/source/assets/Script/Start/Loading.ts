
const { ccclass, property } = cc._decorator;
@ccclass
export default class Loading extends cc.Component {

    

    onLoad () {
        cc.loader.loadResDir("",(err,res)=>{
            cc.director.loadScene("Battle");
        })
    }

}
