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

  [Route ("api/breaker-alarms")]
  [ApiController]
  public class BreakerAlarmsController : ControllerBase {
    private static readComAlarmClass readHelper = new readComAlarmClass ();

    // GET api/breaker-alarms
    [HttpGet]
    public ActionResult<comAlarmStatusStructure> Get () {
      var ip = PLC_COM.config.IP;
      try {
        return readHelper.comAlarms (ip);
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }
  }
}