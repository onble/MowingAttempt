import { _decorator, Collider2D, Component, Contact2DType, Node, toDegree } from "cc";
import { BattleContext } from "./BattleContext";
import { Constant } from "./Constant";
import { Util } from "./Util";
import { Weapon } from "./Weapon";
import { Sword } from "./Sword";
const { ccclass, property } = _decorator;

@ccclass("Monster")
export class Monster extends Component {
    @property(Node)
    private ndAni: Node;

    /**
     * 速度
     */
    speed: number = 2;
    /**
     * 方向
     */
    moveDirection: number = 0;
    /**
     * 运动状态
     */
    isMoving: boolean = false;

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

        this.hp = 100;
    }

    start() {
        this.isMoving = true;
        this.schedule(() => {
            if (!BattleContext.ndPlayer || !BattleContext.ndPlayer.isValid) {
                return;
            }

            const deltaX = BattleContext.ndPlayer.worldPosition.x - this.node.worldPosition.x;
            const deltaY = BattleContext.ndPlayer.worldPosition.y - this.node.worldPosition.y;
            this.moveDirection = Math.atan2(deltaY, deltaX);
        }, 0.1);
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
    }

    //#endregion 生命周期

    //#region 事件监听
    private onBeginContact(self: Collider2D, other: Collider2D) {
        if (other.group === Constant.ColliderGroup.PLAYER_WEAPON) {
            switch (other.tag) {
                case Constant.WeaponTag.DAGGER:
                    Util.showText(
                        BattleContext.prefabs[Constant.PrefabUrl.DAMAGE_TEXT],
                        `${other.node.getComponent(Weapon).attack}`,
                        this.node.worldPosition,
                        BattleContext.ndTextParent,
                    );
                    this.hurt(other.node.getComponent(Weapon).attack);
                    break;
                case Constant.WeaponTag.SWORD:
                    Util.showText(
                        BattleContext.prefabs[Constant.PrefabUrl.DAMAGE_TEXT],
                        `${other.node.getComponent(Sword).attack}`,
                        this.node.worldPosition,
                        BattleContext.ndTextParent,
                    );
                    this.hurt(other.node.getComponent(Sword).attack);
                    break;
                default:
                    break;
            }
        }
    }

    private onEndContact(self: Collider2D, other: Collider2D) {}
    //#endregion 事件监听

    hurt(val: number) {
        this.hp -= val;
        if (this.hp <= 0) {
            this.node.destroy();
        }
    }
}
