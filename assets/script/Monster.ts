import { _decorator, Component, Node, toDegree } from "cc";
import { BattleContext } from "./BattleContext";
const { ccclass, property } = _decorator;

@ccclass("Monster")
export class Monster extends Component {
    @property(Node)
    private ndAni: Node;

    /**
     * 速度
     */
    speed: number = 2;
    /**
     * 方向
     */
    moveDirection: number = 0;
    /**
     * 运动状态
     */
    isMoving: boolean = false;

    protected onEnable(): void {}

    protected onDisable(): void {}
    start() {
        this.isMoving = true;
        this.schedule(() => {
            if (!BattleContext.ndPlayer || !BattleContext.ndPlayer.isValid) {
                return;
            }

            const deltaX = BattleContext.ndPlayer.worldPosition.x - this.node.worldPosition.x;
            const deltaY = BattleContext.ndPlayer.worldPosition.y - this.node.worldPosition.y;
            this.moveDirection = Math.atan2(deltaY, deltaX);
        }, 0.1);
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
}
