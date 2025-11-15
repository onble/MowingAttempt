import { _decorator, Component, Node } from "cc";
import { Joystick } from "./Joystick";
import { Player } from "./Player";
const { ccclass, property } = _decorator;

@ccclass("Battle")
export class Battle extends Component {
    @property(Node) ndPlayer: Node;
    @property(Node) ndJoystick: Node;

    @property(Node) ndCamera: Node;

    protected onEnable(): void {
        this.ndJoystick.getComponent(Joystick).onTouchEvent((radian: number) => {
            this.ndPlayer.getComponent(Player).moveDirection = radian;
        });

        this.ndPlayer.getComponent(Player).isMoving = true;
    }

    protected onDestroy(): void {}

    start() {}

    update(deltaTime: number) {
        // 让摄像头的位置一直跟着玩家
        this.ndCamera.worldPosition = this.ndPlayer.worldPosition;
    }
}
