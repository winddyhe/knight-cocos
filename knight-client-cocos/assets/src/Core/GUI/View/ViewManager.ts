import { UIRoot } from '../UIRoot';
import { View, ViewState } from './View';
import { Func } from '../../Assist/Func';
import { IDict, Dict } from '../../Assist/Dict';
import { UIAssetLoader } from '../../Loader/UIAssetLoader';
import { UtilTool } from '../../Assist/UtilTool';

export class ViewManager
{
    private static __instance: ViewManager = null;
    public static get Instance(): ViewManager
    {
        if (null == this.__instance)
        {
            this.__instance = new ViewManager();
        }
        return this.__instance;
    }

    private mDynamicRoot: cc.Node = null;
    private mPopupRoot: cc.Node = null;

    private mFrameRoot: cc.Node = null;
    private mPageRoot: cc.Node = null;

    private mCurPageViews: IDict<string, View> = null;
    private mCurFixedViews: IDict<string, View> = null;

    constructor()
    {
    }

    public Initialize()
    {
        this.mPageRoot = UIRoot.Instance.DynamicRoot;
        this.mFrameRoot = UIRoot.Instance.DynamicRoot;
        this.mDynamicRoot = UIRoot.Instance.DynamicRoot;
        this.mPopupRoot = UIRoot.Instance.PopupRoot;

        this.mCurPageViews = Dict.CreateStringDict<View>();
        this.mCurFixedViews = Dict.CreateStringDict<View>();
    }

    public Update(dt)
    {
        if (this.mCurFixedViews != null)
        {
            for (let i = 0; i < this.mCurFixedViews.Count(); i++)
            {
                var rView = this.mCurFixedViews.At(i);
                if (rView != null)
                {
                    rView.Update(dt);
                }
            }
        }
        if (this.mCurPageViews != null)
        {
            for (let i = 0; i < this.mCurPageViews.Count(); i++)
            {
                var rView = this.mCurPageViews.At(i);
                if (rView != null)
                {
                    rView.Update(dt);
                }
            }
        }
    }

    public async Open(rViewName: string, rViewState: ViewState, rOpenCompleted: Func = null): Promise<View>
    {
        this.MaybeCloseTopView(rViewState);
        var rViewPrefab = await UIAssetLoader.Instance.Load(rViewName);
        if (rViewPrefab == null)
        {
            cc.error("Cannot find prefab: " + rViewName);
        }
        return await this.OpenView(rViewName, rViewPrefab, rViewState, rOpenCompleted);
    }

    private async OpenView(rViewName: string, rViewPrefab: cc.Prefab, rViewState: ViewState, rOpenCompleted: Func): Promise<View>
    {
        var rPromise = new Promise<View>((resolve, reject) => 
        {
            if (rViewPrefab == null)
            {
                UtilTool.SafeExecute(rOpenCompleted);
                resolve(null);
                return;
            }

            //把View的GameObject结点加到rootCanvas下
            var rViewGo: cc.Node = null;
            switch (rViewState)
            {
                case ViewState.Fixing:
                    rViewGo = UtilTool.AddChild(rViewPrefab, this.mDynamicRoot);
                    break;
                case ViewState.Popup:
                    rViewGo = UtilTool.AddChild(rViewPrefab, this.mPopupRoot);
                    break;
                case ViewState.Frame:
                    rViewGo = UtilTool.AddChild(rViewPrefab, this.mFrameRoot);
                    break;
                case ViewState.Page:
                    rViewGo = UtilTool.AddChild(rViewPrefab, this.mPageRoot);
                    break;
            }

            // 创建View
            var rViewGUID = UtilTool.GUID();
            var rView = View.CreateView(rViewGo);
            if (rView == null)
            {
                cc.log(`View Go ${rViewName} is null..`);
                UtilTool.SafeExecute(rOpenCompleted);
                resolve(null);
                return;
            }

            // View的存储逻辑
            switch (rViewState)
            {
                case ViewState.Fixing:
                    this.mCurFixedViews.Add(rViewGUID, rView);
                    break;
                case ViewState.Popup:
                case ViewState.Frame:
                    this.mCurPageViews.Add(rViewGUID, rView);
                    break;
                case ViewState.Page:
                    if (this.mCurPageViews.Count() == 0)
                    {
                        this.mCurPageViews.Add(rViewGUID, rView);
                    }
                    else
                    {
                        var rTopNode = this.mCurPageViews.LastValue();
                        if (rTopNode != null)
                        {
                            this.mCurPageViews.Remove(rTopNode.GUID);
                            this.mCurPageViews.Add(rViewGUID, rView);
                        }
                    }
                    break;
            }

            // 初始化View 并打开View
            rView.Initialize(rViewName, rViewGUID, rViewState);
            rView.Open();

            UtilTool.SafeExecute(rOpenCompleted);
            resolve(rView);
        });
        return rPromise;
    }

    public Pop(rCloseCompleted: Func = null)
    {
        var rView = this.mCurPageViews.LastValue();
        var rViewGUID = this.mCurPageViews.LastKey();

        if (rView == null)
        {
            UtilTool.SafeExecute(rCloseCompleted);
            return;
        }

        this.mCurPageViews.Remove(rViewGUID);
        rView.Close();

        UtilTool.SafeExecute(rCloseCompleted);
    }

    public CloseView(rViewGUID: string, rCloseCompleted: Func = null)
    {
        var bIsFixedView = false;
        var rView: View = null;

        if (this.mCurFixedViews.ContainsKey(rViewGUID))
        {
            bIsFixedView = true;
            rView = this.mCurFixedViews.Get(rViewGUID);
        }
        else if (this.mCurPageViews.ContainsKey(rViewGUID))
        {
            bIsFixedView = false;
            rView = this.mCurPageViews.Get(rViewGUID);
        }

        if (rView == null)
        {
            UtilTool.SafeExecute(rCloseCompleted);
            return;
        }

        if (bIsFixedView)
        {
            this.mCurFixedViews.Remove(rViewGUID);
        }
        else
        {
            this.mCurPageViews.Remove(rViewGUID);
        }

        rView.Close();
        
        UtilTool.SafeExecute(rCloseCompleted);
    }

    private MaybeCloseTopView(rViewState: ViewState)
    {
        var rView = this.mCurPageViews.LastValue();
        if (rView == null) return;

        var rViewGUID = this.mCurPageViews.LastKey();
        if (rViewState == ViewState.Page)
        {
            this.mCurPageViews.Remove(rViewGUID);
            rView.Close();
            rView = null;
        }
    }
}
