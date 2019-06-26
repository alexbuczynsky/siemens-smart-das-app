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

    public static getConfigClass readConfig = new getConfigClass ();
    public static writeConfigClass saveConfig = new writeConfigClass ();

    // GET api/site-setup-structure
    [HttpGet]
    public ActionResult<siteSetupStructure> Get () {

      var ip = PLC_COM.config.IP;
      try {
        var structure = readConfig.readConfigData (ip);
        return structure;
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }

    [HttpPut]
    public ActionResult<siteSetupStructure> Put ([FromBody] siteSetupStructure newSetupStructure) {
      var ip = PLC_COM.config.IP;
      saveConfig.writeConfig (ip, newSetupStructure);

      try {
        var structure = readConfig.readConfigData (ip);
        return structure;
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }
  }
}