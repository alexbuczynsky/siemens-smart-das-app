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
      var service = new SmartDASService();
      try {
        var networkConfig = service.getPLCNetwork ();

        service.Disconnect();
        return networkConfig;
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }

    [HttpPut]
    public ActionResult<plcNetworkConfig> Put ([FromBody] plcNetworkConfig newConfig) {
      var service = new SmartDASService();
      try {
        service.setPLCNetwork (newConfig);
        service.Disconnect ();
        service.Connect();

        var networkConig = service.getPLCNetwork ();
        service.Disconnect();
        return networkConig;
      } catch (Exception e) {
        service.Disconnect();
        return StatusCode (500, e);
      }
    }
  }
}