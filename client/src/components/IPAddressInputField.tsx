// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import { BaseTextFieldProps } from '@material-ui/core/TextField';

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles((theme: any) => ({
  root: {
    maxWidth: '100%'
  }
}));

// -------------------------------------------------------------------------
// HELPER FUNCTIONS
// -------------------------------------------------------------------------

/**
 * Checks if the entered IP Address is Acceptable
 *
 * @param {string} ipaddress
 * @returns
 */
function isValidIPAddress(ipaddress: string) {
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
    return true;
  } else {
    return false;
  }
}

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export type IPAddressInputFieldProps = {
  value: string;
  onChange: (newIP: string, isValid: boolean) => void,
  label?: string;
};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const IPAddressInputField: React.FC<IPAddressInputFieldProps> = props => {
  const classes = useStyles();

  const error = isValidIPAddress(props.value) === false;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange(e.target.value, isValidIPAddress(e.target.value));
  }
  return (
    <div className={classes.root}>
      <TextField
        error={error}
        id='outlined-error'
        label={props.label || "IP Address"}
        value={props.value}
        onChange={handleChange}
        margin='normal'
        variant='outlined'
      />
    </div>
  );
};