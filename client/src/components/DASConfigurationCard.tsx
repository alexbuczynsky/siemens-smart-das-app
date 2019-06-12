// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React from 'react';
// Material UI Imports
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { Card, CardHeader, Avatar, IconButton, Grid, CardContent, FormControl, Select, MenuItem, FormHelperText } from '@material-ui/core';
import { BreakerConfigCard } from './BreakerConfigCard';
import { BreakerSetupObject } from '../models';

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

export type DASConfigurationCardProps = {
  configuration: BreakerSetupObject[]
};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const DASConfigurationCard: React.FC<DASConfigurationCardProps> = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {props.configuration.map((breakerConfig, ii) => (
          <Grid item xs={6} sm={4} md={4} lg={3}>
            <BreakerConfigCard key={ii} config={breakerConfig} index={ii + 1} />
          </Grid>
        ))}
      </Grid>
    </div >
  );
};