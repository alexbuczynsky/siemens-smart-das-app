using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BreakerConfigAPI.Communications.PLC;
using BreakerConfigAPI.Database;
using BreakerConfigAPI.Models;
using Microsoft.AspNetCore.Mvc;
using smartDASNamespace;

namespace BreakerConfigAPI.Controllers {

  [Route ("api/site-setup-structure")]
  [ApiController]
  public class SiteSetupStructure : ControllerBase {

    // GET api/site-setup-structure
    [HttpGet]
    public ActionResult<siteSetupStructure> Get () {
      // return DB.breakerConfigManager.mapToSetupStructure();
      try {
        PLC_COM.readConfigData ();
      } catch (Exception e) {
        return StatusCode (500, e);
      }
      return DB.breakerConfigManager.getSetupStructure ();
    }

    [HttpPut]
    public ActionResult<siteSetupStructure> Put ([FromBody] siteSetupStructure newSetupStructure) {
      return PLC_COM.saveConfigData (newSetupStructure);
    }
  }
}