import { NetworkClient } from '../../Core/Network/NetworkClient';
import { Func } from '../../Core/Assist/Func';
import { EventManager } from '../../Core/Assist/EventManager';
import { ISerializable } from '../../Core/Assist/Serialize';
import { SysEvent } from '../../Core/Assist/SysEvent';
export class NetworkManager
{
    private static __instance: NetworkManager = null;
    public static get Instance(): NetworkManager
    {
        if (null == this.__instance)
        {
            this.__instance = new NetworkManager();
        }
        return this.__instance;
    }

    private mWSClient: NetworkClient;
    private mIsConnected: boolean;

    private mOnConnectedFunc: Func;
    private mOnDisconnectedFunc: Func;
    private mOnErrorFunc: Func;

    private mConnectedPromiseResolve: (value?: {} | PromiseLike<{}>) => void;

    public async Connect(rURL: string)
    {
        this.mOnConnectedFunc = new Func(this.OnConnected, this);
        this.mOnDisconnectedFunc = new Func(this.OnDisconneced, this);
        this.mOnErrorFunc = new Func(this.OnError, this);

        return new Promise((resolve, reject) =>
        {
            this.mIsConnected = false;

            this.mWSClient = new NetworkClient();
            this.mWSClient.Connect(rURL);

            EventManager.Instance.Binding(SysEvent.kEventWSConnected, this.mOnConnectedFunc);
            EventManager.Instance.Binding(SysEvent.kEventWSDisconnected, this.mOnDisconnectedFunc);
            EventManager.Instance.Binding(SysEvent.kEventWSError, this.mOnErrorFunc);

            this.mConnectedPromiseResolve = resolve;
        });
    }

    public Send(nMessageID: number, rMessage: ISerializable)
    {
        if (!this.mIsConnected) return;
        this.mWSClient.Send(nMessageID, rMessage);
    }

    protected OnConnected(rEvent)
    {
        if (this.mConnectedPromiseResolve != null)
            this.mConnectedPromiseResolve();
        this.mIsConnected = true;
    }

    protected OnDisconneced(rEvent)
    {
        this.mIsConnected = false;
        this.Dispose();
    }

    protected OnError(rEvent)
    {
        this.mIsConnected = false;
        this.Dispose();
    }

    protected Dispose()
    {
        EventManager.Instance.Unbinding(SysEvent.kEventWSConnected, this.mOnConnectedFunc);
        EventManager.Instance.Unbinding(SysEvent.kEventWSDisconnected, this.mOnDisconnectedFunc);
        EventManager.Instance.Unbinding(SysEvent.kEventWSError, this.mOnErrorFunc);
    }
}