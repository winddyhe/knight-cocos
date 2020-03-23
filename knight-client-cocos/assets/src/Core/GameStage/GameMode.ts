import { Func } from '../Assist/Func';
import { GameStageManager } from './GameStageManager';
import { Dict, NumberDict } from '../Assist/Dict';
import { GameStage, StageTask } from './GameStage';

export class GameMode
{
    public static CurrentMode: Func;
    public GSM: GameStageManager;

    public InitData()
    {
        this.GSM = GameStageManager.Instance;
        this.GSM.GameStages = Dict.CreateNumberDict<GameStage>();

        this.OnBuildStages();
    }

    public Update(fDeltaTime: number)
    {
        this.OnUpdate(fDeltaTime);
    }

    public Destroy()
    {
        this.OnDestroy();
    }

    protected OnBuildStages()
    {
    }

    protected OnUpdate(fDeltaTime: number)
    {
    }

    protected OnDestroy()
    {
    }

    public AddGameStage(nIndex: number, ...rStageTasks: StageTask[])
    {
        let rStage = new GameStage();
        rStage.Index = nIndex;
        rStage.TaskList = [];
        rStage.TaskList = rStage.TaskList.concat(rStageTasks);
        this.GSM.GameStages.Add(rStage.Index, rStage);
    }
}