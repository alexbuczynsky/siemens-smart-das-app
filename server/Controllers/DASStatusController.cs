using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


using BreakerConfigAPI.Models;
using Microsoft.AspNetCore.Mvc;
using smartDASNamespace;
using BreakerConfigAPI.Services;

namespace BreakerConfigAPI.Controllers {

  [Route ("api/das/status")]
  [ApiController]
  public class DASStatusController : ControllerBase {

    // GET api/das/status
    ///
    [HttpGet]
    public ActionResult<dasStatusStructure> Get () {
      var service = new SmartDASService();
      try {
        var dasStatus = service.getDASStatus();
        service.Disconnect();
        return dasStatus;
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }
  }
}