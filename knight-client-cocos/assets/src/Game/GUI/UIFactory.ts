import { ViewController } from '../../Core/GUI/View/ViewController';
import { ViewComponent } from '../../Core/GUI/View/ViewComponent';
import { UIGameMainController } from './GameMain/UIGameMainController';

export class UIFactory
{
    public static GAMEMAIN  : string = "UIGameMain";
    public static GAMEPAD   : string = "UIGamePad";
    public static GAMEPAUSE : string = "UIGamePause";
    public static GAMEOVER  : string = "UIGameOver";

    public static CreateViewController(rViewName: string, rViewGUID: string, rViewComp: ViewComponent): ViewController
    {
        if (rViewName == UIFactory.GAMEMAIN)
        {
            return new UIGameMainController(rViewName, rViewGUID, rViewComp);
        }
        return null;
    }
}