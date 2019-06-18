// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React, { useState, useEffect } from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import { Grid } from '@material-ui/core';
import { BreakerConfigCard } from '../components/BreakerConfigCard';
import { BreakerSetupObject } from '../models';
import { SmartDASClientService } from '../services/configured-services';
import { ConnectionStatusCard } from '../components/PLCConnectionStatusCard';
import { ConfiguredBreakersCard } from '../components/ConfiguredBreakers/Card';
import { useStore, useInterval } from '../hooks';
import { StoreActions } from '../store';
import { ToolsCard } from '../components/ToolsCard';

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

  const isPLCConnected = useStore(state => state.breakers.isPLCConnected);

  useEffect(() => {
    SmartDASClientService
      .getBreakerConfig()
      .then(config => {
        StoreActions.Breakers.updateAll(config.map((x, ii) => new BreakerSetupObject(ii + 1, x)))
      })
      .catch(err => console.error(err))
  }, [isPLCConnected])

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
  }, 1000)



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