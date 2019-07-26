using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BreakerConfigAPI.Models;
using BreakerConfigAPI.Services;
using Microsoft.AspNetCore.Mvc;
using smartDASNamespace;

namespace BreakerConfigAPI.Controllers {

  [Route ("api/plc-config")]
  [ApiController]
  public class PLCConfigurationController : ControllerBase {

    // GET api/plc-config
    [HttpGet]
    public ActionResult<PLCConfiguration> Get () {
      return services.smartDAS.plcConfig;
    }

    [HttpPut]
    public ActionResult<PLCConfiguration> Put ([FromBody] PLCConfiguration newConfig) {
      return services.smartDAS.plcConfig = newConfig;
    }
  }
}