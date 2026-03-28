import { _decorator, Component, Node, toDegree } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Player")
export class Player extends Component {
    @property(Node)
    private ndAni: Node;

    /**
     * 速度
     */
    speed: number = 1;
    /**
     * 方向
     */
    moveDirection: number = 0;
    /**
     * 运动状态
     */
    isMoving: boolean = false;
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
}
