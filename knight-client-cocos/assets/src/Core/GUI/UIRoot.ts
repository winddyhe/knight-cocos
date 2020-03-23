

const { ccclass, property } = cc._decorator;

@ccclass
export class UIRoot extends cc.Component
{
    private static __instance: UIRoot = null;
    public static get Instance(): UIRoot { return this.__instance; }

    @property(cc.Canvas)
    public UICanvas: cc.Canvas = null;
    @property(cc.Camera)
    public UICamera: cc.Camera = null;

    @property(cc.Node)
    public DynamicRoot: cc.Node = null;
    @property(cc.Node)
    public PopupRoot: cc.Node = null;
    @property(cc.Node)
    public GlobalRoot: cc.Node = null;

    protected onLoad()
    {
        UIRoot.__instance = this;
    }
}