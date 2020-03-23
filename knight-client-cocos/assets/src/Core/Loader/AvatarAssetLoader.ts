import { ResourceLoader } from "./ResourceLoader";

export class AvatarAssetLoader
{
    private static __instance: AvatarAssetLoader = null;
    public static get Instance(): AvatarAssetLoader
    {
        if (null == this.__instance)
        {
            this.__instance = new AvatarAssetLoader();
        }
        return this.__instance;
    }

    public async Load(rPrefabName: string): Promise<cc.Prefab>
    {
        var rPrefabUrl = "role/prefabs/" + rPrefabName;
        return ResourceLoader.Instance.LoadPrefab(rPrefabUrl);
    }
}