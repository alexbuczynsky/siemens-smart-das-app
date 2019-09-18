import { BreakerType } from "./BreakerType";
import { SiteSetupStructure } from "./SiteSetupStructure";

export const NUMBER_OF_SUPPORTED_BREAKERS = 9;

/**
 * Checks if the entered IP Address is Acceptable
 *
 * @param {string} ipaddress
 * @returns
 */
function isValidIPAddress(ipaddress: string) {
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
    return true;
  } else {
    return false;
  }
}

function isInRange(num: number, low: number, high: number) {
  if (num >= low && num <= high) {
    return true;
  } else {
    return false;
  }
}

function isValidSlaveId(slaveId: number) {
  return isInRange(slaveId, 0, 255);
}

function isValidIO(input: number) {
  return isInRange(input, 0, 9);
}

export class BreakerSetupObject implements SmartDAS.Models.BreakerSetupObject {

  public static ConvertToSiteSetupStructure(breakers: BreakerSetupObject[], switchType: SmartDAS.Models.SiteSwitchType) {
    if (breakers.length !== NUMBER_OF_SUPPORTED_BREAKERS) {
      throw new Error(`Must contain ${NUMBER_OF_SUPPORTED_BREAKERS} breakers`)
    }

    const config = new SiteSetupStructure();

    breakers.forEach(breaker => {
      const id = breaker.id;
      config.setValue(`breaker${id}IP1`, breaker.breakerIP1);
      config.setValue(`breaker${id}IP2`, breaker.breakerIP2);
      config.setValue(`breaker${id}IP3`, breaker.breakerIP3);
      config.setValue(`breaker${id}IP4`, breaker.breakerIP4);
      config.setValue(`breaker${id}Type`, breaker.type);
      config.setValue(`breaker${id}SlaveID`, breaker.breakerSlaveId);
      config.setValue(`breaker${id}AssociatedInput`, breaker.associatedInput);
      config.setValue(`breaker${id}AssociatedOutput`, breaker.associatedOutput);
    });

    config.switchType = switchType;

    return config;


  }

  public static isValidBreakerConfig(breaker: Partial<SmartDAS.Models.BreakerSetupObject>): void {
    const requiredKeys: ReadonlyArray<keyof SmartDAS.Models.BreakerSetupObject> = [
      'breakerIP1',
      'breakerIP2',
      'breakerIP3',
      'breakerIP4',
      'breakerSlaveId',
      'type',
      'associatedInput',
      'associatedOutput',
    ]

    let numErrors = 0;
    let errorMessage = 'BREAKER CONFIG IS INVALID. REASON(S): ';

    const addError = (reason: string) => {
      numErrors += 1;
      errorMessage += `\n - Reason ${numErrors}: ${reason}`;
    }



    for (const key of requiredKeys) {
      const value = breaker[key];
      if (value === undefined) {
        throw new Error(errorMessage += `Missing key ${key}`);
      }
      switch (key) {
        case 'breakerIP1':
          if (isInRange(value, 0, 255) === false) {
            addError('Invalid IP 1')
          }
          break;
        case 'breakerIP2':
          if (isInRange(value, 0, 255) === false) {
            addError('Invalid IP 2')
          }
          break;
        case 'breakerIP3':
          if (isInRange(value, 0, 255) === false) {
            addError('Invalid IP 3')
          }
          break;
        case 'breakerIP4':
          if (isInRange(value, 0, 255) === false) {
            addError('Invalid IP 4')
          }
          break;
        case 'breakerSlaveId':
          if (isValidSlaveId(value) === false) {
            addError(`Invalid Slave Id`)
          }
          break;
        case 'type':
          break;
        case 'associatedInput':
          if (isValidIO(value) === false) {
            addError(`Invalid Input Assosciation`)
          }
          break;
        case 'associatedOutput':
          if (isValidIO(value) === false) {
            addError(`Invalid Output Assosciation`)
          }
          break;
      }
    }

    if (numErrors > 0) {
      throw new Error(errorMessage);
    }

    return;
  }

  public breakerIP1: number;
  public breakerIP2: number;
  public breakerIP3: number;
  public breakerIP4: number;
  public breakerSlaveId: number;
  public type: BreakerType;
  public associatedInput: number;
  public associatedOutput: number;

  constructor(public id: number, values: Partial<SmartDAS.Models.BreakerSetupObject> = {}) {
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

  get breakerTypeAsString() {
    switch (this.type) {
      case BreakerType.UNDEFINED:
        return 'Not Configured'
      case BreakerType.VA_BREAKER:
        return 'VA Breaker'
      case BreakerType.VL_BREAKER:
        return 'VL Breaker'
      case BreakerType.WL_BREAKER:
        return 'WL Breaker';
      default:
        throw new Error("Not Acceptable Breaker Enumerable");
    }
  }

  get isConfigured() {
    let isConfigured = true;
    isConfigured = isConfigured && this.type !== 0;
    isConfigured = isConfigured && this.ipAddress !== '0.0.0.0';
    isConfigured = isConfigured && this.breakerSlaveId !== 0;

    return isConfigured;
  }

  get isAlarmActive() {
    return false;
  }
}