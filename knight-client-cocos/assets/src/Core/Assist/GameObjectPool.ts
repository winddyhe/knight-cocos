import { Func } from "./Func"
import { TObjectPoolWithHandler } from "./TObjectPool"

export class GameObjectPool
{
    private mObjectPool: TObjectPoolWithHandler<cc.Node>;
    private mTemplateObject: cc.Prefab;

    public constructor(poolName: string, initCount: number, templateObj: cc.Prefab)
    {
        this.mTemplateObject = templateObj;
        this.mObjectPool = new TObjectPoolWithHandler<cc.Node>(
            new Func(this.OnAlloc, this), new Func(this.OnFree, this), new Func(this.OnDestroy, this));

        for (var i = 0; i < initCount; i++)
            this.mObjectPool.Alloc();
    }

    public Alloc(): cc.Node
    {
        return this.mObjectPool.Alloc();
    }

    public Free(element: cc.Node)
    {
        this.mObjectPool.Free(element);
    }

    public Destroy()
    {
        this.mObjectPool.Destroy();
    }

    private OnAlloc(): cc.Node
    {
        return cc.instantiate(this.mTemplateObject) as cc.Node;
    }

    private OnFree(element: cc.Node)
    {
        if (element == null) return;

        element.active = false;
        element.position = new cc.Vec2(100000, 100000);
        element.rotation = 0;
        element.scale = 1;
    }

    private OnDestroy(element: cc.Node)
    {
        if (element != null)
            element.destroy();
        element = null;
    }
}