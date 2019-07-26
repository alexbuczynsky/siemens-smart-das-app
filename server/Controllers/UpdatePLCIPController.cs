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
      try {
        return services.smartDAS.getPLCNetwork ();
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }

    [HttpPut]
    public ActionResult<plcNetworkConfig> Put ([FromBody] plcNetworkConfig newConfig) {

      try {
        services.smartDAS.setPLCNetwork (newConfig);
        services.smartDAS.Disconnect ();
        services.smartDAS.Connect();
        return services.smartDAS.getPLCNetwork ();
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }
  }
}