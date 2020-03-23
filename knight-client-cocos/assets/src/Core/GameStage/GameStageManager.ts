import { IDict } from '../Assist/Dict';
import { GameStage } from './GameStage';
import { GameMode } from './GameMode';

export class GameStageManager
{
    private static __instance: GameStageManager = null;
    public static get Instance(): GameStageManager
    {
        if (null == this.__instance)
        {
            this.__instance = new GameStageManager();
        }
        return this.__instance;
    }

    public GameStages: IDict<number, GameStage> = null;
    public GameMode: GameMode = null;

    private constructor()
    {
    }

    public InitGame()
    {
        if (GameMode.CurrentMode == null) return;
        this.GameMode = GameMode.CurrentMode.Call();

        this.GameMode.InitData();

        // @TODO: 对GameStages进行排序，现在暂时不能排序，没有写排序算法
        // this.GameStages.Sort((rItem1, rItem2)=>{ return rItem1.Index > rItem2.Index; });
    }

    public StageInitialize()
    {
        if (this.GameStages == null) return;

        for (let i = 0; i < this.GameStages.Count(); i++)
        {
            this.GameStages.At(i).Init();
        }
    }

    public async StageRunning()
    {
        if (this.GameStages == null) return;

        for (let i = 0; i < this.GameStages.Count(); i++)
        {
            await this.GameStages.At(i).RunAsync();
        }
    }
}
