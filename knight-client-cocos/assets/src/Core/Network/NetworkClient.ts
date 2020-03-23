import { ISerializable, Serialize } from "../Assist/Serialize";
import { ByteBuffer } from "../Assist/ByteBuffer";
import { Func } from '../Assist/Func';
import { INetworkProxy, NetworkHTTP, NetworkWebSocket } from "./NetworkProxy";
import { EventManager } from "../Assist/EventManager";
import { SysEvent } from '../Assist/SysEvent';

class MessageHead implements ISerializable
{
    public MessageID: number;
    public MessageLength: number;
    public Compressed: boolean;

    public Serialize(rBuffer: ByteBuffer): void
    {
        Serialize.SerializeN32(rBuffer, this.MessageID);
        Serialize.SerializeN32(rBuffer, this.MessageLength);
        Serialize.SerializeBOOL(rBuffer, this.Compressed);
    }
    public Deserialize(rBuffer: ByteBuffer): void
    {
        this.MessageID = Serialize.DeserializeN32(rBuffer);
        this.MessageLength = Serialize.DeserializeN32(rBuffer);
        this.Compressed = Serialize.DeserializeBOOL(rBuffer);
    }
}

export class MessageCallback
{
    public MessageHandler: Func;
    public MessageType: { new(): ISerializable };
}

/**
 * 抽象单独网络层
 */
export class NetworkClient
{
    protected mURL: string;

    protected mNetworkProxy: INetworkProxy;
    protected mMessageCallback: { [key: number]: MessageCallback[] };

    protected mSendArrayBuffer: ArrayBuffer;
    protected mSendByteBuffer: ByteBuffer;

    public get URL(): string
    {
        return this.mURL;
    }

    constructor()
    {
        this.mMessageCallback = {};
        this.mSendArrayBuffer = new ArrayBuffer(2048);
        this.mSendByteBuffer = new ByteBuffer(this.mSendArrayBuffer);
    }

    public RegisterMessage<T extends ISerializable>(nMessageID: number, caller: any, rMessageHandler: (message: T) => void, MessageType: { new(): T })
    {
        var rCallbackArray = this.mMessageCallback[nMessageID];
        if (!rCallbackArray)
        {
            this.mMessageCallback[nMessageID] = rCallbackArray = [];
        }

        var rCallback = new MessageCallback();
        rCallback.MessageHandler = new Func(rMessageHandler, caller);
        rCallback.MessageType = MessageType;
        rCallbackArray.push(rCallback);
    }
    public UnregisterMessage<T extends ISerializable>(nMessageID: number, caller: any, rMessageHandler: (message: T) => void)
    {
        var rCallbackArray = this.mMessageCallback[nMessageID];
        if (!rCallbackArray)
        {
            return;
        }

        for (var nIndex = 0; nIndex < rCallbackArray.length; ++nIndex)
        {
            var rCallback = rCallbackArray[nIndex];
            if (rCallback.MessageHandler.Context == caller && rCallback.MessageHandler.Method == rMessageHandler)
            {
                rCallbackArray.splice(nIndex, 1);
                break;
            }
        }
    }

    /**
     * url:
     *   http://host:port//xxxx
     *   ws://host:port//xxx
     */
    public Connect(rURL: string): void
    {
        if (rURL.search('http://') != -1 || rURL.search('https://') != -1)
        {
            this.mNetworkProxy = new NetworkHTTP(this);
        }
        else if (rURL.search('ws://') != -1 || rURL.search('wss://') != -1)
        {
            this.mNetworkProxy = new NetworkWebSocket(this);
        }
        else
        {
            console.error("Network.Connect(url) 参数错误，url只支持ws://或http://、https://");
            return;
        }

        this.mURL = rURL;
        this.mNetworkProxy.Connect(rURL);
    }

    public Send(nMessageID: number, rMessage: ISerializable): void
    {
        if (!this.mNetworkProxy) 
        {
            console.error("Network.Send(ID, Message) 在该函数调用之前，必须要连接一个服务器！");
            return;
        }

        this.mSendByteBuffer.Clear();
        this.mSendByteBuffer.LittleEndian = false;   // 网络传输数据都是用大端

        // 消息头
        var rMessageHead = new MessageHead();
        rMessageHead.MessageID = nMessageID;
        rMessageHead.MessageLength = 0;
        rMessageHead.Compressed = false;
        rMessageHead.Serialize(this.mSendByteBuffer);

        var nMessageHeadEndPos = this.mSendByteBuffer.Offset;
        rMessage.Serialize(this.mSendByteBuffer);
        var nMessageEndPos = this.mSendByteBuffer.Offset;

        // 重组消息头
        rMessageHead.MessageLength = nMessageEndPos - nMessageHeadEndPos;
        this.mSendByteBuffer.Offset = 0;
        rMessageHead.Serialize(this.mSendByteBuffer);
        this.mSendByteBuffer.Offset = nMessageEndPos;

        // 发送消息数据
        this.mNetworkProxy.Send(this.mSendByteBuffer);
    }

    public Disconnect(): void
    {
        if (this.mNetworkProxy)
        {
            this.mNetworkProxy.Disconnect();
            this.mNetworkProxy = null;
        }
    }

    public OnProxyConnected(event: any)
    {
        cc.log("Network Connected !! ");
        EventManager.Instance.Distribute(SysEvent.kEventWSConnected, event);
    }

    public OnProxyDisconnected(error: any)
    {
        cc.log("Network Disconnected !! ", event);
        EventManager.Instance.Distribute(SysEvent.kEventWSDisconnected, event);
        this.mNetworkProxy = null;
    }

    public OnProxyMessage(messageBody: ArrayBuffer): void
    {
        var rBuffer = new ByteBuffer(messageBody);
        rBuffer.LittleEndian = false;

        var rMessageHead = new MessageHead();
        rMessageHead.Deserialize(rBuffer);
        {
            var rCallbackArray = this.mMessageCallback[rMessageHead.MessageID];
            if (rCallbackArray)
            {
                var nMessageBodyStartPos = rBuffer.Offset;
                for (var rCallback of rCallbackArray)
                {
                    rBuffer.Offset = nMessageBodyStartPos;

                    var rMessageBody = new rCallback.MessageType();
                    rMessageBody.Deserialize(rBuffer);

                    rCallback.MessageHandler.Call(rMessageBody);
                }
            }
        }
    }

    public OnProxyError(error: any): void
    {
        cc.error("Network Error !! ", event);
        EventManager.Instance.Distribute(SysEvent.kEventWSError, event);
    }
}