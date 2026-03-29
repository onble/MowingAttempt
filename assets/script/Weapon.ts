import { _decorator, Component, Node } from "cc";
import { Util } from "./Util";
const { ccclass, property } = _decorator;

@ccclass("Weapon")
export class Weapon extends Component {
    attack: number = 10;
    speed: number = 12;
    moveDirection: number = 0;
    isMoving: boolean = true;

    start() {}

    update(deltaTime: number) {
        if (this.isMoving) {
            Util.moveNode(this.node, this.moveDirection, this.speed);
        }
    }
}
