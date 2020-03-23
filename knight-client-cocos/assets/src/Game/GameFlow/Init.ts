import { UIRoot } from "../../Core/GUI/UIRoot";
import { UILoading } from '../../Core/GUI/Widget/UILoading';
import { UtilTool } from '../../Core/Assist/UtilTool';
import { GameLogicManager } from '../Common/GameLogicManager';
import { World } from './World';

const { ccclass, property } = cc._decorator;
@ccclass
export class Init extends cc.Component
{
    onLoad()
    {
        UtilTool.DesignWidth = cc.winSize.width;
        UtilTool.DesignHeight = cc.winSize.height;
        console.log(UtilTool.DesignWidth, UtilTool.DesignHeight);
    }

    /**
     * 开始游戏
     */
    protected async start()
    {
        UIRoot.Instance.GlobalRoot.active = true;
        UILoading.Instance.Show(1.8, "正在加载游戏资源, 过程不消耗流量!");

        // 游戏主逻辑管理器初始化
        GameLogicManager.Instance.Initialize();

        // 进入游戏世界
        await World.Instance.Initialize();
    }
}