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

  [Route ("api/site-setup-structure")]
  [ApiController]
  public class SiteSetupStructure : ControllerBase {

    // GET api/site-setup-structure
    [HttpGet]
    public ActionResult<siteSetupStructure> Get () {
      try {
        var structure = services.smartDAS.getConfigData();
        return structure;
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }

    [HttpPut]
    public ActionResult<siteSetupStructure> Put ([FromBody] siteSetupStructure newSetupStructure) {
      try {
        services.smartDAS.setConfigData(newSetupStructure);
        var structure = services.smartDAS.getConfigData();
        return structure;
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }
  }
}