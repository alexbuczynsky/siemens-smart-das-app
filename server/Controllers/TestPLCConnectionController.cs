using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BreakerConfigAPI.Models;
using BreakerConfigAPI.Services;
using Microsoft.AspNetCore.Mvc;
using smartDASNamespace;

namespace BreakerConfigAPI.Controllers {

  [Route ("api/plc/test-connection")]
  [ApiController]
  public class TestPLCConnectionController : ControllerBase {

    // GET api/plc/test-connection
    [HttpGet]
    public ActionResult<ConnectionStatus> Get () {

      var service = new SmartDASService ();
      service.Connect ();

      if (SmartDASService.DemoMode == true) {
        return new ConnectionStatus () {
        code = 0,
        message = "OK",
        attempts = 0,
        };
      }

      var connectionStatus = service.getConnectionStatus ();
      service.Disconnect ();

      return connectionStatus;
    }
  }
}