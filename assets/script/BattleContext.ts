import { Node, Prefab } from "cc";

export class BattleContext {
    static ndTextParent: Node;
    static ndMonsterParent: Node;
    static ndPlayer: Node;
    static ndWeapon: Node;

    static prefabs: Record<string, Prefab> = {};
}
