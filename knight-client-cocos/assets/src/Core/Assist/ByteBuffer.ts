import { UtilTool } from './UtilTool';

export class ByteBuffer
{
    public Offset: number;
    public BufferView: DataView;
    public LittleEndian: boolean;

    public constructor(rArrayBuffer: ArrayBuffer)
    {
        this.BufferView = new DataView(rArrayBuffer);
        this.Offset = 0;
        this.LittleEndian = false;
    }
    public Clear()
    {
        this.LittleEndian = false;
        this.Offset = 0;
    }
    public GetBuffer(): ArrayBuffer
    {
        return this.BufferView.buffer.slice(0, this.Offset);
    }

    public GetBufferView(): ArrayBufferView
    {
        return this.BufferView;
    }

    public ReadInt8(): number
    {
        var nValue = this.BufferView.getInt8(this.Offset);
        this.Offset += 1;
        return nValue;
    }
    public ReadUInt8(): number
    {
        var nValue = this.BufferView.getUint8(this.Offset);
        this.Offset += 1;
        return nValue;
    }
    public ReadInt16(): number
    {
        var nValue = this.BufferView.getInt16(this.Offset, this.LittleEndian);
        this.Offset += 2;
        return nValue;
    }
    public ReadUInt16(): number
    {
        var nValue = this.BufferView.getUint16(this.Offset, this.LittleEndian);
        this.Offset += 2;
        return nValue;
    }
    public ReadInt32(): number
    {
        var nValue = this.BufferView.getInt32(this.Offset, this.LittleEndian);
        this.Offset += 4;
        return nValue;
    }
    public ReadUInt32(): number
    {
        var nValue = this.BufferView.getUint32(this.Offset, this.LittleEndian);
        this.Offset += 4;
        return nValue;
    }
    public ReadInt64(): string
    {
        let text = "";
        for (var nIndex = 0; nIndex < 8; ++nIndex)
        {
            let tmp = this.BufferView.getUint8(this.Offset).toString(16);
            this.Offset++;
            if (tmp.length < 2)
            {
                text += "0" + tmp;
            }
            else
            {
                text += tmp;
            }
        }
        return text;
    }
    public ReadUInt64(): string
    {
        return this.ReadInt64();
    }
    public ReadFloat32(): number
    {
        var fValue = this.BufferView.getFloat32(this.Offset, this.LittleEndian);
        this.Offset += 4;
        return fValue;
    }
    public ReadFloat64(): number
    {
        var fValue = this.BufferView.getFloat64(this.Offset, this.LittleEndian);
        this.Offset += 8;
        return fValue;
    }
    public ReadString(): string
    {
        var strCount = this.BufferView.getUint32(this.Offset, this.LittleEndian);
        this.Offset += 4;

        var strBuf = new Uint8Array(this.BufferView.buffer, this.Offset, strCount);
        this.Offset += strCount;
        return UtilTool.ToUTF8String(strBuf);
    }
    public ReadBool(): boolean
    {
        return this.ReadInt8() > 0;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    public WriteUInt8(value: number)
    {
        this.BufferView.setUint8(this.Offset, value);
        this.Offset += 1;
    }
    public WriteInt8(value: number)
    {
        this.BufferView.setInt8(this.Offset, value);
        this.Offset += 1;
    }
    public WriteUInt16(value: number)
    {
        this.BufferView.setUint16(this.Offset, value, this.LittleEndian);
        this.Offset += 2;
    }
    public WriteInt16(value: number)
    {
        this.BufferView.setInt16(this.Offset, value, this.LittleEndian);
        this.Offset += 2;
    }
    public WriteUInt32(value: number)
    {
        this.BufferView.setUint32(this.Offset, value, this.LittleEndian);
        this.Offset += 4;
    }
    public WriteInt32(value: number)
    {
        this.BufferView.setInt32(this.Offset, value, this.LittleEndian);
        this.Offset += 4;
    }
    public WriteUInt64(hexValue: string)
    {
        if (hexValue.length != 16)
        {
            console.error("Serialize.Serialize64Bit(rBuffer, hex) hex invalid!");
            return;
        }
        for (var nIndex = 0; nIndex < 8; ++nIndex)
        {
            var num = parseInt(hexValue.substr(nIndex * 2, 2), 16);
            this.BufferView.setUint8(this.Offset, num);
            this.Offset++;
        }
    }
    public WriteInt64(hexValue: string)
    {
        this.WriteUInt64(hexValue);
    }
    public WriteFloat32(value: number)
    {
        this.BufferView.setFloat32(this.Offset, value, this.LittleEndian);
        this.Offset += 4;
    }
    public WriteFloat64(value: number)
    {
        this.BufferView.setFloat64(this.Offset, value, this.LittleEndian);
        this.Offset += 8;
    }
    public WriteString(strValue: string)
    {
        var nHeadPos = this.Offset;
        this.BufferView.setUint32(this.Offset, 0, this.LittleEndian);
        this.Offset += 4;

        var rStrBytes = UtilTool.FromUTF8String(strValue);

        for (let i = 0; i < rStrBytes.length; i++)
        {
            const rByte = rStrBytes[i];
            this.BufferView.setUint8(this.Offset, rByte);
            this.Offset += 1;
        }
        var nEndPos = this.Offset;

        // 重新写长度
        this.Offset = nHeadPos;
        this.BufferView.setUint32(this.Offset, nEndPos - nHeadPos - 4, this.LittleEndian);
        this.Offset = nEndPos;
    }
    public WriteBool(value: boolean)
    {
        this.BufferView.setInt8(this.Offset, value ? 1 : 0);
        this.Offset += 1;
    }
}
