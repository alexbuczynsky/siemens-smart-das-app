// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React, { useEffect, useState } from "react";
// Material UI Imports
import { makeStyles } from "@smartgear/edison";
import { Grid } from "@material-ui/core";
import { BreakerSetupObject } from "../models";
import { SmartDASClientService } from "../services/configured-services";
import { ConnectionStatusCard } from "../components/PLCConnectionStatusCard";
import { ConfiguredBreakersCard } from "../components/ConfiguredBreakers/Card";
import { useStore, useInterval } from "../hooks";
import Store, { StoreActions } from "../store";
import { ToolsCard } from "../components/ToolsCard";
import { SiteSetupStructure } from "../models/SiteSetupStructure";
import { InvalidBreakerConfigModal } from '../components/InvalidBreakerConfigModal';

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "75px",
    width: "90%",
    maxWidth: "1200px"
  }
}));

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export type DASDashboardProps = {};

const STATUS_FETCH_INTERVAL = 2000;
const CONNECTION_TEST_INTERVAL = 10000;

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const DASDashboard: React.FC<DASDashboardProps> = props => {
  const classes = useStyles();

  const PLCIsConnected = useStore(state => state.breakers.isPLCConnected);

  const invalidSiteConfig = useStore(state => state.breakers.invalidSiteConfig);

  const [fetchStatusInterval, setFetchStatusInterval] = useState(0);
  const [checkConnectionInterval, setCheckConnectionInterval] = useState(
    CONNECTION_TEST_INTERVAL
  );

  useEffect(() => {
    if (PLCIsConnected) {
      getSiteSetup();
    }

  }, [PLCIsConnected])


  function getSiteSetup(attempts: number = 0) {
    SmartDASClientService
      .getSiteSetupStructure()
      .then(config => {
        const setupStructure = new SiteSetupStructure(config);

        StoreActions.Breakers.updateAll(setupStructure.breakers);
        StoreActions.Breakers.setSwitchType(setupStructure.switchType);
      }).catch(err => {
        if (attempts < 5) {
          return getSiteSetup(attempts)
        } else {
          console.error(err);
        }
      })
  }

  // CHECK PLC CONNECTION STATUS
  useInterval(() => {
    StoreActions.TestPLCConnection().catch(err => console.error(err));
  }, checkConnectionInterval);

  useEffect(() => {
    if (PLCIsConnected) {
      setFetchStatusInterval(STATUS_FETCH_INTERVAL);
      setCheckConnectionInterval(10000);
    } else {
      setFetchStatusInterval(0);
      setCheckConnectionInterval(CONNECTION_TEST_INTERVAL);
    }
  }, [PLCIsConnected]);

  useInterval(() => {
    StoreActions.TestPLCConnection()
      .then(() => SmartDASClientService.getDASStatus())
      .then(status => {
        StoreActions.Breakers.updateDASStatus(status);
        return;
      })
      .then(() => SmartDASClientService.getActiveAlarms())
      .then(alarms => {
        StoreActions.Breakers.updateAlarms(alarms);
        return;
      })
      .then(() => SmartDASClientService.getDASActiveCommands())
      .then(commands => {
        StoreActions.Breakers.updateDASCommands(commands);
      })
      .catch(err => console.error(err));
  }, fetchStatusInterval);

  return (
    <div className={classes.root}>
      <InvalidBreakerConfigModal open={invalidSiteConfig} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <ConnectionStatusCard />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <ToolsCard />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ConfiguredBreakersCard />
        </Grid>
      </Grid>
    </div>
  );
};
