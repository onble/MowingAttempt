import { instantiate, Label, Node, Prefab, random, randomRange, randomRangeInt, resources, tween, Vec3 } from "cc";
import { Monster } from "./Monster";

export class Util {
    static showText(text: string, worldPos: Vec3, parent: Node) {
        resources.load("DamageText", (err, prefab: Prefab) => {
            if (err) {
                console.error(err);
                return;
            }
            const ndText = instantiate(prefab);
            ndText.parent = parent;

            ndText.getComponent(Label).string = text;
            ndText.setWorldPosition(worldPos);

            tween(ndText)
                .delay(1.5)
                .call(() => {
                    ndText.destroy();
                })
                .start();
        });
    }

    static createMonster(prefab: Prefab, parent: Node) {
        const ndMonster = instantiate(prefab);
        ndMonster.parent = parent;
        return ndMonster;
    }
}
