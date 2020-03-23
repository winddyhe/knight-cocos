
export class RandGenerator
{
    public x: number;
    public y: number;
    public z: number;
    public w: number;

    public constructor(nSeed: number)
    {
        this.SetSeed(nSeed);
    }

    public GetSeed(): Number
    {
        return this.x;
    }

    public RangeFloat(min: number, max: number): number
    {
        var t = this.GetFloat();
        t = min * t + (1.0 - t) * max;
        return t;
    }

    public RangeInt(min: number, max: number): number
    {
        var dif: number = 0;
        if (min < max)
        {
            dif = max - min;
            var t = this.Get() % dif;
            t += min;
            return t;
        }
        else if (min > max)
        {
            dif = min - max;
            var t = (this.Get() % dif);
            t = min - t;
            return t;
        }
        else
        {
            return min;
        }
    }

    private Get(): number
    {
        var t = 0;
        t = this.x ^ (this.x << 11);
        this.x = this.y; this.y = this.z; this.z = this.w;
        return this.w = (this.w ^ (this.w >> 19)) ^ (t ^ (t >> 8));
    }

    private GetFloatFromInt(value: number): number
    {
        return ((value & 0x007FFFFF)) * (1.0 / 8388607.0);
    }

    private GetFloat(): number
    {
        return this.GetFloatFromInt(this.Get());
    }

    private SetSeed(nSeed: number)
    {
        this.x = nSeed;
        this.y = this.x * 1812433253 + 1;
        this.z = this.y * 1812433253 + 1;
        this.w = this.z * 1812433253 + 1;
    }
}