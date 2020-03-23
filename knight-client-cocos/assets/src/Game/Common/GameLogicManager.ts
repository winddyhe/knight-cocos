import { ViewManager } from '../../Core/GUI/View/ViewManager';
import { World } from '../GameFlow/World';
import { EventManager } from '../../Core/Assist/EventManager';
import { InputManager } from '../Input/InputManager';

const { ccclass, property } = cc._decorator;

@ccclass
export class GameLogicManager extends cc.Component
{
    private static __instance: GameLogicManager = null;
    public static get Instance(): GameLogicManager { return this.__instance; }

    protected onLoad()
    {
        GameLogicManager.__instance = this;
    }

    protected update(dt)
    {
        ViewManager.Instance.Update(dt);
        World.Instance.Update(dt);
    }

    public Initialize()
    {
        // 初始化事件管理器
        EventManager.Instance.Initialize();

        // 初始化UI框架
        ViewManager.Instance.Initialize();
        
        // 输入管理器先禁用
        InputManager.Instance.IsLockInput = true;
    }
}