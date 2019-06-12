using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BreakerConfig.Models;
using smartDASNamespace;
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

        public static bool byPassErrors = false;

        public static siteSetupStructure readConfigData(){
            var ipAddress = PLC_COM.config.IP;

            siteSetupStructure newStructure;
            try {
                newStructure = PLC_COM.readConfig.readConfigData(ipAddress);
                DB.breakerConfigManager.setSetupStructure(newStructure);
            }catch(Exception e){
                if(PLC_COM.byPassErrors == false){
                    throw e;
                }
            }
            
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

    [Route("api/plc-config")]
    [ApiController]
    public class PLCConfigurationController : ControllerBase
    {
        

        // GET api/plc-config
        [HttpGet]
        public ActionResult<PLCConfiguration> Get()
        {
            if(PLC_COM.config.IP == null){
                PLC_COM.config.IP = "192.168.1.3";
            }
            return PLC_COM.config;
        }

        [HttpPut]
        public ActionResult<PLCConfiguration> Put([FromBody] PLCConfiguration newConfig)
        {
            return PLC_COM.config = newConfig;
        }
    }

    [Route("api/site-setup-structure")]
    [ApiController]
    public class SiteSetupStructure : ControllerBase
    {
        

        // GET api/site-setup-structure
        [HttpGet]
        public ActionResult<siteSetupStructure> Get()
        {
            // return DB.breakerConfigManager.mapToSetupStructure();
            try{
                PLC_COM.readConfigData();
            }catch(Exception e){
                return StatusCode(500, e);
            }
            return DB.breakerConfigManager.getSetupStructure();
        }

        [HttpPut]
        public ActionResult<siteSetupStructure> Put([FromBody] siteSetupStructure newSetupStructure)
        {
            return PLC_COM.saveConfigData(newSetupStructure);
        }
    }

    [Route("api/breaker-config")]
    [ApiController]
    public class BreakerConfigController : ControllerBase
    {
        

        // GET api/breaker-config
        [HttpGet]
        public ActionResult<BreakerSetupObject[]> Get()
        {
            try{
                PLC_COM.readConfigData();
            }catch(Exception e){
                return StatusCode(500, e);
            }
            return DB.breakerConfigManager.configurations;
            
        }

        // GET api/breaker-config/5
        [HttpGet("{id}")]
        public ActionResult<BreakerSetupObject> Get(int id)
        {
            id = id -1;

            BreakerSetupObject foundConfig;
            if(id >= 0 && id < DB.breakerConfigManager.configurations.Length){
                try{
                    PLC_COM.readConfigData();
                }catch(Exception e){
                    return StatusCode(500, e);
                }
                return DB.breakerConfigManager.configurations[id];
            }else{
                return NotFound();
            }
            
        }

        // PUT api/breaker-config/5
        [HttpPut("{id}")]
        public ActionResult<BreakerSetupObject> Put(int id, [FromBody] BreakerSetupObject newConfiguration)
        {
            id = id - 1;
            if(id >= 0 && id < DB.breakerConfigManager.configurations.Length){
                PLC_COM.readConfigData();

                DB.breakerConfigManager.configurations[id] = newConfiguration;

                PLC_COM.saveConfigData(DB.breakerConfigManager.getSetupStructure());
                
                return DB.breakerConfigManager.configurations[id];
            }else{
                return NotFound();
            }
        }

    }
}
