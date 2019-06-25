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

    public static int MaxRetries = 10;

    public class ConnectionStatus {
      public int code;
      public string message;
      public int attempts;
    }

    private ConnectionStatus getConnectionStatus (int numberOfAttempts = 0) {
      var ip = PLC_COM.config.IP;

      S7Client client = new S7Client();

      int result = 0;

      try{
        result = client.ConnectTo(ip, 0, 1);
        if(result != 0){
          throw new Exception($"Connection Failed with Error Code {result}");
        }
      }catch( Exception e){
        numberOfAttempts += 1;
        if(numberOfAttempts < MaxRetries){
          return getConnectionStatus(numberOfAttempts);
        }
      }

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