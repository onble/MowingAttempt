import { _decorator, Component, Node } from "cc";
import { BattleContext } from "./BattleContext";
const { ccclass, property } = _decorator;

@ccclass("Camera")
export class Camera extends Component {
    start() {}

    update(deltaTime: number) {
        if (!BattleContext.ndPlayer || !BattleContext.ndPlayer.isValid) {
            return;
        }
        this.node.worldPosition = BattleContext.ndPlayer.worldPosition;
    }
}
