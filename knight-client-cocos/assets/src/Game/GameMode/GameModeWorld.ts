import { GameMode } from '../../Core/GameStage/GameMode';
import { StageTask } from '../../Core/GameStage/GameStage';
import { View, ViewState } from '../../Core/GUI/View/View';
import { ViewManager } from '../../Core/GUI/View/ViewManager';
import { UILoading } from '../../Core/GUI/Widget/UILoading';
import { UIFactory } from '../GUI/UIFactory';
import { InputManager } from '../Input/InputManager';
import { GameConst } from '../Common/GameConst';
import { AvatarAssetLoader } from '../../Core/Loader/AvatarAssetLoader';

class StageTaskLoadAssets extends StageTask
{
    public GameMode: GameModeWorld;

    public constructor(rGameMode: GameModeWorld)
    {
        super();
        this.GameMode = rGameMode;
    }

    protected OnInit(): boolean
    {
        this.Name = "LoadAssets";
        return true;
    }

    protected async OnRunAsync()
    {
        await this.GameMode.LoadAssets();
        cc.log("GameStage -- LoadAssets complete.");
    }
}

/// <summary>
/// 初始化数据， 加载界面
/// </summary>
class StageTaskInitData extends StageTask
{
    public GameMode: GameModeWorld;

    public constructor(rGameMode: GameModeWorld)
    {
        super();
        this.GameMode = rGameMode;
    }

    protected OnInit(): boolean
    {
        this.Name = "InitData";
        return true;
    }

    protected async OnRunAsync()
    {
        await this.GameMode.Initialize();

        // 加载GameMain界面
        await ViewManager.Instance.Open(UIFactory.GAMEMAIN, ViewState.Page);

        //隐藏进度条
        UILoading.Instance.Hide();
        cc.log("GameStage -- InitData complete.");
    }
}

export class GameModeWorld extends GameMode
{
    public IsPause: boolean = true;

    private mIsStarting: boolean = false;
    private mCurTime: number;

    public get CurTime()
    {
        return this.mCurTime;
    }

    protected OnBuildStages()
    {
        this.AddGameStage(1, new StageTaskLoadAssets(this));
        this.AddGameStage(2, new StageTaskInitData(this));
    }

    public async Initialize()
    {
        InputManager.Instance.IsLockInput = true;
        this.IsPause = true;
    }

    public async LoadAssets()
    {
    }

    protected OnDestroy()
    {
    }

    public Update(dt: number)
    {
        if (!this.mIsStarting) return;
        if (this.IsPause) return;

        this.mCurTime += dt;
    }

    public async StartGame()
    {
        InputManager.Instance.IsLockInput = false;

        this.IsPause = false;
        this.mIsStarting = true;
        this.mCurTime = 0;
    }

    public ResumeGame()
    {
        this.IsPause = false;
    }

    public PauseGame()
    {
        this.IsPause = true;
    }

    public EndGame()
    {
        this.DestroyGame();
        ViewManager.Instance.Open(UIFactory.GAMEOVER, ViewState.Page);
    }

    public DestroyGame()
    {
        InputManager.Instance.IsLockInput = false;
        
        this.IsPause = false;
        this.mIsStarting = false;
    }
}