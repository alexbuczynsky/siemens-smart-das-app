using System;
using smartDASNamespace;
using BreakerConfigAPI.Models;

namespace BreakerConfigAPI.Services {

    public class CommManager {
        public getConfigClass getConfig = new getConfigClass();
        public writeConfigClass writeConfig = new writeConfigClass();
        public readDASStatusClass readDAS = new readDASStatusClass();
        public readDASCommandsClass readDASCommands = new readDASCommandsClass();
        public writeDASCommandClass writeDASCommands = new writeDASCommandClass();
        public readPLCIPClass readPLCIP = new readPLCIPClass();
        public writePLCIPClass writePLCIP = new writePLCIPClass();
        public readComAlarmClass readCOMAlarms = new readComAlarmClass();
    }

    
    /// <summary>
    /// SmartDASService Service
    /// </summary>
    public class SmartDASService {
        /// <summary>
        /// If true, the server will not send back error messages, and will instead
        /// just send back default classes and 0 error codes.
        /// </summary>
        public static bool DemoMode = false;

        public class IState
        {
            public PLCConfiguration targetPLCConfig = new PLCConfiguration();
            public siteSetupStructure siteSetup = new siteSetupStructure();
            public class IPLC
            {
                public ipConfigStructure netConfig = new ipConfigStructure();
            }
            public IPLC PLC = new IPLC();
            public class IBreakers
            {
                public comAlarmStatusStructure commAlarms = new comAlarmStatusStructure();
                public dasCommandsStructure dasCommands = new dasCommandsStructure();
                public dasStatusStructure dasStatus = new dasStatusStructure();
            }
            public IBreakers Breakers = new IBreakers();
        }
        public IState State = new IState();

        public CommManager CommHandlers = new CommManager();

        public string IP {
            get
            {
                return State.targetPLCConfig.IP;
            }
        }

        public siteSetupStructure getConfigData()
        {
            try{
                State.siteSetup = CommHandlers.getConfig.readConfigData(this.IP);
            }
            catch(Exception err)
            {
                if(DemoMode == false){
                    throw err;
                }
            }
            
            return State.siteSetup;
        }

        public siteSetupStructure setConfigData(siteSetupStructure newSiteSetup)
        {
            try
            {
                CommHandlers.writeConfig.writeConfig(this.IP, newSiteSetup);
            }
            catch(Exception err)
            {
                if(DemoMode == false)
                {
                    throw err;
                }
            }
            
            State.siteSetup = newSiteSetup;
            return State.siteSetup;
        }

        public dasStatusStructure getDASStatus()
        {
            try
            {
                State.Breakers.dasStatus = CommHandlers.readDAS.readDASStatus(this.IP);
            }
            catch(Exception err)
            {
                if(DemoMode == false)
                {
                    throw err;
                }
            }
            
            return State.Breakers.dasStatus;
        }

        public dasCommandsStructure getDASCommands()
        {
            try
            {
                State.Breakers.dasCommands = CommHandlers.readDASCommands.dasCommands(this.IP);
            }
            catch(Exception err)
            {
                if(DemoMode == false)
                {
                    throw err;
                }
            }
            
            return State.Breakers.dasCommands;
        }

        public dasCommandsStructure setDASCommands(dasCommandsStructure newDASCommands)
        {
            try
            {
                CommHandlers.writeDASCommands.writeDASCommands(this.IP, newDASCommands);
            }
            catch(Exception err)
            {
                if(DemoMode == false)
                {
                    throw err;
                }
            }
            
            State.Breakers.dasCommands = newDASCommands;
            return State.Breakers.dasCommands;
        }

        public ipConfigStructure getPLCNetwork()
        {
            try
            {
                State.PLC.netConfig = CommHandlers.readPLCIP.ipConfig(this.IP);
            }
            catch(Exception err)
            {
                if(DemoMode == false)
                {
                    throw err;
                }
            }
           
            return State.PLC.netConfig;
        }

        public ipConfigStructure setPLCNetwork(ipConfigStructure newNetConfig)
        {
            try
            {
                CommHandlers.writePLCIP.writeipConfigCommand(this.IP, newNetConfig);
                string ip = $"{newNetConfig.newIP1}.{newNetConfig.newIP2}.{newNetConfig.newIP3}.{newNetConfig.newIP4}";
                State.targetPLCConfig.IP = ip;
            }
            catch(Exception err)
            {
                if(DemoMode == false)
                {
                    throw err;
                }
            }
            
            State.PLC.netConfig = newNetConfig;
            return State.PLC.netConfig;
        }

        public comAlarmStatusStructure getCommAlarms()
        {
            try
            {
                State.Breakers.commAlarms = CommHandlers.readCOMAlarms.comAlarms(this.IP);
            }
            catch(Exception err)
            {
                if(DemoMode == false)
                {
                    throw err;
                }
            }
            return State.Breakers.commAlarms;
        }

        public BreakerSetupObject[] getBreakerConfigurations(){
            BreakerSetupObject[] configurations = new BreakerSetupObject[9]{
                new BreakerSetupObject(),
                new BreakerSetupObject(),
                new BreakerSetupObject(),
                new BreakerSetupObject(),
                new BreakerSetupObject(),
                new BreakerSetupObject(),
                new BreakerSetupObject(),
                new BreakerSetupObject(),
                new BreakerSetupObject(),
            };

            this.getConfigData();
            configurations[0].breakerIP1 = State.siteSetup.breaker1IP1;
            configurations[0].breakerIP2 = State.siteSetup.breaker1IP2;
            configurations[0].breakerIP3 = State.siteSetup.breaker1IP3;
            configurations[0].breakerIP4 = State.siteSetup.breaker1IP4;
            configurations[0].breakerSlaveId = State.siteSetup.breaker1SlaveID;
            configurations[0].type = State.siteSetup.breaker1Type;
            configurations[0].associatedOutput = State.siteSetup.breaker1AssociatedOutput;
            configurations[0].associatedInput = State.siteSetup.breaker1AssociatedInput;
            
            configurations[1].breakerIP1 = State.siteSetup.breaker2IP1;
            configurations[1].breakerIP2 = State.siteSetup.breaker2IP2;
            configurations[1].breakerIP3 = State.siteSetup.breaker2IP3;
            configurations[1].breakerIP4 = State.siteSetup.breaker2IP4;
            configurations[1].breakerSlaveId = State.siteSetup.breaker2SlaveID;
            configurations[1].type = State.siteSetup.breaker2Type;
            configurations[1].associatedOutput = State.siteSetup.breaker2AssociatedOutput;
            configurations[1].associatedInput = State.siteSetup.breaker2AssociatedInput;

            configurations[2].breakerIP1 = State.siteSetup.breaker3IP1;
            configurations[2].breakerIP2 = State.siteSetup.breaker3IP2;
            configurations[2].breakerIP3 = State.siteSetup.breaker3IP3;
            configurations[2].breakerIP4 = State.siteSetup.breaker3IP4;
            configurations[2].breakerSlaveId = State.siteSetup.breaker3SlaveID;
            configurations[2].type = State.siteSetup.breaker3Type;
            configurations[2].associatedOutput = State.siteSetup.breaker3AssociatedOutput;
            configurations[2].associatedInput = State.siteSetup.breaker3AssociatedInput;

            configurations[3].breakerIP1 = State.siteSetup.breaker4IP1;
            configurations[3].breakerIP2 = State.siteSetup.breaker4IP2;
            configurations[3].breakerIP3 = State.siteSetup.breaker4IP3;
            configurations[3].breakerIP4 = State.siteSetup.breaker4IP4;
            configurations[3].breakerSlaveId = State.siteSetup.breaker4SlaveID;
            configurations[3].type = State.siteSetup.breaker4Type;
            configurations[3].associatedOutput = State.siteSetup.breaker4AssociatedOutput;
            configurations[3].associatedInput = State.siteSetup.breaker4AssociatedInput;

            configurations[4].breakerIP1 = State.siteSetup.breaker5IP1;
            configurations[4].breakerIP2 = State.siteSetup.breaker5IP2;
            configurations[4].breakerIP3 = State.siteSetup.breaker5IP3;
            configurations[4].breakerIP4 = State.siteSetup.breaker5IP4;
            configurations[4].breakerSlaveId = State.siteSetup.breaker5SlaveID;
            configurations[4].type = State.siteSetup.breaker5Type;
            configurations[4].associatedOutput = State.siteSetup.breaker5AssociatedOutput;
            configurations[4].associatedInput = State.siteSetup.breaker5AssociatedInput;
            
            configurations[5].breakerIP1 = State.siteSetup.breaker6IP1;
            configurations[5].breakerIP2 = State.siteSetup.breaker6IP2;
            configurations[5].breakerIP3 = State.siteSetup.breaker6IP3;
            configurations[5].breakerIP4 = State.siteSetup.breaker6IP4;
            configurations[5].breakerSlaveId = State.siteSetup.breaker6SlaveID;
            configurations[5].type = State.siteSetup.breaker6Type;
            configurations[5].associatedOutput = State.siteSetup.breaker6AssociatedOutput;
            configurations[5].associatedInput = State.siteSetup.breaker6AssociatedInput;

            configurations[6].breakerIP1 = State.siteSetup.breaker7IP1;
            configurations[6].breakerIP2 = State.siteSetup.breaker7IP2;
            configurations[6].breakerIP3 = State.siteSetup.breaker7IP3;
            configurations[6].breakerIP4 = State.siteSetup.breaker7IP4;
            configurations[6].breakerSlaveId = State.siteSetup.breaker7SlaveID;
            configurations[6].type = State.siteSetup.breaker7Type;
            configurations[6].associatedOutput = State.siteSetup.breaker7AssociatedOutput;
            configurations[6].associatedInput = State.siteSetup.breaker7AssociatedInput;

            configurations[7].breakerIP1 = State.siteSetup.breaker8IP1;
            configurations[7].breakerIP2 = State.siteSetup.breaker8IP2;
            configurations[7].breakerIP3 = State.siteSetup.breaker8IP3;
            configurations[7].breakerIP4 = State.siteSetup.breaker8IP4;
            configurations[7].breakerSlaveId = State.siteSetup.breaker8SlaveID;
            configurations[7].type = State.siteSetup.breaker8Type;
            configurations[7].associatedOutput = State.siteSetup.breaker8AssociatedOutput;
            configurations[7].associatedInput = State.siteSetup.breaker8AssociatedInput;
            
            configurations[8].breakerIP1 = State.siteSetup.breaker9IP1;
            configurations[8].breakerIP2 = State.siteSetup.breaker9IP2;
            configurations[8].breakerIP3 = State.siteSetup.breaker9IP3;
            configurations[8].breakerIP4 = State.siteSetup.breaker9IP4;
            configurations[8].breakerSlaveId = State.siteSetup.breaker9SlaveID;
            configurations[8].type = State.siteSetup.breaker9Type;
            configurations[8].associatedOutput = State.siteSetup.breaker9AssociatedOutput;
            configurations[8].associatedInput = State.siteSetup.breaker9AssociatedInput;

            return configurations;
        }

        public BreakerSetupObject[] setBreakerConfigurations(BreakerSetupObject[] configurations){
            var newSiteSetup = new siteSetupStructure()
            {
                breaker1IP1 = configurations[0].breakerIP1,
                breaker1IP2 = configurations[0].breakerIP2,
                breaker1IP3 = configurations[0].breakerIP3,
                breaker1IP4 = configurations[0].breakerIP4,
                breaker1SlaveID = configurations[0].breakerSlaveId,
                breaker1Type = configurations[0].type,
                breaker1AssociatedOutput = configurations[0].associatedOutput,
                breaker1AssociatedInput = configurations[0].associatedInput,
                
                breaker2IP1 = configurations[1].breakerIP1,
                breaker2IP2 = configurations[1].breakerIP2,
                breaker2IP3 = configurations[1].breakerIP3,
                breaker2IP4 = configurations[1].breakerIP4,
                breaker2SlaveID = configurations[1].breakerSlaveId,
                breaker2Type = configurations[1].type,
                breaker2AssociatedOutput = configurations[1].associatedOutput,
                breaker2AssociatedInput = configurations[1].associatedInput,

                breaker3IP1 = configurations[2].breakerIP1,
                breaker3IP2 = configurations[2].breakerIP2,
                breaker3IP3 = configurations[2].breakerIP3,
                breaker3IP4 = configurations[2].breakerIP4,
                breaker3SlaveID = configurations[2].breakerSlaveId,
                breaker3Type = configurations[2].type,
                breaker3AssociatedOutput = configurations[2].associatedOutput,
                breaker3AssociatedInput = configurations[2].associatedInput,

                breaker4IP1 = configurations[3].breakerIP1,
                breaker4IP2 = configurations[3].breakerIP2,
                breaker4IP3 = configurations[3].breakerIP3,
                breaker4IP4 = configurations[3].breakerIP4,
                breaker4SlaveID = configurations[3].breakerSlaveId,
                breaker4Type = configurations[3].type,
                breaker4AssociatedOutput = configurations[3].associatedOutput,
                breaker4AssociatedInput = configurations[3].associatedInput,

                breaker5IP1 = configurations[4].breakerIP1,
                breaker5IP2 = configurations[4].breakerIP2,
                breaker5IP3 = configurations[4].breakerIP3,
                breaker5IP4 = configurations[4].breakerIP4,
                breaker5SlaveID = configurations[4].breakerSlaveId,
                breaker5Type = configurations[4].type,
                breaker5AssociatedOutput = configurations[4].associatedOutput,
                breaker5AssociatedInput = configurations[4].associatedInput,
                
                breaker6IP1 = configurations[5].breakerIP1,
                breaker6IP2 = configurations[5].breakerIP2,
                breaker6IP3 = configurations[5].breakerIP3,
                breaker6IP4 = configurations[5].breakerIP4,
                breaker6SlaveID = configurations[5].breakerSlaveId,
                breaker6Type = configurations[5].type,
                breaker6AssociatedOutput = configurations[5].associatedOutput,
                breaker6AssociatedInput = configurations[5].associatedInput,

                breaker7IP1 = configurations[6].breakerIP1,
                breaker7IP2 = configurations[6].breakerIP2,
                breaker7IP3 = configurations[6].breakerIP3,
                breaker7IP4 = configurations[6].breakerIP4,
                breaker7SlaveID = configurations[6].breakerSlaveId,
                breaker7Type = configurations[6].type,
                breaker7AssociatedOutput = configurations[6].associatedOutput,
                breaker7AssociatedInput = configurations[6].associatedInput,

                breaker8IP1 = configurations[7].breakerIP1,
                breaker8IP2 = configurations[7].breakerIP2,
                breaker8IP3 = configurations[7].breakerIP3,
                breaker8IP4 = configurations[7].breakerIP4,
                breaker8SlaveID = configurations[7].breakerSlaveId,
                breaker8Type = configurations[7].type,
                breaker8AssociatedOutput = configurations[7].associatedOutput,
                breaker8AssociatedInput = configurations[7].associatedInput,
                
                breaker9IP1 = configurations[8].breakerIP1,
                breaker9IP2 = configurations[8].breakerIP2,
                breaker9IP3 = configurations[8].breakerIP3,
                breaker9IP4 = configurations[8].breakerIP4,
                breaker9SlaveID = configurations[8].breakerSlaveId,
                breaker9Type = configurations[8].type,
                breaker9AssociatedOutput = configurations[8].associatedOutput,
                breaker9AssociatedInput = configurations[8].associatedInput,

                switchType = State.siteSetup.switchType,
            };

            this.setConfigData(newSiteSetup);

            State.siteSetup = newSiteSetup;

            return configurations;
        }




    }
}