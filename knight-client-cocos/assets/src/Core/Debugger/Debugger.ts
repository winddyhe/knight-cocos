
const { ccclass, property } = cc._decorator;

@ccclass
export class Debugger extends cc.Component
{
    private static __instance: Debugger = null;
    public static get Instance(): Debugger { return this.__instance; }

    @property(cc.Graphics)
    public GraphicsPainter: cc.Graphics = null;

    protected onLoad()
    {
        Debugger.__instance = this;
    }
}
