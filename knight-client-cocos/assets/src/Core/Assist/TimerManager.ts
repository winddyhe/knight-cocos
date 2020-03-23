
const { ccclass, property } = cc._decorator;

export class Timer
{
    private mIsStart: boolean = false;
    private mCurTime: number = 0;

    public Start()
    {
        this.mIsStart = true;
        this.mCurTime = 0;
    }

    public Elapsed()
    {
        return Math.round(this.mCurTime * 1000);
    }

    public Stop()
    {
        this.mIsStart = false;
        this.mCurTime = 0;
    }

    public Pause()
    {
        this.mIsStart = false;
    }

    public Resume()
    {
        this.mIsStart = true;
    }

    public Update(dt: number)
    {
        if (!this.mIsStart) return;
        this.mCurTime += dt;
    }
}

@ccclass
export class TimerManager extends cc.Component
{
    private static __instance: TimerManager = null;
    public static get Instance(): TimerManager { return this.__instance; }

    protected onLoad()
    {
        TimerManager.__instance = this;
    }

    public mTimers: Timer[] = [];

    public CreateTimer() : Timer
    {
        var rTimer = new Timer();
        this.mTimers.push(rTimer);
        return rTimer;
    }

    public DestroyTimer(rTimer: Timer)
    {
        var nIndex = this.mTimers.indexOf(rTimer);
        if (nIndex >= 0)
        {
            this.mTimers.splice(nIndex, 1);
        }
    }

    protected update(dt: number)
    {
        if (this.mTimers == null) return;
        for (let i = 0; i < this.mTimers.length; i++) 
        {
            const rTimer = this.mTimers[i];
            rTimer.Update(dt);
        }
    }
}
