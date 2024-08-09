import {
    _decorator,
    Component,
    EventTouch,
    math,
    Node,
    UITransform,
    Vec2,
    Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Joystick")
export class Joystick extends Component {
    @property(Node)
    ndHand: Node;

    /** 存储整体控制器的半径 */
    private _radius: number = 0;

    protected onEnable(): void {
        // 根据整体图片的大小获得控制器的半径
        this._radius =
            this.node.getComponent(UITransform).contentSize.width / 2;

        // 给控制器绑定事件
        this.node.on(Node.EventType.TOUCH_START, this.onHandStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onHandMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onHandEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onHandCancel, this);
    }

    protected onDisable(): void {
        // 给控制器取消事件
        this.node.off(Node.EventType.TOUCH_START, this.onHandStart, this);
        this.node.off(Node.EventType.TOUCH_MOVE, this.onHandMove, this);
        this.node.off(Node.EventType.TOUCH_END, this.onHandEnd, this);
        this.node.off(Node.EventType.TOUCH_CANCEL, this.onHandCancel, this);
    }

    start() {
        this.node.getChildByName("Joystick_Handle");
    }

    update(deltaTime: number) {
        // 如何是60帧，则deltaTime约等于16.7ms
    }

    onHandStart() {}

    onHandMove(event: EventTouch) {
        // 获得触摸点的世界坐标world position
        const v2: math.Vec2 = event.getUILocation();
        const touchWorldPos = new Vec3(v2.x, v2.y);
        // 触摸点在Joystick节点的相对坐标
        const currPos = new Vec3();
        this.node
            .getComponent(UITransform)
            .convertToNodeSpaceAR(touchWorldPos, currPos);

        const startPos = new Vec3(0, 0);

        const distance = Vec2.distance(startPos, currPos);
        const radian = Math.atan2(
            currPos.y - startPos.y,
            currPos.x - startPos.x
        );

        if (distance < this._radius) {
            // 如果没有超出半径的距离，就直接放到触摸点的位置
            this.ndHand.setPosition(currPos);
        } else {
            // 超出半径的位置，就放到边界的位置
            const x = startPos.x + Math.cos(radian) * this._radius;
            const y = startPos.y + Math.sin(radian) * this._radius;
            this.ndHand.setPosition(x, y);
        }
    }

    onHandEnd() {
        // 将中间的控制器位置归零
        this.ndHand.setPosition(0, 0);
    }

    onHandCancel() {
        // 将中间的控制器位置归零
        this.ndHand.setPosition(0, 0);
    }
}
