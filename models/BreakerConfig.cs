namespace BreakerConfig.Models {

  public enum BreakerType {
    NOT_AVAILABLE,
    WL_BREAKER,
    VL_BREAKER,
    VA_BREAKER,
  }

  public class BreakerSetupObject 
  {
    public byte breakerIP1 { get; set; }
    public byte breakerIP2 { get; set; }
    public byte breakerIP3 { get; set; }
    public byte breakerIP4 { get; set; }
    public byte breakerSlaveId { get; set; }
    public BreakerType type { get; set; }
    public byte associatedInput { get; set; }
    public byte associatedOutput { get; set; }

    public string serializeIP(){
      return $"{breakerIP1}.{breakerIP2}.{breakerIP3}.{breakerIP4}";
    }
  }

  public class BreakerConfigManager {

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
