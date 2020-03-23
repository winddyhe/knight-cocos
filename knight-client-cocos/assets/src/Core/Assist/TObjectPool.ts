import { Func } from "./Func";

export class TObjectPoolWithHandler<T>
{
    private mPoolMap: T[];

    private mAllocFunc: Func;
    private mFreeFunc: Func;
    private mDestroyFunc: Func;

    constructor(allocFunc: Func, freeFunc: Func, destroyFunc: Func)
    {
        this.mPoolMap = [];

        this.mAllocFunc = allocFunc;
        this.mFreeFunc = freeFunc;
        this.mDestroyFunc = destroyFunc;
    }

    public Alloc(): T
    {
        if (this.mPoolMap.length == 0)
        {
            return this.mAllocFunc.Call();
        }
        else
        {
            return this.mPoolMap.pop();
        }
    }

    public Free(element: T)
    {
        if (this.mFreeFunc)
            this.mFreeFunc.Call(element);

        this.mPoolMap.push(element);
    }

    public Destroy()
    {
        if (this.mPoolMap == null) return;
        this.mPoolMap.forEach(element =>
        {
            this.mDestroyFunc.Call(element);
        });
        this.mPoolMap = [];
    }
}

export class TObjectPool<T>
{
    protected mPools: T[];

    constructor(private ObjectType: { new(...args): T })
    {
        this.mPools = [];
    }

    public Alloc(): T
    {
        if (this.mPools.length > 0)
            return this.mPools.pop();

        return new this.ObjectType();
    }
    public Free(element: T): void
    {
        if (!element)
            return;

        this.mPools.push(element);
    }
    public Shrink(keepCount: number = 8): void
    {
        while (this.mPools.length > keepCount)
        {
            this.mPools.pop();
        }
    }
    public DestroyAll(): void
    {
        this.mPools = []
    }
}
