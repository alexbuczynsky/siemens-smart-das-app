// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React, { useState, useEffect } from 'react';
// Material UI Imports
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { Card, CardHeader, Avatar, IconButton, Grid, CardContent, FormControl, Select, MenuItem, FormHelperText } from '@material-ui/core';
import { BreakerConfigCard } from './BreakerConfigCard';
import { BreakerSetupObject } from '../models';
import { smartAPI } from '../services/configured-services';
import { PLCConfigCard } from './PLCConfigCard';

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles((theme: any) => ({
  root: {
    width: '90%',
    maxWidth: '1920px',
  }
}));

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export type DASConfigurationCardProps = {};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const DASConfigurationCard: React.FC<DASConfigurationCardProps> = props => {
  const classes = useStyles();

  const [breakerSetup, setBreakerSetup] = useState<BreakerSetupObject[]>([])
  const [PLCConfig, setPLCConfig] = useState<SmartDAS.Models.PLCConfig>(
    {
      ip: '0.0.0.0',
    }
  )

  useEffect(() => {
    smartAPI
      .getBreakerConfig()
      .then(config => {
        setBreakerSetup(config.map(x => new BreakerSetupObject(x)));
      })
      .catch(err => {
        // alert(err.message)
        console.error(err)
      });

    smartAPI
      .getPLCConfig()
      .then(config => {
        setPLCConfig(config);
      })
      .catch(err => {
        // alert(err.message)
        console.error(err)
      })
  }, [])

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4} md={4} lg={3}>
          <PLCConfigCard
            config={PLCConfig}
            onSubmitSuccess={setPLCConfig}
          />
        </Grid>
        {breakerSetup.map((breakerConfig, ii) => (
          <Grid item xs={6} sm={4} md={4} lg={3}>
            <BreakerConfigCard key={ii} config={breakerConfig} index={ii + 1} />
          </Grid>
        ))}
      </Grid>
    </div >
  );
};