import { _decorator, Component, Node, UITransform } from "cc";
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
        this.node.on(Node.EventType.TOUCH_MOVE, this.onHandMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onHandEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onHandCancel, this);
    }

    protected onDisable(): void {
        // 给控制器取消事件
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

    onHandMove() {}

    onHandEnd() {}

    onHandCancel() {}
}
