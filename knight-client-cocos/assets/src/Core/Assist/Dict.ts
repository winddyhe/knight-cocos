
export interface IDict<TKey extends string | number, TValue>
{
    Add(rKey: TKey, rValue: TValue);
    Remove(rKey: TKey);
    Clear();

    ContainsKey(rKey: TKey): boolean;
    ContainsValue(rValue: TValue): boolean; // 遍历的效率不高

    Count(): number;

    FirstKey(): TKey;
    LastKey(): TKey;

    FirstValue(): TValue;
    LastValue(): TValue;

    Get(rKey: TKey): TValue;
    At(nIndex: number): TValue;
}

export class StringDict<T> implements IDict<string, T>
{
    private mKeyList: string[] = [];
    private mMapData: { [key: string]: T } = {};

    public Add(rKey: string, rValue: T)
    {
        this.mKeyList.push(rKey);
        this.mMapData[rKey] = rValue;
    }

    public Remove(rKey: string)
    {
        var index = this.mKeyList.indexOf(rKey);
        if (index > -1)
        {
            this.mKeyList.splice(index, 1);
        }
        this.mMapData[rKey] = null;
    }

    public Clear()
    {
        this.mKeyList = [];
        this.mMapData = {};
    }

    public ContainsKey(rKey: string): boolean
    {
        var index = this.mKeyList.indexOf(rKey);
        return index > -1;
    }

    public ContainsValue(rValue: T): boolean
    {
        for (let k in this.mMapData)
        {
            if (this.mMapData[k] == rValue)
            {
                return true;
            }
        }
        return false;
    }

    public Count(): number
    {
        return this.mKeyList.length;
    }

    public FirstKey(): string
    {
        if (this.mKeyList.length == null) return null;
        return this.mKeyList[0];
    }

    public LastKey(): string
    {
        if (this.mKeyList.length == null) return null;
        return this.mKeyList[this.mKeyList.length - 1];
    }

    public FirstValue(): T
    {
        var rKey = this.FirstKey();
        if (rKey == null) return null;
        return this.mMapData[rKey];
    }

    public LastValue(): T
    {
        var rKey = this.LastKey();
        if (rKey == null) return null;
        return this.mMapData[rKey];
    }
    
    public Get(rKey: string): T
    {
        return this.mMapData[rKey];
    }

    public At(nIndex: number): T
    {
        if (nIndex < 0 || nIndex >= this.mKeyList.length) return null;
        return this.mMapData[this.mKeyList[nIndex]];
    }
}

export class NumberDict<T> implements IDict<number, T>
{
    private mKeyList: number[] = [];
    private mMapData: { [key: number]: T } = {};

    public Add(rKey: number, rValue: T)
    {
        this.mKeyList.push(rKey);
        this.mMapData[rKey] = rValue;
    }

    public Remove(rKey: number)
    {
        var index = this.mKeyList.indexOf(rKey);
        if (index > -1)
        {
            this.mKeyList.splice(index, 1);
        }
        this.mMapData[rKey] = null;
    }

    public Clear()
    {
        this.mKeyList = [];
        this.mMapData = {};
    }

    public ContainsKey(rKey: number): boolean
    {
        var index = this.mKeyList.indexOf(rKey);
        return index > -1;
    }

    public ContainsValue(rValue: T): boolean
    {
        for (let k in this.mMapData)
        {
            if (this.mMapData[k] == rValue)
            {
                return true;
            }
        }
        return false;
    }

    public Count(): number
    {
        return this.mKeyList.length;
    }

    public FirstKey(): number
    {
        if (this.mKeyList.length == null) return null;
        return this.mKeyList[0];
    }

    public LastKey(): number
    {
        if (this.mKeyList.length == null) return null;
        return this.mKeyList[this.mKeyList.length - 1];
    }

    public FirstValue(): T
    {
        var rKey = this.FirstKey();
        if (rKey == null) return null;
        return this.mMapData[rKey];
    }

    public LastValue(): T
    {
        var rKey = this.LastKey();
        if (rKey == null) return null;
        return this.mMapData[rKey];
    }

    public Get(rKey: number): T
    {
        return this.mMapData[rKey];
    }

    public At(nIndex: number): T
    {
        if (nIndex < 0 || nIndex >= this.mKeyList.length) return null;
        return this.mMapData[this.mKeyList[nIndex]];
    }
}

export class Dict
{
    public static CreateStringDict<T>(): IDict<string, T>
    {
        return new StringDict<T>();
    }

    public static CreateNumberDict<T>(): IDict<number, T>
    {
        return new NumberDict<T>();
    }
}