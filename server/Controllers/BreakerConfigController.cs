using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BreakerConfigAPI.Models;
using BreakerConfigAPI.Services;
using Microsoft.AspNetCore.Mvc;
using smartDASNamespace;

namespace BreakerConfigAPI.Controllers {

    [Route ("api/breaker-config")]
    [ApiController]
    public class BreakerConfigController : ControllerBase {

        // GET api/breaker-config
        [HttpGet]
        public ActionResult<BreakerSetupObject[]> Get () {
            var service = new SmartDASService ();
            service.Connect ();
            try {

                var breakerConfig = service.getBreakerConfigurations ();
                service.Disconnect ();
                return breakerConfig;
            } catch (Exception e) {
                service.Disconnect ();
                return StatusCode (500, e);
            }

        }

        // GET api/breaker-config/5
        [HttpGet ("{id}")]
        public ActionResult<BreakerSetupObject> Get (int id) {
            id = id - 1;

            SmartDASService service;

            try {
                service = new SmartDASService ();
                service.Connect ();
            } catch (Exception e) {
                return StatusCode (500, e);
            }

            if (id >= 0 && id < 9) {
                try {
                    var breakers = service.getBreakerConfigurations ();
                    service.Disconnect ();
                    return breakers[id];
                } catch (Exception e) {
                    service.Disconnect ();
                    return StatusCode (500, e);
                }
            } else {
                service.Disconnect ();
                return NotFound ();
            }

        }

        // PUT api/breaker-config/5
        [HttpPut ("{id}")]
        public ActionResult<BreakerSetupObject> Put (int id, [FromBody] BreakerSetupObject newConfiguration) {
            id = id - 1;

            SmartDASService service;

            try {
                service = new SmartDASService ();
                service.Connect ();
            } catch (Exception e) {
                return StatusCode (500, e);
            }

            try {
                if (id >= 0 && id < 9) {
                    var breakers = service.getBreakerConfigurations ();

                    breakers[id] = newConfiguration;

                    breakers = service.setBreakerConfigurations (breakers);
                    service.Disconnect ();
                    return breakers[id];
                } else {
                    service.Disconnect ();
                    return NotFound ();
                }
            } catch (Exception e) {
                service.Disconnect ();
                return StatusCode (500, e);
            }

        }

    }
}