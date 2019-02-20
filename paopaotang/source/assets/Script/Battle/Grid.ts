import Terrain from "./Terrain";
import Bomb from "./Bomb";

export default class Grid {
    private x: number;
    private y: number;
    private maxX: number;
    private maxY: number;
    private data: any = null;

    /**
     * 存储所有格式信息数组 最大长度是maxX*maxY
     */
    parent: Grid[];

    /**
     * 取得左边格子
     */
    get left() {
        var x = this.x - 1;
        if (x < 0) return false;
        return this.getGrid(x, this.y)
    }

    /**
    * 取得右边格子
    */
    get right() {
        var x = this.x + 1;
        if (x >= this.maxX) return false;
        return this.getGrid(x, this.y);
    }

    /**
        * 取得上边格子
        */
    get up() {
        var y = this.y - 1;
        if (y <= 0) return false;
        return this.getGrid(this.x, y)
    }

    private _down;
     /**
     * 取得下边格子
     */
    get down() {
        var y = this.y + 1;
        if (y >= this.maxY) return false;
        return this.getGrid(this.x, y)
    }
    
    /**
     * 构造函数
     * @param x 当前格子所在横坐标 
     * @param y 当前格子所在纵坐标
     * @param mx 当前格子最大宽度
     * @param my 当前格子最大高度
     * @param data 当前格子的tile数据元 添加了碰撞大小的瓦片数据
     */
    constructor(x: number, y: number, mx: number, my: number, data?: any) {
        this.x = x;
        this.y = y;
        this.maxX = mx;
        this.maxY = my;
        if (data) {
            this.data = data;
        }
    }

    /** 设置格子内的数据 */
    setData(data: any) {
        this.data = data;
    }
    /** 获取格子内的数据 */
    getData<T>() {
        if (this.data) {
            return this.data as T;
        }
        return null;
    }
    /** 移除格子内的数据 */
    rmData() {
        this.data = null;
    }

    /**
     * 根据坐标获取格子
     * @param x  横坐标
     * @param y  纵坐标
     */
    getGrid(x, y) {
        let index = Math.floor(x) + Math.floor(y) * this.maxX;
        return this.parent[index];
    }

    /** 清除格子内的数据 */
    clear() {
        //如果格子内是图块
        if (this.data instanceof cc.TiledTile) {
            this.data.node.parent = null;
            Terrain.Instance.removeTile(this.x, this.y);
        }
        //如果格子内是炸弹
        this.data = null

    }
}