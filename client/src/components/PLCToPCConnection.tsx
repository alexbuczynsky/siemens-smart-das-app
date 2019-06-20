// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';

import S7_1200_PLC from "../assets/images/G_SY02_XX_02043V.svg";
import General_Laptop_Image from "../assets/images/G_SY02_XX_01465V.svg";
import Gateway_Image from "../assets/images/G_SY02_XX_02401V.svg";

import clsx from 'clsx';

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles(theme => {

  const imageHeight = theme.spacing(12);

  return {
    root: {
      display: 'flex',
      alignItems: 'flex-start'
    },
    PLCImage: {
      width: 'auto',
      height: imageHeight,
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(2),
      display: 'flex'
    },
    GatewayImage: {
      width: 'auto',
      height: imageHeight,
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
      display: 'flex'
    },
    PCImage: {
      width: 'auto',
      height: imageHeight,
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(-2),
      display: 'flex'
    },
    ConnectionLinkContainer: {
      width: 'auto',
      height: imageHeight,
      display: 'flex'
    },
    ConnectionLink: {
      strokeDasharray: '15 5',
      strokeWidth: "5%",
    },
    LinkIsDisconnected: {
      stroke: theme.palette.error.light,
    },
    LinkIsActive: {
      stroke: theme.palette.success.dark,
      animation: 'dash 10s ease-in-out infinite',
      animationDirection: 'alternate',
    },
    '@keyframes dash': {
      "from": {
        strokeDashoffset: '20',
      },
      "to": {
        strokeDashoffset: '0',
      }
    },
  }
});



// -------------------------------------------------------------------------
// Local Components
// ------------------------------------------------------------------------

const ConnectionLink: React.FC<{ connected?: boolean }> = props => {
  const classes = useStyles();

  const connectionLineClassName = clsx({
    [classes.ConnectionLink]: true,
    [classes.LinkIsActive]: props.connected,
    [classes.LinkIsDisconnected]: !props.connected,
  });

  const bottomStyle: React.CSSProperties = {
    animationDirection: 'alternate-reverse',
  }

  return (
    <svg className={classes.ConnectionLinkContainer} viewBox={'0 0 100 100'} >
      <line className={connectionLineClassName} x1="0" y1="45%" x2="100%" y2="45%" />
      <line className={connectionLineClassName} style={bottomStyle} x1="0" y1="55%" x2="100%" y2="55%" />
    </svg>
  );
}

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export type PLCToPCConnectionProps = {
  isBackendConnected?: boolean;
  isPLCConnected?: boolean;
};



// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const PLCToPCConnection: React.FC<PLCToPCConnectionProps> = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        className={classes.PCImage}
        src={General_Laptop_Image}
        alt='General_Laptop_Image'
        title="PC"
      />
      <ConnectionLink connected={props.isBackendConnected} />
      <img
        className={classes.GatewayImage}
        src={Gateway_Image}
        alt='Gateway_Image'
        title="Gateway"
      />
      <ConnectionLink connected={props.isPLCConnected} />
      <img
        className={classes.PLCImage}
        src={S7_1200_PLC}
        alt='S7_1200_PLC'
        title="PLC"
      />
    </div>
  );
};