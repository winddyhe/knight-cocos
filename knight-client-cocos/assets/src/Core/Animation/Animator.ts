import { FrameAnimation } from './FrameAnimation';
import { IDict, Dict } from '../Assist/Dict';
import { Func } from '../Assist/Func';

const { ccclass, property } = cc._decorator;

@ccclass
export class Animator extends cc.Component
{
    @property([FrameAnimation])
    public AnimClips: FrameAnimation[] = [];
    public CurAnimClip: FrameAnimation = null;

    private mAnimClipsMap: IDict<string, FrameAnimation> = null;

    protected onLoad()
    {
        this.mAnimClipsMap = Dict.CreateStringDict<FrameAnimation>();
        for (let i = 0; i < this.AnimClips.length; i++)
        {
            const rAnimClip = this.AnimClips[i];
            this.mAnimClipsMap.Add(rAnimClip.AnimName, rAnimClip);
        }
    }

    public Play(rAnimName: string, bIsLoop: boolean, rPlayCompleted?: Func)
    {
        var rAnimClip = this.mAnimClipsMap.Get(rAnimName);
        if (rAnimClip == null)
        {
            cc.error(`Can not find AnimClip: ${rAnimName} !!!`);
            return;
        }
        this.CurAnimClip = rAnimClip;
        this.CurAnimClip.Play(bIsLoop, rPlayCompleted);
    }

    public UpdateTime(dt)
    {
        if (this.CurAnimClip == null) return;
        this.CurAnimClip.UpdateTime(dt);
    }
}
