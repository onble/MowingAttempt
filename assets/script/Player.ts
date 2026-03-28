import { _decorator, Collider2D, Component, Contact2DType, Node, toDegree } from "cc";
import { Constant } from "./Constant";
import { Util } from "./Util";
import { BattleContext } from "./BattleContext";
const { ccclass, property } = _decorator;

@ccclass("Player")
export class Player extends Component {
    @property(Node)
    private ndAni: Node;

    /**
     * 速度
     */
    speed: number = 4;
    /**
     * 方向
     */
    moveDirection: number = 0;
    /**
     * 运动状态
     */
    isMoving: boolean = false;

    //#region 生命周期
    protected onEnable(): void {
        const colldier = this.node.getComponent(Collider2D);
        if (colldier) {
            colldier.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            colldier.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
    }
    start() {
        this.isMoving = false;
    }

    update(deltaTime: number) {
        if (this.isMoving) {
            const x = this.node.position.x + Math.cos(this.moveDirection) * this.speed;
            const y = this.node.position.y + Math.sin(this.moveDirection) * this.speed;
            this.node.setPosition(x, y);

            const degree = toDegree(this.moveDirection);
            if (degree >= -90 && degree <= 90) {
                this.ndAni.setScale(1, 1);
            } else {
                this.ndAni.setScale(-1, 1);
            }
        }
    }

    protected onDisable(): void {
        const colldier = this.node.getComponent(Collider2D);
        if (colldier) {
            colldier.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            colldier.off(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
    }

    //#endregion 生命周期

    //#region 事件监听
    private onBeginContact(self: Collider2D, other: Collider2D) {
        console.warn("onBeginContact", this.node.worldPosition, other.group);
        if (other.group === Constant.ColliderGroup.MONSTER) {
            Util.showText("1000", this.node.worldPosition, BattleContext.ndTextParent);
        }
    }

    private onEndContact(self: Collider2D, other: Collider2D) {}
    //#endregion 事件监听
}
