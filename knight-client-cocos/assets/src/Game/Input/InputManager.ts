import { UtilTool } from '../../Core/Assist/UtilTool';
import { Func } from '../../Core/Assist/Func';
import { EventManager } from '../../Core/Assist/EventManager';
import { SysEvent } from '../../Core/Assist/SysEvent';

const { ccclass, property } = cc._decorator;

@ccclass
export class InputManager extends cc.Component
{
    private static __instance: InputManager = null;
    public static get Instance(): InputManager { return this.__instance; }

    public IsLockInput: boolean = true;

    private mTouchStartFunc: Func;
    private mTouchMoveFunc: Func;
    private mTouchEndFunc: Func;

    protected onLoad()
    {
        InputManager.__instance = this;

        this.mTouchStartFunc = new Func(this.OnTouchStart, this);
        this.mTouchMoveFunc = new Func(this.OnTouchMove, this);
        this.mTouchEndFunc = new Func(this.OnTouchEnd, this);

        UtilTool.AddListener(this.node, cc.Node.EventType.TOUCH_START, this.mTouchStartFunc);
        UtilTool.AddListener(this.node, cc.Node.EventType.TOUCH_MOVE, this.mTouchMoveFunc);
        UtilTool.AddListener(this.node, cc.Node.EventType.TOUCH_END, this.mTouchEndFunc);
        UtilTool.AddListener(this.node, cc.Node.EventType.TOUCH_CANCEL, this.mTouchEndFunc);
    }

    protected onDestroy()
    {
        UtilTool.RemoveListner(this.node, cc.Node.EventType.TOUCH_START, this.mTouchStartFunc);
        UtilTool.RemoveListner(this.node, cc.Node.EventType.TOUCH_MOVE, this.mTouchMoveFunc);
        UtilTool.RemoveListner(this.node, cc.Node.EventType.TOUCH_END, this.mTouchEndFunc);
        UtilTool.RemoveListner(this.node, cc.Node.EventType.TOUCH_CANCEL, this.mTouchEndFunc);
    }

    private OnTouchStart(rEvent)
    {
        if (this.IsLockInput) return;
        EventManager.Instance.Distribute(SysEvent.kEventInputTouchStart, rEvent);
    }

    private OnTouchMove(rEvent)
    {
        if (this.IsLockInput) return;
        EventManager.Instance.Distribute(SysEvent.kEventInputTouchMove, rEvent);
    }

    private OnTouchEnd(rEvent)
    {
        if (this.IsLockInput) return;
        EventManager.Instance.Distribute(SysEvent.kEventInputTouchEnd, rEvent);
    }
}