// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import { Card, CardHeader, CardContent, CardActions, Typography, Avatar } from '@material-ui/core';
import { ModifyPLCNetworkButton } from './ModifyPLCNetworkButton';
import { useStore } from '../hooks';
import { BrandvilleIcons } from '@smartgear/icons';
import { ModifyTargetPLCButton } from './ModifyTargetPLCButton';
import { PLCToPCConnection } from './PLCToPCConnection';



// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%'
  },
  onlineAvatar: {
    color: theme.palette.success.contrastText,
    backgroundColor: theme.palette.success.light,
  },
  offlineAvatar: {
    color: theme.palette.error.contrastText,
    backgroundColor: theme.palette.error.light,
  },

}));

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export type ConnectionStatusCardProps = {};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const ConnectionStatusCard: React.FC<ConnectionStatusCardProps> = props => {
  const classes = useStyles();

  const isPLCConnected = useStore(state => state.breakers.isPLCConnected);
  const isBackendConnected = useStore(state => state.breakers.isBackendAPIConnected);
  const connectionState = useStore(state => state.breakers.PLCConnectionState);

  return (
    <div className={classes.root}>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="online-status" className={isPLCConnected ? classes.onlineAvatar : classes.offlineAvatar}>
              {isPLCConnected ? <BrandvilleIcons.CheckMark /> : <BrandvilleIcons.Close />}
            </Avatar>
          }
          title="PLC Connection Status"
          subheader={`Code: ${connectionState.code} | Message: ${connectionState.message}`} />
        <CardContent>
          <PLCToPCConnection
            isPLCConnected={isPLCConnected}
            isBackendConnected={isBackendConnected}
          />
        </CardContent>
        <CardActions>
          <ModifyTargetPLCButton variant={isPLCConnected ? "outlined" : "contained"} />
          <ModifyPLCNetworkButton />
        </CardActions>
      </Card>
    </div>
  );
};