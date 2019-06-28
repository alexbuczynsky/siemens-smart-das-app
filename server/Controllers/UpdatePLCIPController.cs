using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using BreakerConfigAPI.Database;
using BreakerConfigAPI.Models;
using Microsoft.AspNetCore.Mvc;
using smartDASNamespace;
using BreakerConfigAPI.Services;

namespace BreakerConfigAPI.Controllers {

  [Route ("api/plc/network-configuration")]
  [ApiController]
  public class UpdatePLCIPController : ControllerBase {

    // GET api/plc/network-configuration
    [HttpGet]
    public ActionResult<ipConfigStructure> Get () {
      try {
        return services.smartDAS.getPLCNetwork();
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }

    [HttpPut]
    public ActionResult<ipConfigStructure> Put ([FromBody] ipConfigStructure newConfig) {

      try {
        services.smartDAS.setPLCNetwork(newConfig);
        constants.Client.Disconnect();
        constants.checkConnection(services.smartDAS.State.targetPLCConfig.IP);
        return services.smartDAS.getPLCNetwork();
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }
  }
}