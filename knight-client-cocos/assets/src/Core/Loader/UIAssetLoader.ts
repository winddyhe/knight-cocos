import { ResourceLoader } from './ResourceLoader';

export class UIAssetLoader
{
    private static __instance: UIAssetLoader = null;
    public static get Instance(): UIAssetLoader
    {
        if (null == this.__instance)
        {
            this.__instance = new UIAssetLoader();
        }
        return this.__instance;
    }

    public async Load(rPrefabName: string): Promise<cc.Prefab>
    {
        var rPrefabUrl = "ui/Prefabs/" + rPrefabName;
        return ResourceLoader.Instance.LoadPrefab(rPrefabUrl);
    }
}