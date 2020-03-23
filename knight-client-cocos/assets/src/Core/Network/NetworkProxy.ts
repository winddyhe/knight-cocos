import { ByteBuffer } from "../Assist/ByteBuffer";
import { NetworkClient } from "./NetworkClient";

export interface INetworkProxy
{
    Connect(url: string): void;
    Disconnect();

    Send(buff: ByteBuffer): void;
}

export class NetworkWebSocket implements INetworkProxy
{
    protected mSocket: WebSocket;
    protected mSocketURL: string;
    protected mIsConnected: boolean;
    protected mNetWorkClient: NetworkClient;

    constructor(rNetClient: NetworkClient)
    {
        this.mNetWorkClient = rNetClient;
    }

    public Connect(url: string): void
    {
        this.mSocket = new WebSocket(url);
        this.mSocket.binaryType = 'arraybuffer';
        this.mSocket.onopen = this.OnSocketOpen.bind(this);
        this.mSocket.onerror = this.OnSocketError.bind(this);
        this.mSocket.onclose = this.OnSocketClose.bind(this);
        this.mSocket.onmessage = this.OnSocketMessage.bind(this);
    }
    public Disconnect(): void
    {
        this.DoDisconnect();
    }
    public Send(rBuffer: ByteBuffer): void
    {
        this.mSocket.send(rBuffer.GetBuffer());
    }
    private DoDisconnect(): void
    {
        this.mSocket.close();
    }

    protected OnSocketOpen(event: any): void 
    {
        this.mSocketURL = event.currentTarget.url;
        this.mIsConnected = true;
        this.mNetWorkClient.OnProxyConnected(event);
    }
    protected OnSocketError(event: any): void
    {
        this.DoDisconnect();
        this.mNetWorkClient.OnProxyError(event);
    }
    protected OnSocketClose(event: any): void
    {
        this.mNetWorkClient.OnProxyDisconnected(event);
    }
    protected OnSocketMessage(event: any): void
    {
        this.mNetWorkClient.OnProxyMessage(event.data);
    }
}

export class NetworkHTTP implements INetworkProxy
{
    protected mServerURL: string;
    protected mIsConnected: boolean;
    protected mNetWorkClient: NetworkClient;

    constructor(rNetClient: NetworkClient)
    {
    }

    public Connect(url: string): void
    {
        this.mServerURL = url;
        this.mIsConnected = true;
        this.mNetWorkClient.OnProxyDisconnected(this.mServerURL);
    }
    public Disconnect(): void
    {
        this.mNetWorkClient.OnProxyDisconnected(null);
    }
    public Send(rBuffer: ByteBuffer): void
    {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("POST", this.mServerURL);
        xhr.send(rBuffer.GetBuffer());
        xhr.onreadystatechange = this.OnHttpCompleted.bind(this);
    }

    private OnHttpCompleted(xhr: XMLHttpRequest, rEvent: Event): void
    {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207))
        {
            this.mNetWorkClient.OnProxyError(JSON.parse(xhr.responseText));
            return;
        }
        this.mNetWorkClient.OnProxyMessage(xhr.response);
    }
}