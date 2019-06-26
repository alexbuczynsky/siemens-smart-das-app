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
      public int attempts;
    }

    private int checkConnection(){
      var ip = PLC_COM.config.IP;

      return constants.checkConnection(ip);
    }

    private ConnectionStatus getConnectionStatus (int numberOfAttempts = 0) {

      S7Client client = constants.Client;
      

      int result = checkConnection();
      numberOfAttempts++;

      return new ConnectionStatus(){
        code = result,
        message = client.ErrorText(result),
        attempts = numberOfAttempts
      };

    }

    // GET api/plc/test-connection
    [HttpGet]
    public ActionResult<ConnectionStatus> Get () {

      if(PLC_COM.DemoMode){
        return new ConnectionStatus(){
          code = 0,
          message = "OK",
          attempts = 0,
        };
      }

      return getConnectionStatus();
    }
  }
}