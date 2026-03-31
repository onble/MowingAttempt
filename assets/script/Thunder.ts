import { _decorator, Animation, Component, Node } from "cc";
import { DEV } from "cc/env";
import { Globals } from "./Globals";
const { ccclass, property } = _decorator;

@ccclass("Thunder")
export class Thunder extends Component {
    @property({ type: Animation, tooltip: DEV && "动画组件" })
    private display: Animation = null;

    attack: number = 10;

    protected onEnable(): void {
        this.display.node.on(Animation.EventType.FINISHED, this.onComplete, this);
        this.display.play();
    }

    protected onDestroy(): void {
        this.display.off(Animation.EventType.FINISHED, this.onComplete, this);
    }

    onComplete() {
        Globals.putNode(this.node);
    }
}
