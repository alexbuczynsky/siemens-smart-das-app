using smartDASNamespace;
namespace BreakerConfigAPI.Models {

  public class BreakerSetupObject 
  {
    public byte breakerIP1 { get; set; }
    public byte breakerIP2 { get; set; }
    public byte breakerIP3 { get; set; }
    public byte breakerIP4 { get; set; }
    public byte breakerSlaveId { get; set; }
    public BreakerType type { get; set; }
    public int associatedInput { get; set; }
    public int associatedOutput { get; set; }

    public string serializeIP(){
      return $"{breakerIP1}.{breakerIP2}.{breakerIP3}.{breakerIP4}";
    }
  }

  public class BreakerConfigManager {
    public SiteSwitchType switchType = 0;

    public BreakerSetupObject[] configurations = new BreakerSetupObject[9]{
      new BreakerSetupObject(),
      new BreakerSetupObject(),
      new BreakerSetupObject(),
      new BreakerSetupObject(),
      new BreakerSetupObject(),
      new BreakerSetupObject(),
      new BreakerSetupObject(),
      new BreakerSetupObject(),
      new BreakerSetupObject(),
    };

    public siteSetupStructure getSetupStructure(){
      return new siteSetupStructure()
      {
        breaker1IP1 = configurations[0].breakerIP1,
        breaker1IP2 = configurations[0].breakerIP2,
        breaker1IP3 = configurations[0].breakerIP3,
        breaker1IP4 = configurations[0].breakerIP4,
        breaker1SlaveID = configurations[0].breakerSlaveId,
        breaker1Type = configurations[0].type,
        breaker1AssociatedOutput = configurations[0].associatedOutput,
        breaker1AssociatedInput = configurations[0].associatedInput,
        
        breaker2IP1 = configurations[1].breakerIP1,
        breaker2IP2 = configurations[1].breakerIP2,
        breaker2IP3 = configurations[1].breakerIP3,
        breaker2IP4 = configurations[1].breakerIP4,
        breaker2SlaveID = configurations[1].breakerSlaveId,
        breaker2Type = configurations[1].type,
        breaker2AssociatedOutput = configurations[1].associatedOutput,
        breaker2AssociatedInput = configurations[1].associatedInput,

        breaker3IP1 = configurations[2].breakerIP1,
        breaker3IP2 = configurations[2].breakerIP2,
        breaker3IP3 = configurations[2].breakerIP3,
        breaker3IP4 = configurations[2].breakerIP4,
        breaker3SlaveID = configurations[2].breakerSlaveId,
        breaker3Type = configurations[2].type,
        breaker3AssociatedOutput = configurations[2].associatedOutput,
        breaker3AssociatedInput = configurations[2].associatedInput,

        breaker4IP1 = configurations[3].breakerIP1,
        breaker4IP2 = configurations[3].breakerIP2,
        breaker4IP3 = configurations[3].breakerIP3,
        breaker4IP4 = configurations[3].breakerIP4,
        breaker4SlaveID = configurations[3].breakerSlaveId,
        breaker4Type = configurations[3].type,
        breaker4AssociatedOutput = configurations[3].associatedOutput,
        breaker4AssociatedInput = configurations[3].associatedInput,

        breaker5IP1 = configurations[4].breakerIP1,
        breaker5IP2 = configurations[4].breakerIP2,
        breaker5IP3 = configurations[4].breakerIP3,
        breaker5IP4 = configurations[4].breakerIP4,
        breaker5SlaveID = configurations[4].breakerSlaveId,
        breaker5Type = configurations[4].type,
        breaker5AssociatedOutput = configurations[4].associatedOutput,
        breaker5AssociatedInput = configurations[4].associatedInput,
        
        breaker6IP1 = configurations[5].breakerIP1,
        breaker6IP2 = configurations[5].breakerIP2,
        breaker6IP3 = configurations[5].breakerIP3,
        breaker6IP4 = configurations[5].breakerIP4,
        breaker6SlaveID = configurations[5].breakerSlaveId,
        breaker6Type = configurations[5].type,
        breaker6AssociatedOutput = configurations[5].associatedOutput,
        breaker6AssociatedInput = configurations[5].associatedInput,

        breaker7IP1 = configurations[6].breakerIP1,
        breaker7IP2 = configurations[6].breakerIP2,
        breaker7IP3 = configurations[6].breakerIP3,
        breaker7IP4 = configurations[6].breakerIP4,
        breaker7SlaveID = configurations[6].breakerSlaveId,
        breaker7Type = configurations[6].type,
        breaker7AssociatedOutput = configurations[6].associatedOutput,
        breaker7AssociatedInput = configurations[6].associatedInput,

        breaker8IP1 = configurations[7].breakerIP1,
        breaker8IP2 = configurations[7].breakerIP2,
        breaker8IP3 = configurations[7].breakerIP3,
        breaker8IP4 = configurations[7].breakerIP4,
        breaker8SlaveID = configurations[7].breakerSlaveId,
        breaker8Type = configurations[7].type,
        breaker8AssociatedOutput = configurations[7].associatedOutput,
        breaker8AssociatedInput = configurations[7].associatedInput,
        
        breaker9IP1 = configurations[8].breakerIP1,
        breaker9IP2 = configurations[8].breakerIP2,
        breaker9IP3 = configurations[8].breakerIP3,
        breaker9IP4 = configurations[8].breakerIP4,
        breaker9SlaveID = configurations[8].breakerSlaveId,
        breaker9Type = configurations[8].type,
        breaker9AssociatedOutput = configurations[8].associatedOutput,
        breaker9AssociatedInput = configurations[8].associatedInput,

        switchType = switchType,
      };
    }

    public void setSetupStructure(siteSetupStructure newSetup){
        configurations[0].breakerIP1 = newSetup.breaker1IP1;
        configurations[0].breakerIP2 = newSetup.breaker1IP2;
        configurations[0].breakerIP3 = newSetup.breaker1IP3;
        configurations[0].breakerIP4 = newSetup.breaker1IP4;
        configurations[0].breakerSlaveId = newSetup.breaker1SlaveID;
        configurations[0].type = newSetup.breaker1Type;
        configurations[0].associatedOutput = newSetup.breaker1AssociatedOutput;
        configurations[0].associatedInput = newSetup.breaker1AssociatedInput;
        
        configurations[1].breakerIP1 = newSetup.breaker2IP1;
        configurations[1].breakerIP2 = newSetup.breaker2IP2;
        configurations[1].breakerIP3 = newSetup.breaker2IP3;
        configurations[1].breakerIP4 = newSetup.breaker2IP4;
        configurations[1].breakerSlaveId = newSetup.breaker2SlaveID;
        configurations[1].type = newSetup.breaker2Type;
        configurations[1].associatedOutput = newSetup.breaker2AssociatedOutput;
        configurations[1].associatedInput = newSetup.breaker2AssociatedInput;

        configurations[2].breakerIP1 = newSetup.breaker3IP1;
        configurations[2].breakerIP2 = newSetup.breaker3IP2;
        configurations[2].breakerIP3 = newSetup.breaker3IP3;
        configurations[2].breakerIP4 = newSetup.breaker3IP4;
        configurations[2].breakerSlaveId = newSetup.breaker3SlaveID;
        configurations[2].type = newSetup.breaker3Type;
        configurations[2].associatedOutput = newSetup.breaker3AssociatedOutput;
        configurations[2].associatedInput = newSetup.breaker3AssociatedInput;

        configurations[3].breakerIP1 = newSetup.breaker4IP1;
        configurations[3].breakerIP2 = newSetup.breaker4IP2;
        configurations[3].breakerIP3 = newSetup.breaker4IP3;
        configurations[3].breakerIP4 = newSetup.breaker4IP4;
        configurations[3].breakerSlaveId = newSetup.breaker4SlaveID;
        configurations[3].type = newSetup.breaker4Type;
        configurations[3].associatedOutput = newSetup.breaker4AssociatedOutput;
        configurations[3].associatedInput = newSetup.breaker4AssociatedInput;

        configurations[4].breakerIP1 = newSetup.breaker5IP1;
        configurations[4].breakerIP2 = newSetup.breaker5IP2;
        configurations[4].breakerIP3 = newSetup.breaker5IP3;
        configurations[4].breakerIP4 = newSetup.breaker5IP4;
        configurations[4].breakerSlaveId = newSetup.breaker5SlaveID;
        configurations[4].type = newSetup.breaker5Type;
        configurations[4].associatedOutput = newSetup.breaker5AssociatedOutput;
        configurations[4].associatedInput = newSetup.breaker5AssociatedInput;
        
        configurations[5].breakerIP1 = newSetup.breaker6IP1;
        configurations[5].breakerIP2 = newSetup.breaker6IP2;
        configurations[5].breakerIP3 = newSetup.breaker6IP3;
        configurations[5].breakerIP4 = newSetup.breaker6IP4;
        configurations[5].breakerSlaveId = newSetup.breaker6SlaveID;
        configurations[5].type = newSetup.breaker6Type;
        configurations[5].associatedOutput = newSetup.breaker6AssociatedOutput;
        configurations[5].associatedInput = newSetup.breaker6AssociatedInput;

        configurations[6].breakerIP1 = newSetup.breaker7IP1;
        configurations[6].breakerIP2 = newSetup.breaker7IP2;
        configurations[6].breakerIP3 = newSetup.breaker7IP3;
        configurations[6].breakerIP4 = newSetup.breaker7IP4;
        configurations[6].breakerSlaveId = newSetup.breaker7SlaveID;
        configurations[6].type = newSetup.breaker7Type;
        configurations[6].associatedOutput = newSetup.breaker7AssociatedOutput;
        configurations[6].associatedInput = newSetup.breaker7AssociatedInput;

        configurations[7].breakerIP1 = newSetup.breaker8IP1;
        configurations[7].breakerIP2 = newSetup.breaker8IP2;
        configurations[7].breakerIP3 = newSetup.breaker8IP3;
        configurations[7].breakerIP4 = newSetup.breaker8IP4;
        configurations[7].breakerSlaveId = newSetup.breaker8SlaveID;
        configurations[7].type = newSetup.breaker8Type;
        configurations[7].associatedOutput = newSetup.breaker8AssociatedOutput;
        configurations[7].associatedInput = newSetup.breaker8AssociatedInput;
        
        configurations[8].breakerIP1 = newSetup.breaker9IP1;
        configurations[8].breakerIP2 = newSetup.breaker9IP2;
        configurations[8].breakerIP3 = newSetup.breaker9IP3;
        configurations[8].breakerIP4 = newSetup.breaker9IP4;
        configurations[8].breakerSlaveId = newSetup.breaker9SlaveID;
        configurations[8].type = newSetup.breaker9Type;
        configurations[8].associatedOutput = newSetup.breaker9AssociatedOutput;
        configurations[8].associatedInput = newSetup.breaker9AssociatedInput;

        switchType = newSetup.switchType;
    }

    public BreakerSetupObject[] readBreakerConfigs() {
      // do some logic
      return configurations;
    }

    // public BreakerSetupObject readBreakerConfig(int breakerNumber) {
    //   BreakerSetupObject[] fullConfig = readBreakerConfig();
    //   return fullConfig[breakerNumber];
    // }
  }

  
}
