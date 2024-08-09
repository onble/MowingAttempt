import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Player")
export class Player extends Component {
    speed: number = 1;
    moveDirection: number = 0;
    isMoving: boolean = false;
    start() {}

    update(deltaTime: number) {
        if (this.isMoving) {
            const x =
                this.node.position.x +
                Math.cos(this.moveDirection) * this.speed;
            const y =
                this.node.position.y +
                Math.sin(this.moveDirection) * this.speed;
            this.node.setPosition(x, y);
        }
    }
}
