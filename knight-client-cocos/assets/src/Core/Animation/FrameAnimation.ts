import { UtilTool } from '../Assist/UtilTool';
import { Func } from '../Assist/Func';

const { ccclass, property } = cc._decorator;

@ccclass
export class FrameAnimation extends cc.Component
{
    @property(cc.Sprite)
    public MainSprite: cc.Sprite = null;

    @property
    public AnimName: string = "";

    @property([cc.SpriteFrame])
    public SpriteFrames: cc.SpriteFrame[] = [];

    @property
    public TotalTime: number = 1.0;

    @property
    public IntervalTime: number = 0.1;

    @property
    public IsLoop: boolean = false;

    private mCurTime: number = 0.0;
    private mIsPlaying: boolean = false;
    private mCurFrameIndex: number = 0;
    private mPlayCompleted: Func = null;

    public Play(bIsLoop: boolean, rPlayerCompleted?: Func)
    {
        this.IsLoop = bIsLoop;
        this.mCurTime = 0.0;
        this.mIsPlaying = true;
        this.mCurFrameIndex = -1;
        this.mPlayCompleted = rPlayerCompleted;
    }

    public Stop()
    {
        this.mCurTime = 0.0;
        this.mIsPlaying = false;
        this.mCurFrameIndex = -1;
        UtilTool.SafeExecute(this.mPlayCompleted);
    }

    public Pause()
    {
        this.mIsPlaying = false;
    }

    public Resume()
    {
        this.mIsPlaying = true;
    }

    public UpdateTime(dt)
    {
        if (this.MainSprite == null) return;
        if (this.SpriteFrames == null || this.SpriteFrames.length == 0) return;

        if (!this.mIsPlaying) return;

        if (this.mCurTime > this.TotalTime)
        {
            if (this.IsLoop)
            {
                this.mCurTime = 0.0;
            }
            else
            {
                this.Stop();
                return;
            }
        }

        // 根据时间设置帧动画 具体该显示哪一帧的图片
        var fTimeFactor = UtilTool.InverseLerp(0, this.TotalTime, this.mCurTime);
        var nFrameIndex = Math.round(UtilTool.Lerp(0, this.SpriteFrames.length, fTimeFactor));
        if (nFrameIndex >= this.SpriteFrames.length)
        {
            nFrameIndex = this.SpriteFrames.length - 1;
        }

        if (this.mCurFrameIndex != nFrameIndex)
        {
            this.mCurFrameIndex = nFrameIndex;
            this.MainSprite.spriteFrame = this.SpriteFrames[this.mCurFrameIndex];
        }

        this.mCurTime += dt;
    }
}