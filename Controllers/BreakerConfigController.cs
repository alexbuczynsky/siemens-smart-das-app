using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BreakerConfig.Models;
using configDataNamespace;
using PLCConfig.models;

namespace BreakerConfigAPI.Controllers
{
    public class DB {
        public static BreakerConfigManager breakerConfigManager = new BreakerConfigManager();
    }

    public class PLC_COM {
        public static PLCConfiguration config = new PLCConfiguration();
        public static getConfigClass readConfig = new getConfigClass();
        public static writeConfigClass saveConfig = new writeConfigClass();

        public static siteSetupStructure readConfigData(){
            var ipAddress = PLC_COM.config.IP;

            var newStructure = PLC_COM.readConfig.readConfigData(ipAddress);
            DB.breakerConfigManager.setSetupStructure(newStructure);
            return DB.breakerConfigManager.getSetupStructure();
        }

        public static siteSetupStructure saveConfigData(siteSetupStructure newStructure){
            var ipAddress = PLC_COM.config.IP;
            Console.WriteLine($"IP ADDRESS: {ipAddress}");
            Console.WriteLine($"New Structure: {newStructure.breaker3IP1}");
            // PLC_COM.saveConfig.writeConfig(ipAddress, newStructure);
            PLC_COM.saveConfig.writeConfig(ipAddress, new siteSetupStructure());

            DB.breakerConfigManager.setSetupStructure(newStructure);

            return DB.breakerConfigManager.getSetupStructure();
        }
    }

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
            if(id >= 0 && id < breakerConfigManager.configurations.Length){
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
