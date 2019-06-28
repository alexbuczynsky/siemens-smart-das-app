using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


using BreakerConfigAPI.Models;
using Microsoft.AspNetCore.Mvc;
using smartDASNamespace;
using BreakerConfigAPI.Services;

namespace BreakerConfigAPI.Controllers {

  [Route ("api/plc-config")]
  [ApiController]
  public class PLCConfigurationController : ControllerBase {

    // GET api/plc-config
    [HttpGet]
    public ActionResult<PLCConfiguration> Get () {
      return services.smartDAS.State.targetPLCConfig;
    }

    [HttpPut]
    public ActionResult<PLCConfiguration> Put ([FromBody] PLCConfiguration newConfig) {
      return services.smartDAS.State.targetPLCConfig = newConfig;
    }
  }
}