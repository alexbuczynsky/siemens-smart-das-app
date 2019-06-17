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

  [Route ("api/plc/network-configuration")]
  [ApiController]
  public class UpdatePLCIPController : ControllerBase {

    // TODO: add readHelper after @matthew.villavaso updates the PLC comm library
    // private static readDASCommandsClass readHelper = new readDASCommandsClass ();
    private static writePLCIPClass writeHelper = new writePLCIPClass ();

    // // GET api/plc/ip
    // [HttpGet]
    // public ActionResult<ipConfigStructure> Get () {
    //   var ip = PLC_COM.config.IP;
    //   try {
    //     return readHelper.dasCommands (ip);
    //   } catch (Exception e) {
    //     return StatusCode (500, e);
    //   }
    // }

    [HttpPut]
    public ActionResult<ipConfigStructure> Put ([FromBody] ipConfigStructure newConfig) {
      var ip = PLC_COM.config.IP;

      try {
        writeHelper.writeipConfigCommand (ip, newConfig);
        PLC_COM.config.IP = $"{newConfig.newIP1}.{newConfig.newIP2}.{newConfig.newIP3}.{newConfig.newIP4}";
        //TODO: return the read from the config from the PLC after @matthew.villabaso updates the plc comm csharp library
        return newConfig;
      } catch (Exception e) {
        return StatusCode (500, e);
      }
    }
  }
}