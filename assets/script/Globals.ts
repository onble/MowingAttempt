import { _decorator, Component, director, Node, Prefab } from "cc";
import { Constant } from "./Constant";
import { ResUtil } from "./ResUtil";
import { PoolManager } from "./PoolManager";
const { ccclass, property } = _decorator;

@ccclass("Globals")
export class Globals extends Component {
    static prefabs: Record<string, Prefab> = {};

    protected onLoad(): void {
        director.addPersistRootNode(this.node);
    }
    start() {}

    update(deltaTime: number) {}

    static init() {
        const keys = Object.keys(Constant.PrefabUrl);
        const promises: Promise<any>[] = [];
        keys.forEach((key) => {
            const url = Constant.PrefabUrl[key];
            const p = ResUtil.loadPrefab(url).then((pf: Prefab) => {
                Globals.prefabs[url] = pf;
            });
            promises.push(p);
        });

        return Promise.all(promises);
    }

    static getNode(name: string, parent: Node) {
        const node = PoolManager.getInstance().get(this.prefabs[name]);
        node.parent = parent;
        return node;
    }

    static putNode(node: Node) {
        PoolManager.getInstance().put(node);
    }
}
