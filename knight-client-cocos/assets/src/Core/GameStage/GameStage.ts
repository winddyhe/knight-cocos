import { UtilTool } from '../Assist/UtilTool';


export class StageTask
{
    public IsCompleted: boolean = false;
    public Name: string = "";

    public Init(): boolean
    {
        if (!this.OnInit())
        {
            cc.error(`GameStage ${this.Name} init failed.`);
            return false;
        }
        return true;
    }

    public async RunAsync()
    {
        this.IsCompleted = false;
        await this.OnRunAsync();
        this.IsCompleted = true;
    }

    protected async OnRunAsync()
    {
    }

    protected OnInit(): boolean
    {
        return true;
    }
}

export class GameStage
{
    public TaskList: StageTask[] = [];
    public Index: number;
    public IsStageCompleted: boolean = false;

    public Init()
    {
        this.IsStageCompleted = false;
        for (let i = 0; i < this.TaskList.length; i++)
        {
            const rTask = this.TaskList[i];
            rTask.Init();
        }
    }

    public async RunAsync()
    {
        for (let i = 0; i < this.TaskList.length; i++)
        {
            const rTask = this.TaskList[i];
            rTask.RunAsync();
        }
        while (!this.CheckStageIsCompleted())
        {
            // 每200毫秒检测一次
            await UtilTool.Wait(200);
        }
        this.IsStageCompleted = true;
    }

    private CheckStageIsCompleted()
    {
        if (this.TaskList == null) return true;

        var bAllCompleted: boolean = true;
        for (let i = 0; i < this.TaskList.length; i++)
        {
            const rTask = this.TaskList[i];
            bAllCompleted = bAllCompleted && rTask.IsCompleted;
        }
        return bAllCompleted;
    }
}