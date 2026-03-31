import {
    _decorator,
    bits,
    Collider2D,
    Component,
    Contact2DType,
    instantiate,
    Node,
    toDegree,
    toRadian,
    tween,
    Vec2,
} from "cc";
import { Constant } from "./Constant";
import { Util } from "./Util";
import { BattleContext } from "./BattleContext";
import { Weapon } from "./Weapon";
import { PoolManager } from "./PoolManager";
import { Surround } from "./Surround";
import { Globals } from "./Globals";
import { Thunder } from "./Thunder";
const { ccclass, property } = _decorator;

@ccclass("Player")
export class Player extends Component {
    @property(Node)
    private ndAni: Node;

    /**
     * 速度
     */
    speed: number = 4;
    /**
     * 方向
     */
    moveDirection: number = 0;
    /**
     * 运动状态
     */
    isMoving: boolean = false;

    attackDirection: number = 0;

    /**
     * 血量
     */
    hp: number = 100;
    /**
     * 攻击
     */
    ap: number = 10;
    /**
     * 防御
     */
    dp: number = 5;

    //#region 生命周期
    protected onEnable(): void {
        const colldier = this.node.getComponent(Collider2D);
        if (colldier) {
            colldier.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            colldier.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
    }
    start() {
        this.isMoving = false;

        this.schedule(() => {
            const nearestNode = this.getNearestMonster();
            if (nearestNode) {
                this.attackDirection = Util.getRadian(this.node.worldPosition, nearestNode.worldPosition);
            }
        });
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

    protected onDisable(): void {
        const colldier = this.node.getComponent(Collider2D);
        if (colldier) {
            colldier.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            colldier.off(Contact2DType.END_CONTACT, this.onEndContact, this);
        }

        this.unscheduleAllCallbacks();
    }

    //#endregion 生命周期

    //#region 事件监听
    private onBeginContact(self: Collider2D, other: Collider2D) {
        if (other.group === Constant.ColliderGroup.MONSTER) {
            Util.showText("12", this.node.worldPosition, BattleContext.ndTextParent);
        }
    }

    private onEndContact(self: Collider2D, other: Collider2D) {}
    //#endregion 事件监听

    startEndlessDagger() {
        const tw = tween(this.node)
            .delay(0.1)
            .call(() => {
                const ndDagger = Globals.getNode(Constant.PrefabUrl.DAGGER, BattleContext.ndWeapon);
                ndDagger.worldPosition = this.node.worldPosition;
                ndDagger.angle = toDegree(this.attackDirection);

                const wp = ndDagger.getComponent(Weapon);
                wp.isMoving = true;
                wp.moveDirection = this.attackDirection;
                wp.speed = 12;
            });

        tween(this.node).repeatForever(tw).start();
    }

    getNearestMonster() {
        const monsters = BattleContext.ndMonsterParent.children;
        let min = bits.INT_MAX;
        let target: Node = null;
        for (let i = 0; i < monsters.length; i++) {
            const distance = Vec2.distance(monsters[i].worldPosition, this.node.worldPosition);
            if (distance < min) {
                target = monsters[i];
            }
        }
        return target;
    }

    startSoundingSword() {
        const ndSurround = Globals.getNode(Constant.PrefabUrl.SURROUND, BattleContext.ndWeapon);
        ndSurround.getComponent(Surround).isMoving = true;
    }

    startFireball() {
        const tw = tween(this.node)
            .delay(2)
            .call(() => {
                const deltaAngle = 10;
                const startDegree = toDegree(this.attackDirection) - 17 * deltaAngle;
                for (let i = 0; i < 2; i++) {
                    const ndFireball = Globals.getNode(Constant.PrefabUrl.FIREBALL, BattleContext.ndWeapon);

                    ndFireball.worldPosition = this.node.worldPosition;
                    ndFireball.angle = startDegree + deltaAngle * i;

                    const wp = ndFireball.getComponent(Weapon);
                    wp.isMoving = true;
                    wp.moveDirection = toRadian(startDegree + deltaAngle * i);
                    wp.attack = 30;
                    wp.speed = 6;
                }
            });

        tween(this.node).repeatForever(tw).start();
    }

    startThunder() {
        const tw = tween(this.node)
            .delay(2)
            .call(() => {
                for (let i = 0; i < 10; i++) {
                    this.scheduleOnce(() => {
                        const nearestMonster = this.getNearestMonster();
                        if (nearestMonster) {
                            const ndThunder = Globals.getNode(Constant.PrefabUrl.THUNDER, BattleContext.ndWeapon);

                            ndThunder.worldPosition = nearestMonster.worldPosition;

                            const wp = ndThunder.getComponent(Thunder);
                            wp.attack = 30;
                        }
                    }, 0.15 * i);
                }
            });

        tween(this.node).repeatForever(tw).start();
    }
}
