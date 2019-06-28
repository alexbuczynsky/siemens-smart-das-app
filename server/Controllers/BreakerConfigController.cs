using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using BreakerConfigAPI.Models;
using Microsoft.AspNetCore.Mvc;
using smartDASNamespace;
using BreakerConfigAPI.Services;

namespace BreakerConfigAPI.Controllers {

    [Route ("api/breaker-config")]
    [ApiController]
    public class BreakerConfigController : ControllerBase {

        // GET api/breaker-config
        [HttpGet]
        public ActionResult<BreakerSetupObject[]> Get () {
            try {
                return services.smartDAS.getBreakerConfigurations();
            } catch (Exception e) {
                return StatusCode (500, e);
            }

        }

        // GET api/breaker-config/5
        [HttpGet ("{id}")]
        public ActionResult<BreakerSetupObject> Get (int id) {
            id = id - 1;

            if (id >= 0 && id < 9) {
                try {
                    var breakers = services.smartDAS.getBreakerConfigurations();
                    return breakers[id];
                } catch (Exception e) {
                    return StatusCode (500, e);
                }
            } else {
                return NotFound ();
            }

        }

        // PUT api/breaker-config/5
        [HttpPut ("{id}")]
        public ActionResult<BreakerSetupObject> Put (int id, [FromBody] BreakerSetupObject newConfiguration) {
            id = id - 1;
            try {
                if (id >= 0 && id < 9) {
                    var breakers = services.smartDAS.getBreakerConfigurations();

                    breakers[id] = newConfiguration;

                    breakers = services.smartDAS.setBreakerConfigurations(breakers);

                    return breakers[id];
                } else {
                    return NotFound ();
                }
            } catch (Exception e) {
                return StatusCode (500, e);
            }
            
        }

    }
}