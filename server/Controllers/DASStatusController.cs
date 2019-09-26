using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BreakerConfigAPI.Models;
using BreakerConfigAPI.Services;
using Microsoft.AspNetCore.Mvc;
using smartDASNamespace;

namespace BreakerConfigAPI.Controllers {

  [Route ("api/das/status")]
  [ApiController]
  public class DASStatusController : ControllerBase {

    // GET api/das/status
    ///
    [HttpGet]
    public ActionResult<dasStatusStructure> Get () {
      var service = new SmartDASService ();
      service.Connect();
      try {
        var dasStatus = service.getDASStatus ();
        service.Disconnect ();
        return dasStatus;
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }
  }
}