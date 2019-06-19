using System;
using BreakerConfigAPI.Database;
using BreakerConfigAPI.Models;
using smartDASNamespace;

namespace BreakerConfigAPI.Communications.PLC {
  public class PLC_COM {
    public static PLCConfiguration config = new PLCConfiguration ();
    public static getConfigClass readConfig = new getConfigClass ();
    public static writeConfigClass saveConfig = new writeConfigClass ();

    /// <summary>
    /// If true, the server will not send back error messages, and will instead
    /// just send back default classes and 0 error codes.
    /// </summary>
    public static bool DemoMode = false;

    public static siteSetupStructure readConfigData () {
      var ipAddress = PLC_COM.config.IP;

      siteSetupStructure newStructure;
      try {
        newStructure = PLC_COM.readConfig.readConfigData (ipAddress);
        DB.breakerConfigManager.setSetupStructure (newStructure);
      } catch (Exception e) {
        if (PLC_COM.DemoMode == false) {
          throw e;
        }
      }

      return DB.breakerConfigManager.getSetupStructure ();
    }

    public static siteSetupStructure saveConfigData (siteSetupStructure newStructure) {
      var ipAddress = PLC_COM.config.IP;
      // Console.WriteLine ($"IP ADDRESS: {ipAddress}");
      // Console.WriteLine ($"New Structure: {newStructure.breaker3IP1}");
      // PLC_COM.saveConfig.writeConfig(ipAddress, newStructure);

      try {
        PLC_COM.saveConfig.writeConfig (ipAddress, newStructure);
      } catch (Exception e) {
        if (PLC_COM.DemoMode == false) {
          throw e;
        }
      }

      DB.breakerConfigManager.setSetupStructure (newStructure);

      return DB.breakerConfigManager.getSetupStructure ();
    }
  }
}