using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BreakerConfigAPI.Communications.PLC;
using BreakerConfigAPI.Database;
using BreakerConfigAPI.Models;
using Microsoft.AspNetCore.Mvc;
using smartDASNamespace;
using Profinet_Master;

namespace BreakerConfigAPI.Controllers {

  [Route ("api/plc/test-connection")]
  [ApiController]
  public class TestPLCConnectionController : ControllerBase {

    public class ConnectionStatus {
      public int code;
      public string message;
    }

    // GET api/plc/test-connection
    [HttpGet]
    public ActionResult<ConnectionStatus> Get () {
      var ip = PLC_COM.config.IP;      

      try {
        S7Client client = new S7Client();

        int result = client.ConnectTo(ip, 0, 1);

        if(PLC_COM.DemoMode){
          return new ConnectionStatus(){
            code = 0,
            message = "OK",
          };
        }

        return new ConnectionStatus(){
          code = result,
          message = client.ErrorText(result),
        };
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }
  }
}