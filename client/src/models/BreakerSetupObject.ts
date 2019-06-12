import { BreakerType } from "./BreakerType";

export class BreakerSetupObject implements SmartDAS.Models.BreakerSetupObject {
  public breakerIP1: number;
  public breakerIP2: number;
  public breakerIP3: number;
  public breakerIP4: number;
  public breakerSlaveId: number;
  public type: BreakerType;
  public associatedInput: number;
  public associatedOutput: number;

  constructor(values: Partial<SmartDAS.Models.BreakerSetupObject> = {}) {
    this.breakerIP1 = values.breakerIP1 === undefined ? 0 : values.breakerIP1;
    this.breakerIP2 = values.breakerIP2 === undefined ? 0 : values.breakerIP2;
    this.breakerIP3 = values.breakerIP3 === undefined ? 0 : values.breakerIP3;
    this.breakerIP4 = values.breakerIP4 === undefined ? 0 : values.breakerIP4;
    this.breakerSlaveId = values.breakerSlaveId === undefined ? 0 : values.breakerSlaveId
    this.type = values.type === undefined ? BreakerType.UNDEFINED : values.type
    this.associatedInput = values.associatedInput === undefined ? 0 : values.associatedInput
    this.associatedOutput = values.associatedOutput === undefined ? 0 : values.associatedOutput
  }

  get ipAddress() {
    const {
      breakerIP1,
      breakerIP2,
      breakerIP3,
      breakerIP4,
    } = this;
    return `${breakerIP1}.${breakerIP2}.${breakerIP3}.${breakerIP4}`
  }

  set ipAddress(x: string) {

    const byteArray = x.split('.').map(byte => parseInt(byte, 10));
    this.breakerIP1 = byteArray[0];
    this.breakerIP2 = byteArray[1];
    this.breakerIP3 = byteArray[2];
    this.breakerIP4 = byteArray[3];

  }
}