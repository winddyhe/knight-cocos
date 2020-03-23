import { ViewComponent } from '../../../Core/GUI/View/ViewComponent';

const { ccclass, property } = cc._decorator;

@ccclass
export class UIGameMainView extends ViewComponent
{
    @property(cc.Button)
    public BtnPlay: cc.Button = null;
}
