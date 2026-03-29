export class Constant {
    static readonly ColliderGroup = {
        DEFAULT: 1 << 0,
        PLAYER: 1 << 1,
        MONSTER: 1 << 2,
        PLAYER_WEAPON: 1 << 3,
        MONSTER_WEAPON: 1 << 4,
        OBSTACLE: 1 << 5,
    };

    static readonly PrefabUrl = {
        DAMAGE_TEXT: "DamageText",
        PINK_MONSTER: "PinkMonster",
        DAGGER: "Dagger",
        SURROUND: "Surround",
        FIREBALL: "Fireball",
        FIRE_EXPLODE: "FireExplode",
    };

    static readonly WeaponTag = {
        DAGGER: 0,
        SWORD: 1,
        FIREBALL: 2,
        FIRE_EXPLODE: 3,
    };
}
