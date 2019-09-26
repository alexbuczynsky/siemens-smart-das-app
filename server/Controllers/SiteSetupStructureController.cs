using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BreakerConfigAPI.Models;
using BreakerConfigAPI.Services;
using Microsoft.AspNetCore.Mvc;
using smartDASNamespace;

namespace BreakerConfigAPI.Controllers {

  [Route ("api/site-setup-structure")]
  [ApiController]
  public class SiteSetupStructure : ControllerBase {

    // GET api/site-setup-structure
    [HttpGet]
    public ActionResult<siteSetupStructure> Get () {
      var service = new SmartDASService ();
      service.Connect ();
      try {
        var structure = service.getConfigData ();
        service.Disconnect ();
        return structure;
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }

    [HttpPut]
    public ActionResult<siteSetupStructure> Put ([FromBody] siteSetupStructure newSetupStructure) {
      var service = new SmartDASService ();
      try {
        service.Connect ();
        service.setConfigData (newSetupStructure);
        var structure = service.getConfigData ();
        service.Disconnect ();
        return structure;
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }
  }
}