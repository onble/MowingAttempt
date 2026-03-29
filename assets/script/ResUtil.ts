import { JsonAsset, Prefab, resources, SpriteFrame, TextAsset } from "cc";

export class ResUtil {
    static loadRes<T>(url: string, callback: (error: Error | null, asset: T) => void): void {
        resources.load(url, (err: Error | null, asset: any) => {
            asset as T;
            if (err) {
                console.error("加载资源失败:", err);
                callback(err, null);
            } else {
                callback(null, asset);
            }
        });
    }

    static loadPrefab(url: string): Promise<Prefab> {
        return new Promise((resolve, reject) => {
            this.loadRes<Prefab>(url, (err: Error | null, asset) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(asset);
                }
            });
        });
    }

    static loadJson(url: string): Promise<JsonAsset> {
        return new Promise((resolve, reject) => {
            this.loadRes<JsonAsset>(url, (err: Error | null, asset) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(asset);
                }
            });
        });
    }

    static loadText(url: string): Promise<TextAsset> {
        return new Promise((resolve, reject) => {
            this.loadRes<TextAsset>(url, (err: Error | null, asset) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(asset);
                }
            });
        });
    }

    static loadSpriteFrame(url: string): Promise<SpriteFrame> {
        return new Promise((resolve, reject) => {
            this.loadRes<SpriteFrame>(url, (err: Error | null, asset) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(asset);
                }
            });
        });
    }
}
