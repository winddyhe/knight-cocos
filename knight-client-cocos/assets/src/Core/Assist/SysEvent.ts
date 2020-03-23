export class SysEvent
{
    // 这几个是特殊的消息，不能修改
    public static kEventWSConnected     : number = 20001;
    public static kEventWSDisconnected  : number = 20002;
    public static kEventWSError         : number = 20003;

    // 屏幕输入的事件
    public static kEventInputTouchStart : number = 21001;
    public static kEventInputTouchMove  : number = 21002;
    public static kEventInputTouchEnd   : number = 21003;

    // SDK事件
    public static kEventSDKGetRoomInfo  : number = 22001;
    public static kEventSDKReady        : number = 22002;
    public static kEventSDKStartGame    : number = 22003;
    public static kEventSDKReceiveMsg   : number = 22004;
}