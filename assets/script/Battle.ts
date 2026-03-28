import { _decorator, Component, Layers, Node } from "cc";
import { Joystick } from "./Joystick";
import { Player } from "./Player";
import { BattleContext } from "./BattleContext";
const { ccclass, property } = _decorator;

@ccclass("Battle")
export class Battle extends Component {
    @property(Node) ndPlayer: Node;
    @property(Node) ndJoystick: Node;

    protected onLoad(): void {
        BattleContext.ndPlayer = this.ndPlayer;

        const ndTextParent = new Node("TextParent");
        ndTextParent.layer = Layers.Enum.UI_2D;

        this.node.addChild(ndTextParent);
        BattleContext.ndTextParent = ndTextParent;
    }

    protected onEnable(): void {
        this.ndJoystick.getComponent(Joystick).onTouchEvent((event: number, radian: number | null | undefined) => {
            switch (event) {
                case Joystick.Event.START:
                    this.ndPlayer.getComponent(Player).isMoving = true;
                    break;
                case Joystick.Event.MOVE:
                    if (radian !== undefined && radian !== null) {
                        this.ndPlayer.getComponent(Player).moveDirection = radian;
                    }
                    break;
                case Joystick.Event.END:
                case Joystick.Event.CANCEL:
                    this.ndPlayer.getComponent(Player).isMoving = false;
                    break;
                default:
                    break;
            }
        });

        this.ndPlayer.getComponent(Player).isMoving = true;
    }

    protected onDestroy(): void {}

    start() {}

    update(deltaTime: number) {}
}
