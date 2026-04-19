import { _decorator, Component, EventTouch, Label, Node, Sprite, v2, v3, Vec2, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("SkillButton")
export class SkillButton extends Component {
    @property(Node)
    ndText: Node = null;
    @property(Node)
    ndIcon: Node = null;

    private _isAvaliable: boolean = true;
    private _listener: Function;
    private _target: any;

    public get isAvaliable(): boolean {
        return this._isAvaliable;
    }

    public set isAvaliable(value: boolean) {
        this._isAvaliable = value;
        this.node.getComponentsInChildren(Sprite).forEach((sprite) => {
            sprite.grayscale = !value;
        });
    }

    private _coldDownTime: number = 3;

    public get coldDownTime(): number {
        return this._coldDownTime;
    }

    public set coldDownTime(value: number) {
        value = value >= 0 ? value : 0;
        this._coldDownTime = value;
    }

    private _isColding: boolean = false;
    private _currColdTime: number = 0;
    /** 存储触摸点的世界坐标world position */
    private _v2: Vec2 = v2();
    private _v3: Vec3 = v3();

    //#region 生命周期
    protected onEnable(): void {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);

        this.ndText.active = false;
    }

    protected update(dt: number): void {
        if (this._isColding) {
            this._currColdTime -= dt;

            this.ndText.getComponent(Label).string = `${this._currColdTime.toFixed(1)}`;
            if (this._currColdTime <= 0) {
                this._isColding = false;
                this.isAvaliable = true;
                this.ndText.active = false;
            }
        }
    }

    protected onDisable(): void {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    //#endregion 生命周期

    onTouchStart(event: EventTouch) {
        this.node.setScale(0.95, 0.95);
    }

    onTouchMove(event: EventTouch) {
        event.getUILocation(this._v2);
        this._v3.set(this._v2.x, this._v2.y); // world position

        const startWorldPos = this.node.worldPosition;
        const currWorldPos = this._v3;
        const radian = Math.atan2(currWorldPos.y - startWorldPos.y, currWorldPos.x - startWorldPos.x);
        this._listener && this._listener.apply(this._target, [radian]);
    }

    onTouchEnd() {
        this.node.setScale(1, 1);

        this._isColding = true;
        this._currColdTime = this._coldDownTime;
        this.ndText.getComponent(Label).string = `${this._currColdTime.toFixed(1)}`;
        this.isAvaliable = false;
        this.ndText.active = true;
    }

    onTouchCancel() {}

    onEvent(listener: Function, target?: any) {
        this._listener = listener;
        this._target = target;
    }
}
