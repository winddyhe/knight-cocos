import { ByteBuffer } from "./ByteBuffer";

export interface ISerializable
{
    Serialize(rBuffer: ByteBuffer): void;
    Deserialize(rBuffer: ByteBuffer): void;
}

export class Serialize
{
    public static DeserializeN8(rBuffer: ByteBuffer): number
    {
        console.assert(rBuffer != null, "Serialize.DeserializeN8(rBuffer) rBuffer is null!");
        return rBuffer.ReadInt8();
    }
    public static DeserializeU8(rBuffer: ByteBuffer): number
    {
        console.assert(rBuffer != null, "Serialize.DeserializeU8(rBuffer) rBuffer is null!");
        return rBuffer.ReadUInt8();
    }
    public static DeserializeN16(rBuffer: ByteBuffer): number
    {
        console.assert(rBuffer != null, "Serialize.DeserializeN16(rBuffer) rBuffer is null!");
        return rBuffer.ReadInt16();
    }
    public static DeserializeU16(rBuffer: ByteBuffer): number
    {
        console.assert(rBuffer != null, "Serialize.DeserializeU16(rBuffer) rBuffer is null!");
        return rBuffer.ReadUInt16();
    }
    public static DeserializeN32(rBuffer: ByteBuffer): number
    {
        console.assert(rBuffer != null, "Serialize.DeserializeN32(rBuffer) rBuffer is null!");
        return rBuffer.ReadInt32();
    }
    public static DeserializeU32(rBuffer: ByteBuffer): number
    {
        console.assert(rBuffer != null, "Serialize.DeserializeU32(rBuffer) rBuffer is null!");
        return rBuffer.ReadUInt32();
    }
    public static DeserializeF32(rBuffer: ByteBuffer): number
    {
        console.assert(rBuffer != null, "Serialize.DeserializeF32(rBuffer) rBuffer is null!");
        return rBuffer.ReadFloat32();
    }
    public static DeserializeF64(rBuffer: ByteBuffer): number
    {
        console.assert(rBuffer != null, "Serialize.DeserializeF64(rBuffer) rBuffer is null!");
        return rBuffer.ReadFloat64();
    }
    public static DeserializeN64(rBuffer: ByteBuffer): string
    {
        console.assert(rBuffer != null, "Serialize.DeserializeN64(rBuffer) rBuffer is null!");
        return rBuffer.ReadInt64();
    }
    public static DeserializeU64(rBuffer: ByteBuffer): string
    {
        console.assert(rBuffer != null, "Serialize.DeserializeU64(rBuffer) rBuffer is null!");
        return rBuffer.ReadUInt64();
    }
    public static DeserializeSTR(rBuffer: ByteBuffer): string
    {
        console.assert(rBuffer != null, "Serialize.DeserializeSTR(rBuffer) rBuffer is null!");
        return rBuffer.ReadString();
    }
    public static DeserializeBOOL(rBuffer: ByteBuffer): boolean
    {
        console.assert(rBuffer != null, "Serialize.DeserializeBOOL(rBuffer) rBuffer is null!");
        return rBuffer.ReadBool();
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    public static SerializeN8(rBuffer: ByteBuffer, num: number): void
    {
        console.assert(rBuffer != null, "Serialize.SerializeN8(rBuffer, num) rBuffer is null!");
        console.assert(num != null, "Serialize.SerializeN8(rBuffer, num) num is null!");
        rBuffer.WriteInt8(num);
    }
    public static SerializeU8(rBuffer: ByteBuffer, num: number): void
    {
        console.assert(rBuffer != null, "Serialize.SerializeU8(rBuffer, num) rBuffer is null!");
        console.assert(num != null, "Serialize.SerializeU8(rBuffer, num) num is null!");
        rBuffer.WriteUInt8(num);
    }
    public static SerializeN16(rBuffer: ByteBuffer, num: number): void
    {
        console.assert(rBuffer != null, "Serialize.SerializeN16(rBuffer, num) rBuffer is null!");
        console.assert(num != null, "Serialize.SerializeN16(rBuffer, num) num is null!");
        rBuffer.WriteInt16(num);
    }
    public static SerializeU16(rBuffer: ByteBuffer, num: number): void
    {
        console.assert(rBuffer != null, "Serialize.SerializeU16(rBuffer, num) rBuffer is null!");
        console.assert(num != null, "Serialize.SerializeU16(rBuffer, num) num is null!");
        rBuffer.WriteUInt16(num);
    }
    public static SerializeN32(rBuffer: ByteBuffer, num: number): void
    {
        console.assert(rBuffer != null, "Serialize.SerializeN32(rBuffer, num) rBuffer is null!");
        console.assert(num != null, "Serialize.SerializeN32(rBuffer, num) num is null!");
        rBuffer.WriteInt32(num);
    }
    public static SerializeU32(rBuffer: ByteBuffer, num: number): void
    {
        console.assert(rBuffer != null, "Serialize.SerializeU32(rBuffer, num) rBuffer is null!");
        console.assert(num != null, "Serialize.SerializeU32(rBuffer, num) num is null!");
        rBuffer.WriteUInt32(num);
    }
    public static SerializeF32(rBuffer: ByteBuffer, num: number): void
    {
        console.assert(rBuffer != null, "Serialize.SerializeF32(rBuffer, num) rBuffer is null!");
        console.assert(num != null, "Serialize.SerializeF32(rBuffer, num) num is null!");
        rBuffer.WriteFloat32(num);
    }
    public static SerializeF64(rBuffer: ByteBuffer, num: number): void
    {
        console.assert(rBuffer != null, "Serialize.SerializeF64(rBuffer, num) rBuffer is null!");
        console.assert(num != null, "Serialize.SerializeF64(rBuffer, num) num is null!");
        rBuffer.WriteFloat64(num);
    }
    public static SerializeN64(rBuffer: ByteBuffer, hexNum: string): void
    {
        console.assert(rBuffer != null, "Serialize.SerializeN64(rBuffer, hexNum) rBuffer is null!");
        console.assert(hexNum != null, "Serialize.SerializeN64(rBuffer, hexNum) hexNum is null!");
        rBuffer.WriteInt64(hexNum);
    }
    public static SerializeU64(rBuffer: ByteBuffer, hexNum: string): void
    {
        console.assert(rBuffer != null, "Serialize.SerializeU64(rBuffer, hexNum) rBuffer is null!");
        console.assert(hexNum != null, "Serialize.SerializeU64(rBuffer, hexNum) hexNum is null!");
        rBuffer.WriteUInt64(hexNum);
    }
    public static SerializeSTR(rBuffer: ByteBuffer, str: string): void
    {
        console.assert(rBuffer != null, "Serialize.SerializeSTR(rBuffer, str) rBuffer is null!");
        console.assert(str != null, "Serialize.SerializeSTR(rBuffer, str) str is null!");
        rBuffer.WriteString(str);
    }
    public static SerializeBOOL(rBuffer: ByteBuffer, value: boolean): void
    {
        console.assert(rBuffer != null, "Serialize.SerializeBOOL(rBuffer, value) rBuffer is null!");
        console.assert(value != null, "Serialize.SerializeBOOL(rBuffer, value) value is null!");
        rBuffer.WriteBool(value);
    }
}
