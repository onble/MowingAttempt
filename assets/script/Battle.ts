import { _decorator, Component, Node } from "cc";
import { Joystick } from "./Joystick";
import { Player } from "./Player";
const { ccclass, property } = _decorator;

@ccclass("Battle")
export class Battle extends Component {
    @property(Node) ndPlayer: Node;
    @property(Node) ndJoystick: Node;

    protected onEnable(): void {
        this.ndJoystick
            .getComponent(Joystick)
            .onTouchEvent((radian: number) => {
                this.ndPlayer.getComponent(Player).moveDirection = radian;
            });

        this.ndPlayer.getComponent(Player).isMoving = true;
    }

    protected onDestroy(): void {}

    start() {}

    update(deltaTime: number) {}
}
