// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React, { useEffect, useState } from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import { Grid } from '@material-ui/core';
import { BreakerSetupObject } from '../models';
import { SmartDASClientService } from '../services/configured-services';
import { ConnectionStatusCard } from '../components/PLCConnectionStatusCard';
import { ConfiguredBreakersCard } from '../components/ConfiguredBreakers/Card';
import { useStore, useInterval } from '../hooks';
import Store, { StoreActions } from '../store';
import { ToolsCard } from '../components/ToolsCard';
import { SiteSetupStructure } from '../models/SiteSetupStructure';

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    width: '90%',
    maxWidth: '1920px',
  },
}));

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export type DASDashboardProps = {};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const DASDashboard: React.FC<DASDashboardProps> = props => {
  const classes = useStyles();

  const PLCIsConnected = useStore(state => state.breakers.isPLCConnected);

  const [fetchStatusInterval, setFetchStatusInterval] = useState(2000);

  useEffect(() => {
    SmartDASClientService
      .getSiteSetupStructure()
      .then(config => {
        const setupStructure = new SiteSetupStructure(config);

        StoreActions.Breakers.updateAll(setupStructure.breakers);
        StoreActions.Breakers.setSwitchType(setupStructure.switchType);
      })
      .catch(err => console.error(err))
  }, [PLCIsConnected])


  // CHECK PLC CONNECTION STATUS
  useInterval(() => {
    StoreActions.TestPLCConnection();
  }, 3000)

  useEffect(() => {
    if (PLCIsConnected) {
      setFetchStatusInterval(2000);
    } else {
      setFetchStatusInterval(0);
    }
  }, [PLCIsConnected])


  useInterval(() => {
    SmartDASClientService
      .getDASStatus()
      .then(status => {
        StoreActions.Breakers.updateDASStatus(status);
      })

    SmartDASClientService
      .getActiveAlarms()
      .then(alarms => {
        StoreActions.Breakers.updateAlarms(alarms);
      })

    SmartDASClientService
      .getDASActiveCommands()
      .then(commands => {
        StoreActions.Breakers.updateDASCommands(commands);
      })
  }, fetchStatusInterval)



  return (
    <div className={classes.root}>
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
    </div >
  );
};