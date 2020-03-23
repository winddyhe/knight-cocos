const { ccclass, property } = cc._decorator;

@ccclass
export class ResourceLoader
{
    private static __instance: ResourceLoader = null;
    public static get Instance(): ResourceLoader
    {
        if (null == this.__instance)
        {
            this.__instance = new ResourceLoader();
        }
        return this.__instance;
    }

    public async LoadPrefab(rAssetURL: string): Promise<cc.Prefab>
    {
        var rPromise = new Promise<cc.Prefab>((resolve, reject) =>
        {
            cc.loader.loadRes(rAssetURL, cc.Prefab, (error, prefab) =>
            {
                if (error)
                {
                    cc.error(error.message || error);
                    resolve(null);
                    return;
                }
                if (!(prefab instanceof cc.Prefab))
                {
                    cc.log('Result should be a prefab !!!');
                    resolve(null);
                    return;
                }
                resolve(prefab);
            });
        });
        return rPromise;
    }
}
