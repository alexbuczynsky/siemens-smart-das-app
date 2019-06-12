// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React, { useState, useEffect } from 'react';
// Material UI Imports
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, Avatar, CardContent, FormControl, CardActions, TextField, Button } from '@material-ui/core';
import { smartAPI } from '../services/configured-services';

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles((theme: any) => ({
  root: {
    maxWidth: '100%'
  },
  cardContent: {
    height: '400px'
  },
  formField: {
    marginTop: '5px',
  }
}));

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export type PLCConfigCardProps = {
  config: SmartDAS.Models.PLCConfig;
  onChange?: (ip: string) => void;
  onSubmitSuccess?: (newConfig: SmartDAS.Models.PLCConfig) => void;
};

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
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const PLCConfigCard: React.FC<PLCConfigCardProps> = props => {
  const classes = useStyles();

  const [originalIP, setOriginalIP] = useState(props.config.ip)
  const [ipAddress, setIPAddress] = useState(props.config.ip);

  useEffect(() => {
    setOriginalIP(props.config.ip);
    setIPAddress(props.config.ip);
  }, [props.config])

  const error = isValidIPAddress(ipAddress) === false;

  const handleSubmit = (e: any) => {
    console.log(e.target.value);
    smartAPI
      .setPLCConfig({
        ip: ipAddress
      })
      .then(updatedConfig => {
        setOriginalIP(updatedConfig.ip);
      })
      .catch(err => alert(err))
  }


  function hasChanged() {
    return originalIP !== ipAddress;
  }

  const disableButton = hasChanged() === false || error;



  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe">
            {'P'}
          </Avatar>
        }
        title={`PLC Configuration`}
        subheader={`Configuration for Target PLC`}
      />
      <CardContent className={classes.cardContent}>
        <form autoComplete="off">
          <FormControl className={classes.formField} fullWidth>
            <TextField
              error={error}
              id='outlined-error'
              label='Server IP Address'
              value={ipAddress}
              onChange={e => setIPAddress(e.target.value)}
              margin='normal'
              variant='outlined'
            />
          </FormControl>
        </form>
      </CardContent>
      <CardActions>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          onClick={handleSubmit}
          disabled={disableButton}
        >
          Apply Changes
        </Button>
      </CardActions>
    </Card>
  );
};