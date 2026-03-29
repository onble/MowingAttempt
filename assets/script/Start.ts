import { _decorator, Component, director, Node } from "cc";
import { Globals } from "./Globals";
const { ccclass, property } = _decorator;

@ccclass("Start")
export class Start extends Component {
    start() {
        Globals.init().then(() => {
            director.loadScene("Battle");
        });
    }

    update(deltaTime: number) {}
}
