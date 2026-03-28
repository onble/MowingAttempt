import { _decorator, Component, Layers, Node } from "cc";
import { Joystick } from "./Joystick";
import { Player } from "./Player";
import { BattleContext } from "./BattleContext";
import { Util } from "./Util";
const { ccclass, property } = _decorator;

@ccclass("Battle")
export class Battle extends Component {
    @property(Node) ndPlayer: Node;
    @property(Node) ndJoystick: Node;

    protected onLoad(): void {
        BattleContext.ndPlayer = this.ndPlayer;

        const ndMonsterParent = new Node("MonsterParent");
        ndMonsterParent.layer = Layers.Enum.UI_2D;
        this.node.addChild(ndMonsterParent);
        BattleContext.ndMonsterParent = ndMonsterParent;

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

    start() {
        Util.createMonster(100, BattleContext.ndMonsterParent);
    }

    update(deltaTime: number) {}

    protected onDestroy(): void {}
}
