import { ResourceLoader } from "./ResourceLoader";

export class ItemAssetLoader
{
    private static __instance: ItemAssetLoader = null;
    public static get Instance(): ItemAssetLoader
    {
        if (null == this.__instance)
        {
            this.__instance = new ItemAssetLoader();
        }
        return this.__instance;
    }

    public async Load(rPrefabName: string): Promise<cc.Prefab>
    {
        var rPrefabUrl = "items/" + rPrefabName;
        return ResourceLoader.Instance.LoadPrefab(rPrefabUrl);
    }
}