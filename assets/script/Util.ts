import { instantiate, Label, Node, Prefab, resources, tween, Vec3 } from "cc";

export class Util {
    static showText(text: string, worldPos: Vec3, parent: Node) {
        resources.load("DamageText", (err, prefab: Prefab) => {
            if (err) {
                console.error(err);
                return;
            }
            const ndText = instantiate(prefab);
            ndText.getComponent(Label).string = text;
            ndText.setPosition(worldPos);
            parent.addChild(ndText);

            tween(ndText)
                .delay(1.5)
                .call(() => {
                    ndText.destroy();
                })
                .start();
        });
    }
}
