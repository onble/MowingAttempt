import { _decorator, Component, Layers, Node, Prefab, randomRangeInt, resources } from "cc";
import { Joystick } from "./Joystick";
import { Player } from "./Player";
import { BattleContext } from "./BattleContext";
import { Util } from "./Util";
import { Monster } from "./Monster";
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
        this._loadPrefabs().then(() => {
            this._startGame();
        });
    }

    update(deltaTime: number) {}

    protected onDestroy(): void {}

    //#endregion 生命周期

    private _startGame() {
        // Util.createMonster(100, BattleContext.ndMonsterParent);

        for (let i = 0; i < 100; i++) {
            const node = Util.createMonster(BattleContext.prefabs["PinkMonster"], BattleContext.ndMonsterParent);
            node.setPosition(randomRangeInt(-500, 500), randomRangeInt(-500, 500));
            node.getComponent(Monster).speed = 1.5;
        }
    }

    private _loadPrefabs() {
        return new Promise((resolve, reject) => {
            resources.load("PinkMonster", (err: Error, prefab: Prefab) => {
                if (err) {
                    reject(null);
                    return;
                }

                resolve(prefab);
            });
        }).then((prefab: Prefab) => {
            BattleContext.prefabs[prefab.name] = prefab;
        });
    }
}
