
import { UtilTool } from "../../Assist/UtilTool";

const { ccclass, property } = cc._decorator;

@ccclass
export class UILoading extends cc.Component
{
    private static __instance: UILoading = null;
    public static get Instance(): UILoading { return this.__instance; }

    @property(cc.Node)
    public LoadingRoot: cc.Node = null;
    @property(cc.ProgressBar)
    public LoadingBar: cc.ProgressBar = null;
    @property(cc.Label)
    public LoadingTips: cc.Label = null;

    protected mIntervalTime: number = 0.0;
    protected mCurTime: number = 0.0;
    protected mIsLoading: boolean = false;

    protected onLoad() 
    {
        UILoading.__instance = this;

        this.LoadingBar.totalLength = (this.LoadingRoot.width - 110) * UtilTool.GetWidthRatio();
    }

    protected update(dt)
    {
        if (!this.mIsLoading) return;

        var fProgressValue = UtilTool.InverseLerp(0, this.mIntervalTime, this.mCurTime);
        if (fProgressValue > 0.95)
            fProgressValue = 0.95;

        this.LoadingBar.progress = fProgressValue;
        this.mCurTime += dt;
    }

    public Show(fIntervalTime: number, rTextTips: string = "")
    {
        this.mIntervalTime = fIntervalTime;
        this.mCurTime = 0.0;
        this.mIsLoading = true;

        this.LoadingRoot.active = true;
        this.LoadingTips.string = rTextTips;
    }

    public Hide()
    {
        this.LoadingRoot.active = false;
        this.mCurTime = 0.0;
        this.mIsLoading = false;
    }
}