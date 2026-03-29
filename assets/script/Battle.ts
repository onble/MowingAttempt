import { _decorator, Component, Layers, Node, Prefab, randomRangeInt, resources } from "cc";
import { Joystick } from "./Joystick";
import { Player } from "./Player";
import { BattleContext } from "./BattleContext";
import { Util } from "./Util";
import { Monster } from "./Monster";
import { Constant } from "./Constant";
import { ResUtil } from "./ResUtil";
import { Globals } from "./Globals";
const { ccclass, property } = _decorator;

@ccclass("Battle")
export class Battle extends Component {
    @property(Node) ndPlayer: Node;
    @property(Node) ndJoystick: Node;

    protected onLoad(): void {
        BattleContext.ndPlayer = this.ndPlayer;

        const creatSubNode = (name: string) => {
            const subNode = new Node(name);
            this.node.addChild(subNode);
            subNode.layer = Layers.Enum.UI_2D;
            return subNode;
        };

        BattleContext.ndMonsterParent = creatSubNode("MonsterParent");
        BattleContext.ndTextParent = creatSubNode("TextParent");
        BattleContext.ndWeapon = creatSubNode("Weapon");
    }

    //#region 生命周期
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
        this._startGame();
    }

    update(deltaTime: number) {}

    protected onDestroy(): void {}

    //#endregion 生命周期

    private _startGame() {
        // Util.createMonster(100, BattleContext.ndMonsterParent);

        for (let i = 0; i < 100; i++) {
            const node = Globals.getNode(Constant.PrefabUrl.PINK_MONSTER, BattleContext.ndMonsterParent);
            node.setPosition(randomRangeInt(-500, 500), randomRangeInt(-500, 500));
            node.getComponent(Monster).speed = 1.2;
        }

        BattleContext.ndPlayer.getComponent(Player).startEndlessDagger();
        BattleContext.ndPlayer.getComponent(Player).startSoundingSword();
    }
}
