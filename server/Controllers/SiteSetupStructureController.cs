using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


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
      var service = new SmartDASService();
      try {
        var structure = service.getConfigData();
        service.Disconnect();
        return structure;
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }

    [HttpPut]
    public ActionResult<siteSetupStructure> Put ([FromBody] siteSetupStructure newSetupStructure) {
      var service = new SmartDASService();
      try {
        service.setConfigData(newSetupStructure);
        var structure = service.getConfigData();
        service.Disconnect();
        return structure;
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }
  }
}