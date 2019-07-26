// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React from "react";
// Material UI Imports
import { makeStyles } from "@smartgear/edison";
import {
  Chip
} from "@material-ui/core";
// ---------------------------------------  ----------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    flex: "1 1 auto"
  },
}));

interface DASStatusChipProps {
  isEnabled: boolean;
}

export const DASStatusChip: React.FC<DASStatusChipProps> = props => {
  const classes = useStyles();

  const color = props.isEnabled ? "primary" : "default";
  const label = props.isEnabled ? "DAS is Enabled" : "DAS is Disabled";
  return (
    <div className={classes.root}>
      <Chip color={color} label={label} />
    </div>
  );
};