import { Func } from './Func';
import { ViewManager } from '../GUI/View/ViewManager';

export class UtilTool
{
    public static DesignWidth: number = 1280;
    public static DesignHeight: number = 720;

    public static HalfDesignWidth: number = UtilTool.DesignWidth / 2.0;
    public static HalfDesignHeight: number = UtilTool.DesignHeight / 2.0;

    public static Epslon = 1e-5;

    public static Lerp(a: number, b: number, t: number): number
    {
        return cc.misc.lerp(a, b, t);
    }

    public static InverseLerp(a: number, b: number, v: number): number
    {
        var total = b - a;
        if (total == 0) return 0;
        return cc.misc.clamp01((v - a) / total);
    }

    ////////////////////////////////////////////////////////////////////////////
    public static async Wait(fWaitTime: number)
    {
        return new Promise((resolve, reject) =>
        {
            setTimeout(() => { resolve(true); }, (fWaitTime));
        });
    }

    public static GetWidthRatio()
    {
        return cc.winSize.width / UtilTool.DesignWidth;
    }

    public static GetHeightRatio()
    {
        return cc.winSize.height / UtilTool.DesignHeight;
    }

    //用于生成uuid
    private static S4()
    {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    public static GUID(): string
    {
        return (UtilTool.S4() + UtilTool.S4() + "-" + UtilTool.S4() + "-" + UtilTool.S4() + "-" + UtilTool.S4() + "-" + UtilTool.S4() + UtilTool.S4() + UtilTool.S4());
    }

    public static AddChild(rPrefab: cc.Prefab, rParentNode: cc.Node): cc.Node
    {
        if (rPrefab == null) return;

        var rInstNode = cc.instantiate(rPrefab);
        rInstNode.setParent(rParentNode);

        rInstNode.position = cc.Vec2.ZERO;
        rInstNode.angle = 0;
        rInstNode.scale = 1.0;

        return rInstNode;
    }

    public static Orderby<TItem, TValue>(rArray: TItem[], rSelector: (i: TItem) => TValue): TItem[]
    {
        if (rArray.length <= 1)
        {
            return rArray;
        }
        const pivotIndex = Math.floor(rArray.length / 2);
        const pivot = rArray.splice(pivotIndex, 1)[0];
        const left = [] as TItem[];
        const right = [] as TItem[];
        for (const i of rArray)
        {
            if (rSelector(i) < rSelector(pivot))
            {
                left.push(i);
            }
            else
            {
                right.push(i);
            }
        }
        return UtilTool.Orderby(left, rSelector).concat([pivot], UtilTool.Orderby(right, rSelector));
    }

    public static FromUTF8String(str: string)
    {
        var idx = 0;
        var len = str.length;
        var bytes = [];
        while (idx < len)
        {
            var c = str.charCodeAt(idx++);
            var buf = [];
            if (c <= 0x7f)
            {
                // 0XXX XXXX 1 byte
                buf[0] = c;
                buf.length = 1;
            }
            else if (c <= 0x7ff)
            {
                // 110X XXXX 2 bytes
                buf[0] = (0xc0 | (c >> 6));
                buf[1] = (0x80 | (c & 0x3f));
                buf.length = 2;
            }
            else if (c <= 0xffff)
            {
                // 1110 XXXX 3 bytes
                buf[0] = (0xe0 | (c >> 12));
                buf[1] = (0x80 | ((c >> 6) & 0x3f));
                buf[2] = (0x80 | (c & 0x3f));
                buf.length = 3;
            }
            [].push.apply(bytes, buf);
        }
        return bytes;
    }

    public static ToUTF8String(bytes)
    {
        var buf = [];
        var idx = 0;
        var len = bytes.length;
        while (idx < len)
        {
            var c = bytes[idx++];
            if ((c & 0x80) == 0)
            {
                // 0XXX XXXX 1 byte (0x00 ~ 0x7f)
                buf.push(c);
            }
            else if ((c & 0xe0) == 0xc0)
            {
                // 110X XXXX 2 bytes (0xc2 ~ 0xdf)
                var d = bytes[idx++];
                buf.push(((c & 0x1f) << 6) | (d & 0x3f));
            }
            else if ((c & 0xf0) == 0xe0)
            {
                // 1110 XXXX 3 bytes (0xe0 ~ 0xe1, 0xee ~ 0xef)
                var d = bytes[idx++];
                var e = bytes[idx++];
                buf.push(((c & 0x0f) << 12) | ((d & 0x3f) << 6) | (e & 0x3f));
            }
            else if ((c & 0xf8) == 0xf0)
            {
                // 1111 0XXX 4 bytes (0xf0 ~ 0xf4)
                var d = bytes[idx++];
                var e = bytes[idx++];
                var f = bytes[idx++];
                buf.push(((c & 0x0f) << 18) | ((d & 0x3f) << 12) |
                    ((e & 0x3f) << 6) | (f & 0x3f));
            }
        }
        return String.fromCharCode.apply(null, buf);
    }

    public static AddListener(rTarget: cc.Node, rEventType: string, rFunc: Func)
    {
        rTarget.on(rEventType, rFunc.Method, rFunc.Context);
    }

    public static RemoveListner(rTarget: cc.Node, rEventType: string, rFunc: Func)
    {
        rTarget.off(rEventType, rFunc.Method, rFunc.Context);
    }

    public static AddClickListner(rTarget: cc.Node, rFunc: Func)
    {
        UtilTool.AddListener(rTarget, cc.Node.EventType.TOUCH_END, rFunc);

    }

    public static RemoveClickListner(rTarget: cc.Node, rFunc: Func)
    {
        UtilTool.RemoveListner(rTarget, cc.Node.EventType.TOUCH_END, rFunc);
    }

    public static SafeDestroy(rComp: cc.Component)
    {
        if (rComp != null && rComp.node != null)
            rComp.node.destroy();
        if (rComp != null)
            rComp.destroy();
        rComp = null;
    }

    public static SafeExecute(rFunc: Func, ...rArgs: any[])
    {
        if (rFunc != null)
        {
            rFunc.Call(...rArgs);
        }
    }

    //判断矩形相交
    public static IsRectIntersect(rect1: cc.Rect, rect2: cc.Rect)
    {
        var maxX, maxY, minX, minY;

        maxX = rect1.x + rect1.width >= rect2.x + rect2.width ? rect1.x + rect1.width : rect2.x + rect2.width;
        maxY = rect1.y + rect1.height >= rect2.y + rect2.height ? rect1.y + rect1.height : rect2.y + rect2.height;
        minX = rect1.x <= rect2.x ? rect1.x : rect2.x;
        minY = rect1.y <= rect2.y ? rect1.y : rect2.y;

        return (maxX - minX <= rect1.width + rect2.width && maxY - minY <= rect1.height + rect2.height);
    }

    public static CalcTriangleArea(a: cc.Vec2, b: cc.Vec2, c: cc.Vec2)
    {
        var ab = b.sub(a);
        var bc = c.sub(b);
        return Math.abs(ab.x * bc.y - ab.y * bc.x) / 2.0;
    }

    public static IsPointInTriangle(p: cc.Vec2, a: cc.Vec2, b: cc.Vec2, c: cc.Vec2)
    {
        var sABC = UtilTool.CalcTriangleArea(a, b, c);
        var sAPB = UtilTool.CalcTriangleArea(a, p, b);
        var sBPC = UtilTool.CalcTriangleArea(b, p, c);
        var sAPC = UtilTool.CalcTriangleArea(a, p, c);
        var sumArea = sAPB + sBPC + sAPC;
        return (Math.abs(sumArea - sABC) <= UtilTool.Epslon);
    }

    public static CalculateNormalAngle(normal: cc.Vec2)
    {
        var angle = 0.0;
        if (normal.x > 0.0)
        {
            normal.x = normal.x > UtilTool.Epslon ? normal.x : UtilTool.Epslon;
            angle = Math.atan(normal.y / normal.x);
        }
        else
        {
            normal.x = (normal.x < -UtilTool.Epslon) ? normal.x : (-UtilTool.Epslon);
            angle = Math.atan(normal.y / normal.x);
            angle += Math.PI;
        }
        return angle;
    }

    public static RotatelNormal(src: cc.Vec2, angle: number)
    {
        var tgt = cc.v2(0.0, 0.0);
        var c_angle = Math.cos(angle), s_angle = Math.sin(angle);
        tgt.x = c_angle * src.x - s_angle * src.y;
        tgt.y = s_angle * src.x + c_angle * src.y;
        return tgt;
    }

    public static FormatDateMinuteAndSecond(rDate: Date)
    {
        var rMinutes = rDate.getMinutes() < 10 ? '0' + rDate.getMinutes() : rDate.getMinutes();
        var rSeconds = rDate.getSeconds() < 10 ? '0' + rDate.getSeconds() : rDate.getSeconds();
        return rMinutes + " : " + rSeconds;
    }
}


