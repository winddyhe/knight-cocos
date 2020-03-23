import { ByteBuffer } from '../../Core/Assist/ByteBuffer';
import { ISerializable, Serialize } from '../../Core/Assist/Serialize';
export class TMsgCommonBool implements ISerializable
{
public Value : boolean;
constructor()
{
this.Value = false;}
public Serialize(rBuffer: ByteBuffer): void
{
Serialize.SerializeBOOL(rBuffer, this.Value);
}
public Deserialize(rBuffer: ByteBuffer): void
{
this.Value = Serialize.DeserializeBOOL(rBuffer);
}
}
export class TMsgCommonN8 implements ISerializable
{
public Value : number;
constructor()
{
this.Value = 0;}
public Serialize(rBuffer: ByteBuffer): void
{
Serialize.SerializeN8(rBuffer, this.Value);
}
public Deserialize(rBuffer: ByteBuffer): void
{
this.Value = Serialize.DeserializeN8(rBuffer);
}
}
export class TMsgCommonN16 implements ISerializable
{
public Value : number;
constructor()
{
this.Value = 0;}
public Serialize(rBuffer: ByteBuffer): void
{
Serialize.SerializeN16(rBuffer, this.Value);
}
public Deserialize(rBuffer: ByteBuffer): void
{
this.Value = Serialize.DeserializeN16(rBuffer);
}
}
export class TMsgCommonN32 implements ISerializable
{
public Value : number;
constructor()
{
this.Value = 0;}
public Serialize(rBuffer: ByteBuffer): void
{
Serialize.SerializeN32(rBuffer, this.Value);
}
public Deserialize(rBuffer: ByteBuffer): void
{
this.Value = Serialize.DeserializeN32(rBuffer);
}
}
export class TMsgCommonN64 implements ISerializable
{
public Value : string;
constructor()
{
this.Value = "";}
public Serialize(rBuffer: ByteBuffer): void
{
Serialize.SerializeN64(rBuffer, this.Value);
}
public Deserialize(rBuffer: ByteBuffer): void
{
this.Value = Serialize.DeserializeN64(rBuffer);
}
}
export class TMsgCommonU8 implements ISerializable
{
public Value : number;
constructor()
{
this.Value = 0;}
public Serialize(rBuffer: ByteBuffer): void
{
Serialize.SerializeU8(rBuffer, this.Value);
}
public Deserialize(rBuffer: ByteBuffer): void
{
this.Value = Serialize.DeserializeU8(rBuffer);
}
}
export class TMsgCommonU16 implements ISerializable
{
public Value : number;
constructor()
{
this.Value = 0;}
public Serialize(rBuffer: ByteBuffer): void
{
Serialize.SerializeU16(rBuffer, this.Value);
}
public Deserialize(rBuffer: ByteBuffer): void
{
this.Value = Serialize.DeserializeU16(rBuffer);
}
}
export class TMsgCommonU32 implements ISerializable
{
public Value : number;
constructor()
{
this.Value = 0;}
public Serialize(rBuffer: ByteBuffer): void
{
Serialize.SerializeU32(rBuffer, this.Value);
}
public Deserialize(rBuffer: ByteBuffer): void
{
this.Value = Serialize.DeserializeU32(rBuffer);
}
}
export class TMsgCommonU64 implements ISerializable
{
public Value : string;
constructor()
{
this.Value = "";}
public Serialize(rBuffer: ByteBuffer): void
{
Serialize.SerializeU64(rBuffer, this.Value);
}
public Deserialize(rBuffer: ByteBuffer): void
{
this.Value = Serialize.DeserializeU64(rBuffer);
}
}
export class TMsgCommonF32 implements ISerializable
{
public Value : number;
constructor()
{
this.Value = 0;}
public Serialize(rBuffer: ByteBuffer): void
{
Serialize.SerializeF32(rBuffer, this.Value);
}
public Deserialize(rBuffer: ByteBuffer): void
{
this.Value = Serialize.DeserializeF32(rBuffer);
}
}
export class TMsgCommonF64 implements ISerializable
{
public Value : number;
constructor()
{
this.Value = 0;}
public Serialize(rBuffer: ByteBuffer): void
{
Serialize.SerializeF64(rBuffer, this.Value);
}
public Deserialize(rBuffer: ByteBuffer): void
{
this.Value = Serialize.DeserializeF64(rBuffer);
}
}
export class TMsgCommonStr implements ISerializable
{
public Value : string;
constructor()
{
this.Value = "";}
public Serialize(rBuffer: ByteBuffer): void
{
Serialize.SerializeSTR(rBuffer, this.Value);
}
public Deserialize(rBuffer: ByteBuffer): void
{
this.Value = Serialize.DeserializeSTR(rBuffer);
}
}
export class TMsgLogin implements ISerializable
{
public UID : string;
constructor()
{
this.UID = "";}
public Serialize(rBuffer: ByteBuffer): void
{
Serialize.SerializeSTR(rBuffer, this.UID);
}
public Deserialize(rBuffer: ByteBuffer): void
{
this.UID = Serialize.DeserializeSTR(rBuffer);
}
}
export class TMsgLoginResp implements ISerializable
{
public ResCode : number;
public PlayerID : string;
public Renamed : boolean;
public PlayerName : string;
public Level : number;
public Exp : string;
public QiYun : number;
public Age : string;
public SelectFaction : number;
public HierarchyLv : number;
constructor()
{
this.ResCode = 0;this.PlayerID = "";this.Renamed = false;this.PlayerName = "";this.Level = 0;this.Exp = "";this.QiYun = 0;this.Age = "";this.SelectFaction = 0;this.HierarchyLv = 0;}
public Serialize(rBuffer: ByteBuffer): void
{
Serialize.SerializeU8(rBuffer, this.ResCode);
Serialize.SerializeU64(rBuffer, this.PlayerID);
Serialize.SerializeBOOL(rBuffer, this.Renamed);
Serialize.SerializeSTR(rBuffer, this.PlayerName);
Serialize.SerializeN32(rBuffer, this.Level);
Serialize.SerializeU64(rBuffer, this.Exp);
Serialize.SerializeN32(rBuffer, this.QiYun);
Serialize.SerializeU64(rBuffer, this.Age);
Serialize.SerializeN32(rBuffer, this.SelectFaction);
Serialize.SerializeN32(rBuffer, this.HierarchyLv);
}
public Deserialize(rBuffer: ByteBuffer): void
{
this.ResCode = Serialize.DeserializeU8(rBuffer);
this.PlayerID = Serialize.DeserializeU64(rBuffer);
this.Renamed = Serialize.DeserializeBOOL(rBuffer);
this.PlayerName = Serialize.DeserializeSTR(rBuffer);
this.Level = Serialize.DeserializeN32(rBuffer);
this.Exp = Serialize.DeserializeU64(rBuffer);
this.QiYun = Serialize.DeserializeN32(rBuffer);
this.Age = Serialize.DeserializeU64(rBuffer);
this.SelectFaction = Serialize.DeserializeN32(rBuffer);
this.HierarchyLv = Serialize.DeserializeN32(rBuffer);
}
}
export class TMsgChangeName implements ISerializable
{
public PlayerName : string;
constructor()
{
this.PlayerName = "";}
public Serialize(rBuffer: ByteBuffer): void
{
Serialize.SerializeSTR(rBuffer, this.PlayerName);
}
public Deserialize(rBuffer: ByteBuffer): void
{
this.PlayerName = Serialize.DeserializeSTR(rBuffer);
}
}
export class TMsgSyncLevel implements ISerializable
{
public Level : number;
public Exp : string;
public QiYun : number;
constructor()
{
this.Level = 0;this.Exp = "";this.QiYun = 0;}
public Serialize(rBuffer: ByteBuffer): void
{
Serialize.SerializeN32(rBuffer, this.Level);
Serialize.SerializeU64(rBuffer, this.Exp);
Serialize.SerializeN32(rBuffer, this.QiYun);
}
public Deserialize(rBuffer: ByteBuffer): void
{
this.Level = Serialize.DeserializeN32(rBuffer);
this.Exp = Serialize.DeserializeU64(rBuffer);
this.QiYun = Serialize.DeserializeN32(rBuffer);
}
}
export class TMsgSyncXiuLianInfo implements ISerializable
{
public TotalLingQi : number;
public ItemID : number;
public GetTime : string;
public EndTime : string;
constructor()
{
this.TotalLingQi = 0;this.ItemID = 0;this.GetTime = "";this.EndTime = "";}
public Serialize(rBuffer: ByteBuffer): void
{
Serialize.SerializeN32(rBuffer, this.TotalLingQi);
Serialize.SerializeN32(rBuffer, this.ItemID);
Serialize.SerializeN64(rBuffer, this.GetTime);
Serialize.SerializeN64(rBuffer, this.EndTime);
}
public Deserialize(rBuffer: ByteBuffer): void
{
this.TotalLingQi = Serialize.DeserializeN32(rBuffer);
this.ItemID = Serialize.DeserializeN32(rBuffer);
this.GetTime = Serialize.DeserializeN64(rBuffer);
this.EndTime = Serialize.DeserializeN64(rBuffer);
}
}
export class TMsgHierarchyUp implements ISerializable
{
public HierarchyID : number;
constructor()
{
this.HierarchyID = 0;}
public Serialize(rBuffer: ByteBuffer): void
{
Serialize.SerializeN32(rBuffer, this.HierarchyID);
}
public Deserialize(rBuffer: ByteBuffer): void
{
this.HierarchyID = Serialize.DeserializeN32(rBuffer);
}
}
export class TMsgSelectFaction implements ISerializable
{
public FactionID : number;
constructor()
{
this.FactionID = 0;}
public Serialize(rBuffer: ByteBuffer): void
{
Serialize.SerializeN32(rBuffer, this.FactionID);
}
public Deserialize(rBuffer: ByteBuffer): void
{
this.FactionID = Serialize.DeserializeN32(rBuffer);
}
}
export class TMsgFightInfo implements ISerializable
{
public RedPlayerName : string;
public BluePlayerName : string;
public Win : number;
constructor()
{
this.RedPlayerName = "";this.BluePlayerName = "";this.Win = 0;}
public Serialize(rBuffer: ByteBuffer): void
{
Serialize.SerializeSTR(rBuffer, this.RedPlayerName);
Serialize.SerializeSTR(rBuffer, this.BluePlayerName);
Serialize.SerializeN32(rBuffer, this.Win);
}
public Deserialize(rBuffer: ByteBuffer): void
{
this.RedPlayerName = Serialize.DeserializeSTR(rBuffer);
this.BluePlayerName = Serialize.DeserializeSTR(rBuffer);
this.Win = Serialize.DeserializeN32(rBuffer);
}
}
export class TMsgAllOnlinePlayer implements ISerializable
{
private mPlayerID : string[];
private mPlayerName : string[];
constructor()
{
this.mPlayerID = [];this.mPlayerName = [];}
public GetPlayerIDCount() : number { return this.mPlayerID.length; }
public GetPlayerIDAt(aIdx : number) : string { return this.mPlayerID[aIdx]; }
public AppendPlayerID(rData : string) : void { this.mPlayerID.push(rData); }
 public GetPlayerNameCount() : number { return this.mPlayerName.length; }
public GetPlayerNameAt(aIdx : number) : string { return this.mPlayerName[aIdx]; }
public AppendPlayerName(rData : string) : void { this.mPlayerName.push(rData); }
 public Serialize(rBuffer: ByteBuffer): void
{
let nPlayerIDCount = this.mPlayerID.length;
Serialize.SerializeN32(rBuffer, nPlayerIDCount);
for (let i = 0; i < nPlayerIDCount; ++i){ Serialize.SerializeU64(rBuffer, this.mPlayerID[i]); }
let nPlayerNameCount = this.mPlayerName.length;
Serialize.SerializeN32(rBuffer, nPlayerNameCount);
for (let i = 0; i < nPlayerNameCount; ++i){ Serialize.SerializeSTR(rBuffer, this.mPlayerName[i]); }
}
public Deserialize(rBuffer: ByteBuffer): void
{
let nPlayerIDCount = Serialize.DeserializeN32(rBuffer);
for (let i = 0; i < nPlayerIDCount; ++i){ this.mPlayerID[i] = Serialize.DeserializeU64(rBuffer); }
let nPlayerNameCount = Serialize.DeserializeN32(rBuffer);
for (let i = 0; i < nPlayerNameCount; ++i){ this.mPlayerName[i] = Serialize.DeserializeSTR(rBuffer); }
}
}
export class TMsgT1 implements ISerializable
{
public Value1 : number;
public Value2 : number;
public Value3 : string;
constructor()
{
this.Value1 = 0;this.Value2 = 0;this.Value3 = "";}
public Serialize(rBuffer: ByteBuffer): void
{
Serialize.SerializeN32(rBuffer, this.Value1);
Serialize.SerializeF32(rBuffer, this.Value2);
Serialize.SerializeSTR(rBuffer, this.Value3);
}
public Deserialize(rBuffer: ByteBuffer): void
{
this.Value1 = Serialize.DeserializeN32(rBuffer);
this.Value2 = Serialize.DeserializeF32(rBuffer);
this.Value3 = Serialize.DeserializeSTR(rBuffer);
}
}
export class TMsgT2 implements ISerializable
{
public Value1 : number;
public Value2 : number;
public Value3 : string;
public Value4 : number;
constructor()
{
this.Value1 = 0;this.Value2 = 0;this.Value3 = "";this.Value4 = 0;}
public Serialize(rBuffer: ByteBuffer): void
{
Serialize.SerializeN32(rBuffer, this.Value1);
Serialize.SerializeF32(rBuffer, this.Value2);
Serialize.SerializeSTR(rBuffer, this.Value3);
Serialize.SerializeN32(rBuffer, this.Value4);
}
public Deserialize(rBuffer: ByteBuffer): void
{
this.Value1 = Serialize.DeserializeN32(rBuffer);
this.Value2 = Serialize.DeserializeF32(rBuffer);
this.Value3 = Serialize.DeserializeSTR(rBuffer);
this.Value4 = Serialize.DeserializeN32(rBuffer);
}
}
export class TMsgTest implements ISerializable
{
public Value0 : boolean;
public Value1 : number;
public Value2 : number;
public Value3 : number;
public Value4 : string;
public Value5 : number;
public Value6 : number;
public Value7 : number;
public Value8 : string;
public Value9 : number;
public Value10 : number;
public Value11 : string;
public Value12 : TMsgT1;
private mValue13 : TMsgT2[];
private mValue14 : number[];
private mValue15 : string[];
constructor()
{
this.Value0 = false;this.Value1 = 0;this.Value2 = 0;this.Value3 = 0;this.Value4 = "";this.Value5 = 0;this.Value6 = 0;this.Value7 = 0;this.Value8 = "";this.Value9 = 0;this.Value10 = 0;this.Value11 = "";this.Value12 = new TMsgT1();this.mValue13 = [];this.mValue14 = [];this.mValue15 = [];}
public GetValue13Count() : number { return this.mValue13.length; }
public GetValue13At(aIdx : number) : TMsgT2 { return this.mValue13[aIdx]; }
public AppendValue13(rData : TMsgT2) : void { this.mValue13.push(rData); }
 public GetValue14Count() : number { return this.mValue14.length; }
public GetValue14At(aIdx : number) : number { return this.mValue14[aIdx]; }
public AppendValue14(rData : number) : void { this.mValue14.push(rData); }
 public GetValue15Count() : number { return this.mValue15.length; }
public GetValue15At(aIdx : number) : string { return this.mValue15[aIdx]; }
public AppendValue15(rData : string) : void { this.mValue15.push(rData); }
 public Serialize(rBuffer: ByteBuffer): void
{
Serialize.SerializeBOOL(rBuffer, this.Value0);
Serialize.SerializeN8(rBuffer, this.Value1);
Serialize.SerializeN16(rBuffer, this.Value2);
Serialize.SerializeN32(rBuffer, this.Value3);
Serialize.SerializeN64(rBuffer, this.Value4);
Serialize.SerializeU8(rBuffer, this.Value5);
Serialize.SerializeU16(rBuffer, this.Value6);
Serialize.SerializeU32(rBuffer, this.Value7);
Serialize.SerializeU64(rBuffer, this.Value8);
Serialize.SerializeF32(rBuffer, this.Value9);
Serialize.SerializeF64(rBuffer, this.Value10);
Serialize.SerializeSTR(rBuffer, this.Value11);
this.Value12.Serialize(rBuffer);
let nValue13Count = this.mValue13.length;
Serialize.SerializeN32(rBuffer, nValue13Count);
for (let i = 0; i < nValue13Count; ++i){ this.mValue13[i].Serialize(rBuffer); }
let nValue14Count = this.mValue14.length;
Serialize.SerializeN32(rBuffer, nValue14Count);
for (let i = 0; i < nValue14Count; ++i){ Serialize.SerializeN32(rBuffer, this.mValue14[i]); }
let nValue15Count = this.mValue15.length;
Serialize.SerializeN32(rBuffer, nValue15Count);
for (let i = 0; i < nValue15Count; ++i){ Serialize.SerializeSTR(rBuffer, this.mValue15[i]); }
}
public Deserialize(rBuffer: ByteBuffer): void
{
this.Value0 = Serialize.DeserializeBOOL(rBuffer);
this.Value1 = Serialize.DeserializeN8(rBuffer);
this.Value2 = Serialize.DeserializeN16(rBuffer);
this.Value3 = Serialize.DeserializeN32(rBuffer);
this.Value4 = Serialize.DeserializeN64(rBuffer);
this.Value5 = Serialize.DeserializeU8(rBuffer);
this.Value6 = Serialize.DeserializeU16(rBuffer);
this.Value7 = Serialize.DeserializeU32(rBuffer);
this.Value8 = Serialize.DeserializeU64(rBuffer);
this.Value9 = Serialize.DeserializeF32(rBuffer);
this.Value10 = Serialize.DeserializeF64(rBuffer);
this.Value11 = Serialize.DeserializeSTR(rBuffer);
this.Value12.Deserialize(rBuffer);
let nValue13Count = Serialize.DeserializeN32(rBuffer);
for (let i = 0; i < nValue13Count; ++i){ this.mValue13[i] = new TMsgT2();
this.mValue13[i].Deserialize(rBuffer);
 }
let nValue14Count = Serialize.DeserializeN32(rBuffer);
for (let i = 0; i < nValue14Count; ++i){ this.mValue14[i] = Serialize.DeserializeN32(rBuffer); }
let nValue15Count = Serialize.DeserializeN32(rBuffer);
for (let i = 0; i < nValue15Count; ++i){ this.mValue15[i] = Serialize.DeserializeSTR(rBuffer); }
}
}
export enum TMsgID {
C2S_LOGIN = 1,
S2C_LOGIN_RESP = 2,
C2S_CHANGE_NAME = 3,
S2C_CHANGE_NAME_RESP = 4,
C2S_XIULIAN_INFO = 5,
C2S_START_XIULIAN = 6,
S2C_SYNC_XIULIAN_INFO = 7,
C2S_GET_XIULIAN_EXP = 8,
C2S_LEVEL_UP = 9,
S2C_SYNC_LEVEL = 10,
S2C_SYNC_AGE = 11,
C2S_GET_SERVER_TIME = 12,
S2C_SYNC_SERVER_TIME = 13,
C2S_HIERARCHY_UP = 14,
S2C_HIERARCHY_UP_RESP = 15,
C2S_SELECTFACTION = 16,
S2C_SELECTFACTION_RESP = 17,
C2S_ATK_PLAYER = 18,
S2C_ATK_PLAYER_RESP = 19,
C2S_GET_ALL_ONLINE_PLAYER = 20,
C2S_GET_ALL_ONLINE_PLAYER_RESP = 21,
C2S_TEST = 22,
S2C_TEST_RESP = 23,
}
