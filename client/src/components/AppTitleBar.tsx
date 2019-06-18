// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import Typography from '@material-ui/core/Typography';
import { AppBar, Toolbar } from '@material-ui/core';

import SiemensLogo from '../assets/images/siemens-logo/sie-logo-layer-claim-petrol-rgb.svg';

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(3),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    width: `calc(100%)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...theme.mixins.appbar,
  },
  brandLogo: {
    width: 'auto',
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
  },
}));

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export type AppTitleBarProps = {};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const AppTitleBar: React.FC<AppTitleBarProps> = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <img
            className={classes.brandLogo}
            src={SiemensLogo}
            alt='SiemensLogo'
          />
          <Typography variant="h6" color="inherit">
            Smart DAS
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};