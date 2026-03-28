import { _decorator, Component, EventTouch, math, Node, UITransform, Vec2, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Joystick")
export class Joystick extends Component {
    @property(Node)
    ndHand: Node;

    /** 存储整体控制器的半径 */
    private _radius: number = 0;
    /** 存储触摸点的世界坐标world position */
    private _v2: Vec2 = new Vec2();
    private _touchWorldPos: Vec3 = new Vec3();
    private _currPos: Vec3 = new Vec3();
    private readonly _startPos: Vec3 = new Vec3(0, 0);

    private _listeneer: Function;
    private _target: any;

    static readonly Event = {
        START: 0,
        MOVE: 1,
        END: 2,
        CANCEL: 3,
    };

    /** 存储每次角度 */
    private _arrArg: number[] = [-1, -1]; // [Event, Radian|null]

    protected onEnable(): void {
        // 根据整体图片的大小获得控制器的半径
        this._radius = this.node.getComponent(UITransform).contentSize.width / 2;

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

    onHandStart() {
        this._notify(Joystick.Event.START);
    }

    onHandMove(event: EventTouch) {
        // 获得触摸点的世界坐标world position
        event.getUILocation(this._v2);
        this._touchWorldPos.set(this._v2.x, this._v2.y);
        this.node.getComponent(UITransform).convertToNodeSpaceAR(this._touchWorldPos, this._currPos);

        const distance = Vec2.distance(this._startPos, this._currPos);
        const radian = Math.atan2(this._currPos.y - this._startPos.y, this._currPos.x - this._startPos.x);

        if (distance < this._radius) {
            // 如果没有超出半径的距离，就直接放到触摸点的位置
            this.ndHand.setPosition(this._currPos);
        } else {
            // 超出半径的位置，就放到边界的位置
            const x = this._startPos.x + Math.cos(radian) * this._radius;
            const y = this._startPos.y + Math.sin(radian) * this._radius;
            this.ndHand.setPosition(x, y);
        }

        this._notify(Joystick.Event.MOVE, radian);
    }

    onHandEnd() {
        // 将中间的控制器位置归零
        this.ndHand.setPosition(0, 0);
        this._notify(Joystick.Event.END);
    }

    onHandCancel() {
        // 将中间的控制器位置归零
        this.ndHand.setPosition(0, 0);
        this._notify(Joystick.Event.CANCEL);
    }

    onTouchEvent(listener: Function, target?: any) {
        this._listeneer = listener;
        this._target = target;
    }

    private _notify(event: number, radian?: number) {
        this._arrArg[0] = event;
        this._arrArg[1] = radian;
        this._listeneer && this._listeneer.apply(this._target, this._arrArg);
    }
}
