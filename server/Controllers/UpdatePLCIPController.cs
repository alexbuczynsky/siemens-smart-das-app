using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BreakerConfigAPI.Models;
using BreakerConfigAPI.Services;
using Microsoft.AspNetCore.Mvc;
using smartDASNamespace;

namespace BreakerConfigAPI.Controllers {

  [Route ("api/plc/network-configuration")]
  [ApiController]
  public class UpdatePLCIPController : ControllerBase {

    // GET api/plc/network-configuration
    [HttpGet]
    public ActionResult<plcNetworkConfig> Get () {
      var service = new SmartDASService ();
      service.Connect ();
      try {
        var networkConfig = service.getPLCNetwork ();

        service.Disconnect ();
        return networkConfig;
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }

    /// <summary>
    /// Attempts to set the PLC network configuration
    /// </summary>
    /// <param name="newConfig"></param>
    /// <param name="attempts"></param>
    /// <returns></returns>
    private plcNetworkConfig setPLCNetworkRecursively (plcNetworkConfig newConfig, int attempts = 0) {

      int maxAttempts = 10;
      if (attempts >= maxAttempts) {
        throw new Exception ("Could not set new plc network config. Exceeded Max Write Attempts");
      }

      string newIP = $"{newConfig.newIP1}.{newConfig.newIP2}.{newConfig.newIP3}.{newConfig.newIP4}";

      Console.WriteLine ($"Attempt number {attempts} at setting the PLC to {newIP}");

      // create a new service with a connection to the PLC
      var service = new SmartDASService ();

      service.Connect ();

      plcNetworkConfig oldConfig = service.getPLCNetwork ();

      // Attempt to set the PLC network configuration
      service.setPLCNetwork (newConfig);

      // Disconnect the currently active connection with the PLC
      service.Disconnect ();

      // Check that the current configuration is in the same network group as 
      // the old configuration. e.g. if the old config is 192.168.1.5 and the new config is 192.168.122.7
      // then do not recursively check if it can access the plc, because the user has to enter the new
      // ip address in their network configuration. if the old config is 192.168.1.5 and the new config 
      // is 192.168.1.124, then recursively validate the ip adddress on the plc is correct.

      if (
        oldConfig.newIP1 != newConfig.newIP1 ||
        oldConfig.newIP2 != newConfig.newIP2 ||
        oldConfig.newIP3 != newConfig.newIP3
      ) {
        return newConfig;
      }

      // Set the service ip address to the new PLC ip address
      service.IP = newIP;

      // Check the configuration read back from the controller matches the new configuration attempting to be stored

      // Attempt to reconnect to the PLC
      int connectResult = service.Connect ();

      // Disconnect the currently active connection with the PLC
      service.Disconnect ();

      // Check that the connection returned a non-zero error code
      if (connectResult == 0) {
        return newConfig;
      } else {
        // Try to set the PLC network again
        return this.setPLCNetworkRecursively (newConfig, attempts += 1);
      }
    }

    [HttpPut]
    public ActionResult<plcNetworkConfig> Put ([FromBody] plcNetworkConfig newConfig) {
      try {
        plcNetworkConfig networkConfig = this.setPLCNetworkRecursively (newConfig);

        // the write request was successful, save the new configuration to the text file
        string newIP = $"{networkConfig.newIP1}.{networkConfig.newIP2}.{networkConfig.newIP3}.{networkConfig.newIP4}";
        new PLCConfiguration ().IP = newIP;

        return networkConfig;
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }
  }
}