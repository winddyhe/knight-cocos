import { ViewComponent } from './ViewComponent';
import { ViewController } from './ViewController';
import { UIFactory } from '../../../Game/GUI/UIFactory';
import { UtilTool } from '../../Assist/UtilTool';

export enum ViewState
{
    Fixing,
    Frame,
    Popup,
    Page,
}

export class View
{
    public GUID: string = "";
    public ViewName: string = "";
    public CurState: ViewState = ViewState.Fixing;

    public ViewComp: ViewComponent = null;
    public ViewController: ViewController = null;

    constructor()
    {
    }

    public static CreateView(rViewGo: cc.Node): View
    {
        if (rViewGo == null) return null;

        var rView = new View();
        rView.ViewComp = rViewGo.getComponent(ViewComponent);
        return rView;
    }

    public Initialize(rViewName: string, rGUID: string, rState: ViewState)
    {
        this.GUID = rGUID;
        this.CurState = rState;
        this.ViewName = rViewName;

        this.ViewController = UIFactory.CreateViewController(rViewName, this.GUID, this.ViewComp);
        if (this.ViewController != null)
        {
            this.ViewController.Initialize();
        }
    }

    public Open()
    {
        if (this.ViewController == null)
        {
            console.error("View controller is null: ", this.ViewName);
            return;
        } 
        this.ViewController.Open();
    }

    public Update(dt)
    {
        if (this.ViewController == null) return;
        this.ViewController.Update(dt);
    }

    public Close()
    {
        UtilTool.SafeDestroy(this.ViewComp);
        
        if (this.ViewController != null)
            this.ViewController.Close();
        this.ViewController = null;
    }
}