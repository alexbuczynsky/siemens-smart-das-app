declare namespace SmartDAS.Models {
  export interface SiteSetupStructure {
    breaker1IP1: number;
    breaker1IP2: number;
    breaker1IP3: number;
    breaker1IP4: number;
    breaker1SlaveID: number;
    breaker1Type: number;
    breaker1AssociatedOutput: number;
    breaker1AssociatedInput: number;
    breaker2IP1: number;
    breaker2IP2: number;
    breaker2IP3: number;
    breaker2IP4: number;
    breaker2SlaveID: number;
    breaker2Type: number;
    breaker2AssociatedOutput: number;
    breaker2AssociatedInput: number;
    breaker3IP1: number;
    breaker3IP2: number;
    breaker3IP3: number;
    breaker3IP4: number;
    breaker3SlaveID: number;
    breaker3Type: number;
    breaker3AssociatedOutput: number;
    breaker3AssociatedInput: number;
    breaker4IP1: number;
    breaker4IP2: number;
    breaker4IP3: number;
    breaker4IP4: number;
    breaker4SlaveID: number;
    breaker4Type: number;
    breaker4AssociatedOutput: number;
    breaker4AssociatedInput: number;
    breaker5IP1: number;
    breaker5IP2: number;
    breaker5IP3: number;
    breaker5IP4: number;
    breaker5SlaveID: number;
    breaker5Type: number;
    breaker5AssociatedOutput: number;
    breaker5AssociatedInput: number;
    breaker6IP1: number;
    breaker6IP2: number;
    breaker6IP3: number;
    breaker6IP4: number;
    breaker6SlaveID: number;
    breaker6Type: number;
    breaker6AssociatedOutput: number;
    breaker6AssociatedInput: number;
    breaker7IP1: number;
    breaker7IP2: number;
    breaker7IP3: number;
    breaker7IP4: number;
    breaker7SlaveID: number;
    breaker7Type: number;
    breaker7AssociatedOutput: number;
    breaker7AssociatedInput: number;
    breaker8IP1: number;
    breaker8IP2: number;
    breaker8IP3: number;
    breaker8IP4: number;
    breaker8SlaveID: number;
    breaker8Type: number;
    breaker8AssociatedOutput: number;
    breaker8AssociatedInput: number;
    breaker9IP1: number;
    breaker9IP2: number;
    breaker9IP3: number;
    breaker9IP4: number;
    breaker9SlaveID: number;
    breaker9Type: number;
    breaker9AssociatedOutput: number;
    breaker9AssociatedInput: number;
    switchType: number;
  }

  export enum BreakerType {
    UNDEFINED = 0,
    WL_BREAKER = 1,
    VL_BREAKER = 2,
    VA_BREAKER = 3,
  }

  export interface BreakerSetupObject {
    breakerIP1: number;
    breakerIP2: number;
    breakerIP3: number;
    breakerIP4: number;
    breakerSlaveId: number;
    type: BreakerType;
    associatedInput: number;
    associatedOutput: number;
  }

  export interface PLCConfig {
    ip: string;
  }

}