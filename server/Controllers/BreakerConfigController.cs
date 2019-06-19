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

    [Route ("api/breaker-config")]
    [ApiController]
    public class BreakerConfigController : ControllerBase {

        // GET api/breaker-config
        [HttpGet]
        public ActionResult<BreakerSetupObject[]> Get () {
            try {
                PLC_COM.readConfigData ();
            } catch (Exception e) {
                return StatusCode (500, e);
            }
            return DB.breakerConfigManager.configurations;

        }

        // GET api/breaker-config/5
        [HttpGet ("{id}")]
        public ActionResult<BreakerSetupObject> Get (int id) {
            id = id - 1;

            if (id >= 0 && id < DB.breakerConfigManager.configurations.Length) {
                try {
                    PLC_COM.readConfigData ();
                } catch (Exception e) {
                    return StatusCode (500, e);
                }
                return DB.breakerConfigManager.configurations[id];
            } else {
                return NotFound ();
            }

        }

        // PUT api/breaker-config/5
        [HttpPut ("{id}")]
        public ActionResult<BreakerSetupObject> Put (int id, [FromBody] BreakerSetupObject newConfiguration) {
            id = id - 1;
            try {
                if (id >= 0 && id < DB.breakerConfigManager.configurations.Length) {
                    PLC_COM.readConfigData ();

                    DB.breakerConfigManager.configurations[id] = newConfiguration;

                    PLC_COM.saveConfigData (DB.breakerConfigManager.getSetupStructure ());

                    return DB.breakerConfigManager.configurations[id];
                } else {
                    return NotFound ();
                }
            } catch (Exception e) {
                return StatusCode (500, e);
            }
            
        }

    }
}