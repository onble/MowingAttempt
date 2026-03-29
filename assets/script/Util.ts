import { instantiate, Label, Node, Prefab, random, randomRange, randomRangeInt, resources, tween, Vec3 } from "cc";
import { Monster } from "./Monster";

export class Util {
    static showText(pf: Prefab, text: string, worldPos: Vec3, parent: Node) {
        const ndText = instantiate(pf);
        ndText.parent = parent;

        ndText.getComponent(Label).string = text;
        ndText.setWorldPosition(worldPos);

        tween(ndText)
            .delay(1.5)
            .call(() => {
                ndText.destroy();
            })
            .start();
    }

    static createMonster(prefab: Prefab, parent: Node) {
        const ndMonster = instantiate(prefab);
        ndMonster.parent = parent;
        return ndMonster;
    }

    static loadPf(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            resources.load(url, Prefab, (err, prefab: Prefab) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(prefab);
                }
            });
        });
    }
}
