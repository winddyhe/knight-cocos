import { UIGameMainView } from "./UIGameMainView";
import { ViewController } from '../../../Core/GUI/View/ViewController';
import { UtilTool } from "../../../Core/Assist/UtilTool";
import { Func } from "../../../Core/Assist/Func";
import { World } from "../../GameFlow/World";
import { ViewManager } from "../../../Core/GUI/View/ViewManager";
import { UIToast } from "../../../Core/GUI/Widget/UIToast";

export class UIGameMainController extends ViewController
{
    protected mView: UIGameMainView;
    protected mBtnPlayHandlerFunc: Func;

    public constructor(rViewName: string, rViewGUID: string, rView: any)
    {
        super();
        this.ViewName = rViewName;
        this.GUID = rViewGUID;
        this.mView = rView;
    }

    public Open()
    {
        this.mBtnPlayHandlerFunc = new Func(this.OnBtnPlayHandler, this);
        UtilTool.AddClickListner(this.mView.BtnPlay.node, this.mBtnPlayHandlerFunc);
    }

    public Close()
    {
        UtilTool.RemoveClickListner(this.mView.BtnPlay.node, this.mBtnPlayHandlerFunc);
    }

    public Update(dt)
    {
    }

    private OnBtnPlayHandler()
    {
        this.StartGame();
    }

    private async StartGame()
    {
        UIToast.Instance.Show("Play Clicked ...", 3.0);
        
        await UtilTool.Wait(1000);
        ViewManager.Instance.CloseView(this.GUID);
        World.Instance.GameMode.StartGame();
    }
}
