import { _decorator, Component, EventTouch, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("SkillButton")
export class SkillButton extends Component {
    @property(Node)
    ndText: Node = null;
    @property(Node)
    ndIcon: Node = null;

    protected onEnable(): void {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    protected onDisable(): void {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    onTouchStart(event: EventTouch) {
        this.node.setScale(0.95, 0.95);
    }

    onTouchMove(event: EventTouch) {}

    onTouchEnd() {
        this.node.setScale(1, 1);
    }

    onTouchCancel() {}
}
