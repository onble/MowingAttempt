import { _decorator, Animation, Component, Node } from "cc";
import { Globals } from "./Globals";
const { ccclass, property } = _decorator;

@ccclass("FireExplode")
export class FireExplode extends Component {
    attack: number = 10;

    protected onEnable(): void {
        const dis = this.node.getComponent(Animation);
        dis.on(Animation.EventType.FINISHED, this.onComplete, this);
        dis.play();
    }
    start() {}

    update(deltaTime: number) {}

    protected onDestroy(): void {
        const dis = this.node.getComponent(Animation);
        dis.off(Animation.EventType.FINISHED, this.onComplete, this);
    }

    onComplete() {
        Globals.putNode(this.node);
    }
}
