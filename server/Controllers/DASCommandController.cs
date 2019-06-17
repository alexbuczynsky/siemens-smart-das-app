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

  [Route ("api/das/commands")]
  [ApiController]
  public class DASCommandController : ControllerBase {

    private static readDASCommandsClass readHelper = new readDASCommandsClass ();
    private static writeDASCommandClass writeHelper = new writeDASCommandClass ();

    // GET api/das/commands
    [HttpGet]
    public ActionResult<dasCommandsStructure> Get () {
      var ip = PLC_COM.config.IP;
      try {
        return readHelper.dasCommands (ip);
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }

    [HttpPut]
    public ActionResult<dasCommandsStructure> Put ([FromBody] dasCommandsStructure newConfig) {
      var ip = PLC_COM.config.IP;

      try {
        writeHelper.writeDASCommands (ip, newConfig);
        return readHelper.dasCommands (ip);
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }
  }
}