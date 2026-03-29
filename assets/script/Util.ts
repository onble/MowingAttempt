import { instantiate, Label, Node, Prefab, random, randomRange, randomRangeInt, resources, tween, v3, Vec3 } from "cc";
import { Monster } from "./Monster";

export class Util {
    static showText(pf: Prefab, text: string, worldPos: Vec3, parent: Node) {
        const ndText = instantiate(pf);
        ndText.parent = parent;

        ndText.getComponent(Label).string = text;

        const newPos = v3(worldPos);
        newPos.add3f(randomRangeInt(-10, 10), 30, 0);

        ndText.setWorldPosition(newPos);

        // 放大->等待->消失

        ndText.setScale(1, 1);

        tween(ndText)
            .to(0.1, { scale: new Vec3(1.5, 1.5, ndText.scale.z) })
            .delay(0.5)
            .to(0.1, { scale: new Vec3(0.1, 0.1, ndText.scale.z) })
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

    static moveNode(node: Node, radian: number, distance: number) {
        const x = node.position.x + Math.cos(radian) * distance;
        const y = node.position.y + Math.sin(radian) * distance;
        node.setPosition(x, y);
    }

    static getRadian(start: Vec3, end: Vec3): number {
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        return Math.atan2(dy, dx);
    }
}
