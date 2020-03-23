import { Func } from './Func';
import { IDict, Dict } from './Dict';
import { UtilTool } from './UtilTool';

class Event
{
    public MsgCode: number;
    public Callbacks: Func[];
}

export class EventManager
{
    private static __instance: EventManager = null;
    public static get Instance(): EventManager
    {
        if (null == this.__instance)
        {
            this.__instance = new EventManager();
        }
        return this.__instance;
    }

    protected mEvents: IDict<number, Event> = null;

    public Initialize()
    {
        this.mEvents = Dict.CreateNumberDict<Event>();
    }

    public Binding(nMsgCode: number, rEventCallback: Func)
    {
        var rEvent: Event = null;
        if (this.mEvents.ContainsKey(nMsgCode))
        {
            rEvent = this.mEvents.Get(nMsgCode);
            if (rEvent.Callbacks == null)
            {
                rEvent.Callbacks = [];
            }
            rEvent.Callbacks.push(rEventCallback);
        }
        else
        {
            rEvent = new Event();
            rEvent.MsgCode = nMsgCode;
            rEvent.Callbacks = [];
            rEvent.Callbacks.push(rEventCallback);

            this.mEvents.Add(nMsgCode, rEvent);
        }
    }

    public Unbinding(nMsgCode: number, rEventCallback: Func)
    {
        var rEvent: Event = null;
        rEvent = this.mEvents.Get(nMsgCode);
        if (rEvent.Callbacks != null)
        {
            var nIndex = rEvent.Callbacks.indexOf(rEventCallback);
            if (nIndex != -1)
            {
                rEvent.Callbacks.splice(nIndex);
            }
        }
    }

    public Distribute(nMsgCode: number, ...rArgs: any[])
    {
        var rEvent: Event = null;
        rEvent = this.mEvents.Get(nMsgCode);
        if (rEvent != null)
        {
            if (rEvent.Callbacks != null)
            {
                for (let i = 0; i < rEvent.Callbacks.length; i++)
                {
                    const rCallback = rEvent.Callbacks[i];
                    UtilTool.SafeExecute(rCallback, ...rArgs);
                }
            }
        }
    }
}