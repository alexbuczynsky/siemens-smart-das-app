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

  [Route ("api/das/status")]
  [ApiController]
  public class DASStatusController : ControllerBase {

    private static readDASStatusClass readDASHelper = new readDASStatusClass ();

    // GET api/das/status
    ///
    [HttpGet]
    public ActionResult<dasStatusStructure> Get () {
      var ip = PLC_COM.config.IP;
      try {
        return readDASHelper.readDASStatus (ip);
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }
  }
}