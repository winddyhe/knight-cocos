
import { ResourceLoader } from './ResourceLoader';
export class CloudAssetLoader
{
    private static _instance: CloudAssetLoader = null;
    
    public static get Instance(): CloudAssetLoader
    {
        if(null == this._instance){
            this._instance = new CloudAssetLoader();
        }
        return this._instance;
    }

    public async Load(rPrefabName:string): Promise<cc.Prefab>{
        var rPrefabUrl = "items/" + rPrefabName;

        return ResourceLoader.Instance.LoadPrefab(rPrefabUrl);
    }
}