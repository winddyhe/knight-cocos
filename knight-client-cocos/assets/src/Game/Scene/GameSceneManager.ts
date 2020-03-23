
const { ccclass, property } = cc._decorator;

@ccclass
export class GameSceneManager extends cc.Component
{
    private static __instance: GameSceneManager = null;
    public static get Instance(): GameSceneManager { return this.__instance; }

    @property(cc.Node)
    public GameRoot: cc.Node = null;
    
    @property(cc.Graphics)
    public DebugPainter: cc.Graphics = null;

    protected onLoad()
    {
        GameSceneManager.__instance = this;
    }
}
