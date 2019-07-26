using System;
using BreakerConfigAPI.Models;
using smartDASNamespace;

namespace BreakerConfigAPI.Services {

    public class SmartDASServiceState {
        public siteSetupStructure siteSetup = new siteSetupStructure ();
        public dasStatusStructure dasStatus = new dasStatusStructure ();
        public dasCommandsStructure dasCommands = new dasCommandsStructure ();
        public plcNetworkConfig netConfig = new plcNetworkConfig ();
        public comAlarmStatusStructure comAlarms = new comAlarmStatusStructure ();
    }

    public class ConnectionStatus {
        public int code;
        public string message;
        public int attempts;
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

        private SmartDASServiceState State = new SmartDASServiceState ();

        public SmartDASClient Client = new SmartDASClient ();

        public PLCConfiguration plcConfig = new PLCConfiguration ();

        public string IP {
            get {
                return plcConfig.IP;
            }

            set {
                plcConfig.IP = value;
            }
        }

        public int maxRetries {
            get {
                return Client.maxRetries;
            }

            set {
                Client.maxRetries = value;
            }
        }

        public int Disconnect () {
            return Client.Disconnect ();
        }

        public SmartDASService () {
            Connect();
        }

        public int Connect () {
            return Client.ConnectTo (IP);
        }

        public ConnectionStatus getConnectionStatus (int numberOfAttempts = 0) {

            int result = 0;
            if (!Client.Connected) {
                result = Client.ConnectTo (IP);
            }

            numberOfAttempts++;

            return new ConnectionStatus () {
                code = result,
                    message = Client.ErrorText (result),
                    attempts = numberOfAttempts
            };

        }

        public siteSetupStructure getConfigData () {
            try {
                State.siteSetup = Client.ReadSiteSetup ();
            } catch (Exception err) {
                if (DemoMode == false) {
                    throw err;
                }
            }

            return State.siteSetup;
        }

        public siteSetupStructure setConfigData (siteSetupStructure newSiteSetup) {
            try {
                Client.WriteSiteSetup (newSiteSetup);
            } catch (Exception err) {
                if (DemoMode == false) {
                    throw err;
                }
            }

            State.siteSetup = newSiteSetup;
            return State.siteSetup;
        }

        public dasStatusStructure getDASStatus () {
            try {
                State.dasStatus = Client.ReadDASStatus ();
            } catch (Exception err) {
                if (DemoMode == false) {
                    throw err;
                }
            }

            return State.dasStatus;
        }

        public dasCommandsStructure getDASCommands () {
            try {
                State.dasCommands = Client.ReadDASCommands ();
            } catch (Exception err) {
                if (DemoMode == false) {
                    throw err;
                }
            }

            return State.dasCommands;
        }

        public dasCommandsStructure setDASCommands (dasCommandsStructure newDASCommands) {
            try {
                Client.WriteDASCommands (newDASCommands);
            } catch (Exception err) {
                if (DemoMode == false) {
                    throw err;
                }
            }

            State.dasCommands = newDASCommands;

            return State.dasCommands;
        }

        public plcNetworkConfig getPLCNetwork () {
            try {
                State.netConfig = Client.ReadPLCNetworkConfiguration ();
            } catch (Exception err) {
                if (DemoMode == false) {
                    throw err;
                }
            }

            return State.netConfig;
        }

        public plcNetworkConfig setPLCNetwork (plcNetworkConfig newNetConfig) {
            try {
                Client.WritePLCNetworkConfiguration (newNetConfig);
                IP = $"{newNetConfig.newIP1}.{newNetConfig.newIP2}.{newNetConfig.newIP3}.{newNetConfig.newIP4}";
            } catch (Exception err) {
                if (DemoMode == false) {
                    throw err;
                }
            }

            State.netConfig = newNetConfig;

            return State.netConfig;
        }

        public comAlarmStatusStructure getCommAlarms () {
            try {
                State.comAlarms = Client.ReadComAlarmsStatus ();
            } catch (Exception err) {
                if (DemoMode == false) {
                    throw err;
                }
            }
            return State.comAlarms;
        }

        public BreakerSetupObject[] getBreakerConfigurations () {
            BreakerSetupObject[] configurations = new BreakerSetupObject[9] {
                new BreakerSetupObject (),
                new BreakerSetupObject (),
                new BreakerSetupObject (),
                new BreakerSetupObject (),
                new BreakerSetupObject (),
                new BreakerSetupObject (),
                new BreakerSetupObject (),
                new BreakerSetupObject (),
                new BreakerSetupObject (),
            };

            siteSetupStructure siteSetup = this.getConfigData ();
            configurations[0].breakerIP1 = siteSetup.breaker1IP1;
            configurations[0].breakerIP2 = siteSetup.breaker1IP2;
            configurations[0].breakerIP3 = siteSetup.breaker1IP3;
            configurations[0].breakerIP4 = siteSetup.breaker1IP4;
            configurations[0].breakerSlaveId = siteSetup.breaker1SlaveID;
            configurations[0].type = siteSetup.breaker1Type;
            configurations[0].associatedOutput = siteSetup.breaker1AssociatedOutput;
            configurations[0].associatedInput = siteSetup.breaker1AssociatedInput;

            configurations[1].breakerIP1 = siteSetup.breaker2IP1;
            configurations[1].breakerIP2 = siteSetup.breaker2IP2;
            configurations[1].breakerIP3 = siteSetup.breaker2IP3;
            configurations[1].breakerIP4 = siteSetup.breaker2IP4;
            configurations[1].breakerSlaveId = siteSetup.breaker2SlaveID;
            configurations[1].type = siteSetup.breaker2Type;
            configurations[1].associatedOutput = siteSetup.breaker2AssociatedOutput;
            configurations[1].associatedInput = siteSetup.breaker2AssociatedInput;

            configurations[2].breakerIP1 = siteSetup.breaker3IP1;
            configurations[2].breakerIP2 = siteSetup.breaker3IP2;
            configurations[2].breakerIP3 = siteSetup.breaker3IP3;
            configurations[2].breakerIP4 = siteSetup.breaker3IP4;
            configurations[2].breakerSlaveId = siteSetup.breaker3SlaveID;
            configurations[2].type = siteSetup.breaker3Type;
            configurations[2].associatedOutput = siteSetup.breaker3AssociatedOutput;
            configurations[2].associatedInput = siteSetup.breaker3AssociatedInput;

            configurations[3].breakerIP1 = siteSetup.breaker4IP1;
            configurations[3].breakerIP2 = siteSetup.breaker4IP2;
            configurations[3].breakerIP3 = siteSetup.breaker4IP3;
            configurations[3].breakerIP4 = siteSetup.breaker4IP4;
            configurations[3].breakerSlaveId = siteSetup.breaker4SlaveID;
            configurations[3].type = siteSetup.breaker4Type;
            configurations[3].associatedOutput = siteSetup.breaker4AssociatedOutput;
            configurations[3].associatedInput = siteSetup.breaker4AssociatedInput;

            configurations[4].breakerIP1 = siteSetup.breaker5IP1;
            configurations[4].breakerIP2 = siteSetup.breaker5IP2;
            configurations[4].breakerIP3 = siteSetup.breaker5IP3;
            configurations[4].breakerIP4 = siteSetup.breaker5IP4;
            configurations[4].breakerSlaveId = siteSetup.breaker5SlaveID;
            configurations[4].type = siteSetup.breaker5Type;
            configurations[4].associatedOutput = siteSetup.breaker5AssociatedOutput;
            configurations[4].associatedInput = siteSetup.breaker5AssociatedInput;

            configurations[5].breakerIP1 = siteSetup.breaker6IP1;
            configurations[5].breakerIP2 = siteSetup.breaker6IP2;
            configurations[5].breakerIP3 = siteSetup.breaker6IP3;
            configurations[5].breakerIP4 = siteSetup.breaker6IP4;
            configurations[5].breakerSlaveId = siteSetup.breaker6SlaveID;
            configurations[5].type = siteSetup.breaker6Type;
            configurations[5].associatedOutput = siteSetup.breaker6AssociatedOutput;
            configurations[5].associatedInput = siteSetup.breaker6AssociatedInput;

            configurations[6].breakerIP1 = siteSetup.breaker7IP1;
            configurations[6].breakerIP2 = siteSetup.breaker7IP2;
            configurations[6].breakerIP3 = siteSetup.breaker7IP3;
            configurations[6].breakerIP4 = siteSetup.breaker7IP4;
            configurations[6].breakerSlaveId = siteSetup.breaker7SlaveID;
            configurations[6].type = siteSetup.breaker7Type;
            configurations[6].associatedOutput = siteSetup.breaker7AssociatedOutput;
            configurations[6].associatedInput = siteSetup.breaker7AssociatedInput;

            configurations[7].breakerIP1 = siteSetup.breaker8IP1;
            configurations[7].breakerIP2 = siteSetup.breaker8IP2;
            configurations[7].breakerIP3 = siteSetup.breaker8IP3;
            configurations[7].breakerIP4 = siteSetup.breaker8IP4;
            configurations[7].breakerSlaveId = siteSetup.breaker8SlaveID;
            configurations[7].type = siteSetup.breaker8Type;
            configurations[7].associatedOutput = siteSetup.breaker8AssociatedOutput;
            configurations[7].associatedInput = siteSetup.breaker8AssociatedInput;

            configurations[8].breakerIP1 = siteSetup.breaker9IP1;
            configurations[8].breakerIP2 = siteSetup.breaker9IP2;
            configurations[8].breakerIP3 = siteSetup.breaker9IP3;
            configurations[8].breakerIP4 = siteSetup.breaker9IP4;
            configurations[8].breakerSlaveId = siteSetup.breaker9SlaveID;
            configurations[8].type = siteSetup.breaker9Type;
            configurations[8].associatedOutput = siteSetup.breaker9AssociatedOutput;
            configurations[8].associatedInput = siteSetup.breaker9AssociatedInput;

            return configurations;
        }

        public BreakerSetupObject[] setBreakerConfigurations (BreakerSetupObject[] configurations) {
            var newSiteSetup = new siteSetupStructure () {
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

            this.setConfigData (newSiteSetup);

            State.siteSetup = newSiteSetup;

            return configurations;
        }

    }
}