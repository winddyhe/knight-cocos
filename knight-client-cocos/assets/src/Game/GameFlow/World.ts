import { GameModeWorld } from '../GameMode/GameModeWorld';
import { GameMode } from '../../Core/GameStage/GameMode';
import { Func } from '../../Core/Assist/Func';
import { GameStageManager } from '../../Core/GameStage/GameStageManager';

export class World
{
    private static __instance: World = null;
    public static get Instance(): World
    {
        if (null == this.__instance)
        {
            this.__instance = new World();
        }
        return this.__instance;
    }

    private mGameMode: GameModeWorld;

    public get GameMode()
    {
        return this.mGameMode;
    }

    public async Initialize()
    {
        this.mGameMode = new GameModeWorld();
        GameMode.CurrentMode = new Func(() =>
        {
            return this.mGameMode;
        }, this);

        GameStageManager.Instance.InitGame();
        GameStageManager.Instance.StageInitialize();

        await GameStageManager.Instance.StageRunning();
    }

    public Update(dt)
    {
        if (this.mGameMode == null) return;
        this.mGameMode.Update(dt);
    }
}