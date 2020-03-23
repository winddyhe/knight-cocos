import { UtilTool } from '../../Assist/UtilTool';

const { ccclass, property } = cc._decorator;

@ccclass
export class UIToast extends cc.Component
{
    private static __instance: UIToast = null;
    public static get Instance(): UIToast { return this.__instance; }

    @property(cc.Node)
    public ToastRoot: cc.Node = null;
    @property(cc.Sprite)
    public TipsBg: cc.Sprite = null;
    @property(cc.Label)
    public TipsText: cc.Label = null;

    private mIsStarted: boolean = false;
    private mTimeLength: number = 0.0;
    private mCurTime: number = 0.0;
    private mCurWidth: number = 0;

    protected onLoad()
    {
        UIToast.__instance = this;
    }

    protected update(dt)
    {
        if (!this.mIsStarted) return;

        let value = UtilTool.Lerp(255.0, 0.0, UtilTool.InverseLerp(0, this.mTimeLength, this.mCurTime));
        this.ToastRoot.opacity = Math.round(value);
        if (this.mCurTime > this.mTimeLength)
        {
            this.ToastRoot.active = false;
            this.mIsStarted = false;
        }
        this.mCurTime += dt;

        // 适配宽度，坑需要下一帧才知道真实的宽度
        if (this.mCurWidth != this.TipsText.node.width)
        {
            this.mCurWidth = this.TipsText.node.width;
            this.TipsBg.node.width = this.mCurWidth + 30;
        }
    }

    public Show(rTextTip: string, fTimeLength: number)
    {
        this.mIsStarted = true;
        this.mTimeLength = fTimeLength;
        this.mCurTime = 0.0;
        this.ToastRoot.opacity = 255;
        this.ToastRoot.active = true;
        this.TipsText.string = rTextTip;
    }
}
