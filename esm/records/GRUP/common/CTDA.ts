import { float, uint32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class CTDA extends Subrecord {
    public readonly flags: uint32;
    public readonly comparisonValue: float;
    public readonly functionIndex: uint32;
    public readonly firstParam: uint32;
    public readonly secondParam: uint32;
    public readonly thirdParam: uint32;
    constructor(buf: ESMBuffer) {
        super('CTDA', buf, false);
        this.flags = buf.readUInt();
        this.comparisonValue = buf.readFloat();
        this.functionIndex = buf.readUInt();
        this.firstParam = buf.readUInt();
        this.secondParam = buf.readUInt();
        this.thirdParam = buf.readUInt();
    }
}
