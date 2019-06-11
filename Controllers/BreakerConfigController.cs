using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BreakerConfig.Models;

namespace BreakerConfigAPI.Controllers
{
    [Route("api/breaker-config")]
    [ApiController]
    public class BreakerConfigController : ControllerBase
    {
        private static BreakerConfigManager breakerConfigManager = new BreakerConfigManager();

        // GET api/breaker-config
        [HttpGet]
        public ActionResult<BreakerSetupObject[]> Get()
        {
            return breakerConfigManager.configurations;
        }

        // GET api/breaker-config/5
        [HttpGet("{id}")]
        public ActionResult<BreakerSetupObject> Get(int id)
        {
            id = id -1;

            BreakerSetupObject foundConfig;
            if(id > 0 && id < breakerConfigManager.configurations.Length){
                return breakerConfigManager.configurations[id];
            }else{
                return NotFound();
            }
            
        }

        // PUT api/breaker-config/5
        [HttpPut("{id}")]
        public ActionResult<BreakerSetupObject> Put(int id, [FromBody] BreakerSetupObject newConfiguration)
        {
            id = id - 1;
            if(id >= 0 && id < breakerConfigManager.configurations.Length){
                return breakerConfigManager.configurations[id] = newConfiguration;
            }else{
                return NotFound();
            }
        }
    }
}
