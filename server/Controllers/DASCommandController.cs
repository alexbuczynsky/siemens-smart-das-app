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

  [Route ("api/das/commands")]
  [ApiController]
  public class DASCommandController : ControllerBase {

    private static readDASCommandsClass readHelper = new readDASCommandsClass ();
    private static writeDASCommandClass writeHelper = new writeDASCommandClass ();

    // GET api/das/commands
    [HttpGet]
    public ActionResult<dasCommandsStructure> Get () {
      try {
        return services.smartDAS.getDASCommands();
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }

    [HttpPut]
    public ActionResult<dasCommandsStructure> Put ([FromBody] dasCommandsStructure newConfig) {

      try {
        services.smartDAS.setDASCommands(newConfig);
        return services.smartDAS.getDASCommands();
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }
  }
}