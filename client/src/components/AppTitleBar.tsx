// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React from "react";
// Material UI Imports
import { makeStyles, EdisonThemeNames } from "@smartgear/edison";
import Typography from "@material-ui/core/Typography";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";

import LightBulbIcon from "@material-ui/icons/Brightness6";

import SiemensLogo from "../assets/images/siemens-logo/sie-logo-petrol-rgb.svg";

import packageJson from '../../package.json';

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    // display: "flex",
    width: '100%',
    position: 'fixed',
    top: 0,
    marginBottom: theme.spacing(3),
    zIndex: 100,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    width: `calc(100%)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...theme.mixins.appbar
  },
  brandLogo: {
    width: "auto",
    height: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export type AppTitleBarProps = {
  onChangeTheme?: () => void;
};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const AppTitleBar: React.FC<AppTitleBarProps> = props => {
  const classes = useStyles();

  const handleChangeThemeName = () => {
    props.onChangeTheme && props.onChangeTheme();
  };
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <img
            className={classes.brandLogo}
            src={SiemensLogo}
            alt="SiemensLogo"
          />
          <Typography className={classes.title} variant="h6" color="inherit">
            Smart DAS
          </Typography>
          <Typography variant="h4" color="inherit">
            v{packageJson.version}
          </Typography>
          <IconButton onClick={handleChangeThemeName}>
            <LightBulbIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};
