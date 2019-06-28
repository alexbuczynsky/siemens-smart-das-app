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
      try {
        return services.smartDAS.getCommAlarms();
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }
  }
}