using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BreakerConfigAPI.Models;
using BreakerConfigAPI.Services;
using Microsoft.AspNetCore.Mvc;
using smartDASNamespace;

namespace BreakerConfigAPI.Controllers {

  [Route ("api/das/commands")]
  [ApiController]
  public class DASCommandController : ControllerBase {

    // GET api/das/commands
    [HttpGet]
    public ActionResult<dasCommandsStructure> Get () {
      SmartDASService service;

      try {
        service = new SmartDASService ();
        service.Connect ();
      } catch (Exception e) {
        return StatusCode (500, e);
      }

      var dasCommands = new dasCommandsStructure ();

      try {
        dasCommands = service.getDASCommands ();
      } catch (Exception e) {
        return StatusCode (500, e);
      }

      service.Disconnect ();
      return dasCommands;
    }

    [HttpPut]
    public ActionResult<dasCommandsStructure> Put ([FromBody] dasCommandsStructure newConfig) {
      SmartDASService service;

      try {
        service = new SmartDASService ();
        service.Connect ();
      } catch (Exception e) {
        return StatusCode (500, e);
      }

      try {
        service.setDASCommands (newConfig);
      } catch (Exception e) {
        service.Disconnect ();
        return StatusCode (500, e);
      }

      try {
        service.setDASCommands (newConfig);
        var dasCommands = service.getDASCommands ();
        service.Disconnect ();
        return dasCommands;
      } catch (Exception e) {
        service.Disconnect ();
        return StatusCode (500, e);
      }

    }
  }
}