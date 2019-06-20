import { BreakerSetupObject, NUMBER_OF_SUPPORTED_BREAKERS } from "./BreakerSetupObject";


/**
 * Site Setup Structure
 *
 * @export
 * @class SiteSetupStructure
 * @implements {SmartDAS.Models.SiteSetupStructure}
 */
export class SiteSetupStructure implements SmartDAS.Models.SiteSetupStructure {

  public static ConvertToBreakerSetupObjectArray(config: SmartDAS.Models.SiteSetupStructure) {

    const breakers = new Array(NUMBER_OF_SUPPORTED_BREAKERS).map((x, ii) => {
      return x = new BreakerSetupObject(ii);
    })

    const setupStructure = new SiteSetupStructure(config);

    breakers.forEach(breaker => {
      const id = breaker.id;
      breaker.breakerIP1 = setupStructure.getValue(`breaker${id}IP1`);
      breaker.breakerIP2 = setupStructure.getValue(`breaker${id}IP2`);
      breaker.breakerIP3 = setupStructure.getValue(`breaker${id}IP3`);
      breaker.breakerIP4 = setupStructure.getValue(`breaker${id}IP4`);
      breaker.type = setupStructure.getValue(`breaker${id}Type`);
      breaker.breakerSlaveId = setupStructure.getValue(`breaker${id}SlaveID`);
      breaker.associatedInput = setupStructure.getValue(`breaker${id}AssociatedInput`);
      breaker.associatedOutput = setupStructure.getValue(`breaker${id}AssociatedOutput`);
    });

    return breakers;
  }

  public breaker1IP1: number;
  public breaker1IP2: number;
  public breaker1IP3: number;
  public breaker1IP4: number;
  public breaker1SlaveID: number;
  public breaker1Type: SmartDAS.Models.BreakerType;
  public breaker1AssociatedOutput: number;
  public breaker1AssociatedInput: number;
  public breaker2IP1: number;
  public breaker2IP2: number;
  public breaker2IP3: number;
  public breaker2IP4: number;
  public breaker2SlaveID: number;
  public breaker2Type: SmartDAS.Models.BreakerType;
  public breaker2AssociatedOutput: number;
  public breaker2AssociatedInput: number;
  public breaker3IP1: number;
  public breaker3IP2: number;
  public breaker3IP3: number;
  public breaker3IP4: number;
  public breaker3SlaveID: number;
  public breaker3Type: SmartDAS.Models.BreakerType;
  public breaker3AssociatedOutput: number;
  public breaker3AssociatedInput: number;
  public breaker4IP1: number;
  public breaker4IP2: number;
  public breaker4IP3: number;
  public breaker4IP4: number;
  public breaker4SlaveID: number;
  public breaker4Type: SmartDAS.Models.BreakerType;
  public breaker4AssociatedOutput: number;
  public breaker4AssociatedInput: number;
  public breaker5IP1: number;
  public breaker5IP2: number;
  public breaker5IP3: number;
  public breaker5IP4: number;
  public breaker5SlaveID: number;
  public breaker5Type: SmartDAS.Models.BreakerType;
  public breaker5AssociatedOutput: number;
  public breaker5AssociatedInput: number;
  public breaker6IP1: number;
  public breaker6IP2: number;
  public breaker6IP3: number;
  public breaker6IP4: number;
  public breaker6SlaveID: number;
  public breaker6Type: SmartDAS.Models.BreakerType;
  public breaker6AssociatedOutput: number;
  public breaker6AssociatedInput: number;
  public breaker7IP1: number;
  public breaker7IP2: number;
  public breaker7IP3: number;
  public breaker7IP4: number;
  public breaker7SlaveID: number;
  public breaker7Type: SmartDAS.Models.BreakerType;
  public breaker7AssociatedOutput: number;
  public breaker7AssociatedInput: number;
  public breaker8IP1: number;
  public breaker8IP2: number;
  public breaker8IP3: number;
  public breaker8IP4: number;
  public breaker8SlaveID: number;
  public breaker8Type: SmartDAS.Models.BreakerType;
  public breaker8AssociatedOutput: number;
  public breaker8AssociatedInput: number;
  public breaker9IP1: number;
  public breaker9IP2: number;
  public breaker9IP3: number;
  public breaker9IP4: number;
  public breaker9SlaveID: number;
  public breaker9Type: SmartDAS.Models.BreakerType;
  public breaker9AssociatedOutput: number;
  public breaker9AssociatedInput: number;
  public switchType: SmartDAS.Models.SiteSwitchType;


  constructor(data?: SmartDAS.Models.SiteSetupStructure) {
    this.breaker1IP1 = data ? data.breaker1IP1 : 0;
    this.breaker1IP2 = data ? data.breaker1IP2 : 0;
    this.breaker1IP3 = data ? data.breaker1IP3 : 0;
    this.breaker1IP4 = data ? data.breaker1IP4 : 0;
    this.breaker1SlaveID = data ? data.breaker1SlaveID : 0;
    this.breaker1Type = data ? data.breaker1Type : 0;
    this.breaker1AssociatedOutput = data ? data.breaker1AssociatedOutput : 0;
    this.breaker1AssociatedInput = data ? data.breaker1AssociatedInput : 0;
    this.breaker2IP1 = data ? data.breaker2IP1 : 0;
    this.breaker2IP2 = data ? data.breaker2IP2 : 0;
    this.breaker2IP3 = data ? data.breaker2IP3 : 0;
    this.breaker2IP4 = data ? data.breaker2IP4 : 0;
    this.breaker2SlaveID = data ? data.breaker2SlaveID : 0;
    this.breaker2Type = data ? data.breaker2Type : 0;
    this.breaker2AssociatedOutput = data ? data.breaker2AssociatedOutput : 0;
    this.breaker2AssociatedInput = data ? data.breaker2AssociatedInput : 0;
    this.breaker3IP1 = data ? data.breaker3IP1 : 0;
    this.breaker3IP2 = data ? data.breaker3IP2 : 0;
    this.breaker3IP3 = data ? data.breaker3IP3 : 0;
    this.breaker3IP4 = data ? data.breaker3IP4 : 0;
    this.breaker3SlaveID = data ? data.breaker3SlaveID : 0;
    this.breaker3Type = data ? data.breaker3Type : 0;
    this.breaker3AssociatedOutput = data ? data.breaker3AssociatedOutput : 0;
    this.breaker3AssociatedInput = data ? data.breaker3AssociatedInput : 0;
    this.breaker4IP1 = data ? data.breaker4IP1 : 0;
    this.breaker4IP2 = data ? data.breaker4IP2 : 0;
    this.breaker4IP3 = data ? data.breaker4IP3 : 0;
    this.breaker4IP4 = data ? data.breaker4IP4 : 0;
    this.breaker4SlaveID = data ? data.breaker4SlaveID : 0;
    this.breaker4Type = data ? data.breaker4Type : 0;
    this.breaker4AssociatedOutput = data ? data.breaker4AssociatedOutput : 0;
    this.breaker4AssociatedInput = data ? data.breaker4AssociatedInput : 0;
    this.breaker5IP1 = data ? data.breaker5IP1 : 0;
    this.breaker5IP2 = data ? data.breaker5IP2 : 0;
    this.breaker5IP3 = data ? data.breaker5IP3 : 0;
    this.breaker5IP4 = data ? data.breaker5IP4 : 0;
    this.breaker5SlaveID = data ? data.breaker5SlaveID : 0;
    this.breaker5Type = data ? data.breaker5Type : 0;
    this.breaker5AssociatedOutput = data ? data.breaker5AssociatedOutput : 0;
    this.breaker5AssociatedInput = data ? data.breaker5AssociatedInput : 0;
    this.breaker6IP1 = data ? data.breaker6IP1 : 0;
    this.breaker6IP2 = data ? data.breaker6IP2 : 0;
    this.breaker6IP3 = data ? data.breaker6IP3 : 0;
    this.breaker6IP4 = data ? data.breaker6IP4 : 0;
    this.breaker6SlaveID = data ? data.breaker6SlaveID : 0;
    this.breaker6Type = data ? data.breaker6Type : 0;
    this.breaker6AssociatedOutput = data ? data.breaker6AssociatedOutput : 0;
    this.breaker6AssociatedInput = data ? data.breaker6AssociatedInput : 0;
    this.breaker7IP1 = data ? data.breaker7IP1 : 0;
    this.breaker7IP2 = data ? data.breaker7IP2 : 0;
    this.breaker7IP3 = data ? data.breaker7IP3 : 0;
    this.breaker7IP4 = data ? data.breaker7IP4 : 0;
    this.breaker7SlaveID = data ? data.breaker7SlaveID : 0;
    this.breaker7Type = data ? data.breaker7Type : 0;
    this.breaker7AssociatedOutput = data ? data.breaker7AssociatedOutput : 0;
    this.breaker7AssociatedInput = data ? data.breaker7AssociatedInput : 0;
    this.breaker8IP1 = data ? data.breaker8IP1 : 0;
    this.breaker8IP2 = data ? data.breaker8IP2 : 0;
    this.breaker8IP3 = data ? data.breaker8IP3 : 0;
    this.breaker8IP4 = data ? data.breaker8IP4 : 0;
    this.breaker8SlaveID = data ? data.breaker8SlaveID : 0;
    this.breaker8Type = data ? data.breaker8Type : 0;
    this.breaker8AssociatedOutput = data ? data.breaker8AssociatedOutput : 0;
    this.breaker8AssociatedInput = data ? data.breaker8AssociatedInput : 0;
    this.breaker9IP1 = data ? data.breaker9IP1 : 0;
    this.breaker9IP2 = data ? data.breaker9IP2 : 0;
    this.breaker9IP3 = data ? data.breaker9IP3 : 0;
    this.breaker9IP4 = data ? data.breaker9IP4 : 0;
    this.breaker9SlaveID = data ? data.breaker9SlaveID : 0;
    this.breaker9Type = data ? data.breaker9Type : 0;
    this.breaker9AssociatedOutput = data ? data.breaker9AssociatedOutput : 0;
    this.breaker9AssociatedInput = data ? data.breaker9AssociatedInput : 0;
    this.switchType = data ? data.switchType : 0;
  }

  get breakers(): BreakerSetupObject[] {
    return SiteSetupStructure.ConvertToBreakerSetupObjectArray(this);
  }

  /**
   * Avoids key type checks and allows
   * the values to be set
   *
   * @param {string} key
   * @param {any} value
   * @memberof SiteSetupStructure
   */
  public setValue(key: string, value: any) {
    const that = this as any;
    const keyExists = Object.keys(this).includes(key);

    if (!keyExists) {
      throw new Error(`The key specified "${key}" does not exist on the SiteSetupStructure class`)
    }

    that[key] = value;
  }

  public getValue(key: string) {
    const that = this as any;
    const keyExists = Object.keys(this).includes(key);

    if (!keyExists) {
      throw new Error(`The key specified "${key}" does not exist on the SiteSetupStructure class`)
    }

    return that[key];
  }


}