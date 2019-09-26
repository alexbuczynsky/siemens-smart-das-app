using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


using BreakerConfigAPI.Models;
using Microsoft.AspNetCore.Mvc;
using smartDASNamespace;
using BreakerConfigAPI.Services;

namespace BreakerConfigAPI.Controllers {

  [Route ("api/breaker-alarms")]
  [ApiController]
  public class BreakerAlarmsController : ControllerBase {

    // GET api/breaker-alarms
    [HttpGet]
    public ActionResult<comAlarmStatusStructure> Get () {
      var service = new SmartDASService ();
      service.Connect();
      try {
        var commAlarms = service.getCommAlarms();
        service.Disconnect();
        return commAlarms;
      } catch (Exception e) {
        service.Disconnect();
        return StatusCode (500, e);
      }
    }
  }
}