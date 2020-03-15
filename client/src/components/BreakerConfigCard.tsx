// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React, { useState } from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import { Card, CardHeader, Avatar, CardContent, FormControl, Select, MenuItem, InputLabel, CardActions, TextField, Button, Snackbar, SnackbarContent, Typography } from '@material-ui/core';
import { BreakerType, BreakerSetupObject, breakerTypeDisplayName } from '../models';
import { SmartDASClientService } from '../services/configured-services';
import { StoreActions } from '../store';
import { IPAddressInputField } from './IPAddressInputField';
import { usePLCNetworkConfig } from '../hooks';

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%'
  },
  cardContent: {
    height: '400px'
  },
  formField: {
    marginTop: '5px',
    width: '100%',
  },
  errorSnackBar: {
    backgroundColor: theme.palette.warning.dark,
    color: theme.palette.common.black,
  }
}));

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export type BreakerConfigCardProps = {
  config: BreakerSetupObject;
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

function isInRange(num: number, low: number, high: number) {
  if (num >= low && num <= high) {
    return true;
  } else {
    return false;
  }
}

function isValidSlaveId(slaveId: number) {
  return isInRange(slaveId, 0, 255);
}

function isValidIO(input: number) {
  return isInRange(input, 0, 9);
}

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const BreakerConfigCard: React.FC<BreakerConfigCardProps> = props => {
  const classes = useStyles();

  const index = props.config.id;

  const [plcNetworkConfig] = usePLCNetworkConfig();


  const plcIPAddress = `${plcNetworkConfig.newIP1}.${plcNetworkConfig.newIP2}.${plcNetworkConfig.newIP3}.${plcNetworkConfig.newIP4}`
  const [oldIPAddress] = useState(props.config.ipAddress);
  const [ipAddress, setIPAddress] = useState(props.config.ipAddress);

  const [serverConfig, setServerConfig] = useState(new BreakerSetupObject(index, props.config));

  const [breakerConfig, setBreakerConfig] = useState(new BreakerSetupObject(index, props.config));

  const error = isValidIPAddress(ipAddress) === false;

  const handleSubmit = (e: any) => {
    console.log(e.target.value);
    SmartDASClientService
      .updateBreakerConfigByIndex(index, breakerConfig)
      .then(updatedConfig => {
        const newBreakerConfig = new BreakerSetupObject(index, updatedConfig);
        setBreakerConfig(newBreakerConfig);
        setServerConfig(newBreakerConfig);
        StoreActions.Breakers.updateOne(newBreakerConfig);
      })
      .catch(err => {
        StoreActions.Notifications.publishError({
          title: 'Update Breaker Config Failed',
          message: err.message,
        })
      })
  }


  function hasChanged() {
    let changed = false;
    const keys = Object.keys(breakerConfig) as (keyof BreakerSetupObject)[];

    keys.forEach(key => {
      const original = serverConfig[key];
      const modified = breakerConfig[key];
      if (original !== modified) {
        changed = true;
      }
    })

    return changed;
  }



  function updateBreakerConfig<T extends keyof BreakerSetupObject>(key: T, value: BreakerSetupObject[T]) {
    console.log(key, value, isValidIPAddress(value as string))
    switch (key) {
      case 'ipAddress':
        if (isValidIPAddress(value as string) === false) {
          breakerConfig[key] = value;
        }
        setIPAddress(value as string);
        break;
      case 'breakerSlaveId':
        const slaveId = Number(value);
        if (isValidSlaveId(slaveId) === false) {
          return;
        }
        break;
      case 'associatedInput':
      case 'associatedOutput':
        const IO = Number(value);
        if (isValidIO(IO) === false) {
          return;
        }
        break;
    }

    breakerConfig[key] = value;

    setBreakerConfig(new BreakerSetupObject(index, breakerConfig));
  }

  const disableButton = hasChanged() === false || error;

  const plcIPArray = plcIPAddress.split('.').map(x => parseInt(x, 10))
  const newIPArray = ipAddress.split('.').map(x => parseInt(x, 10))

  const deviceIpInSameNetworkFamilyAsPLC = plcIPArray[0] === newIPArray[0] && plcIPArray[1] === newIPArray[1] && plcIPArray[2] === newIPArray[2];

  const deviceDisplayNameForErrorMessage = breakerConfig.type === 0 ? "device" : breakerTypeDisplayName(breakerConfig.type);

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe">
            {index}
          </Avatar>
        }
        title={`Configuration for Breaker ${index}`}
        subheader={`Breaker ${index}`}
      />
      <CardContent className={classes.cardContent}>
        <form autoComplete="off">
          <FormControl className={classes.formField} fullWidth>
            <Snackbar
              autoHideDuration={0}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}

              open={plcIPAddress !== '0.0.0.0' && !deviceIpInSameNetworkFamilyAsPLC}
            >
              <SnackbarContent
                className={classes.errorSnackBar}
                message={
                  <React.Fragment>
                    <Typography variant='h3' color='inherit' align='center' gutterBottom>
                      Warning
                    </Typography>
                    <Typography variant='subtitle1' color='inherit'>
                      Setting the device ip address to <b>{ipAddress}</b> is not in the same network
                      family as the current PLC ip address <b>{oldIPAddress}</b>.
                      <br />

                      In order for the PLC to connect to the {deviceDisplayNameForErrorMessage}, perform one the following actions:
                      <li>Change the {deviceDisplayNameForErrorMessage} to be in the <b>{plcIPAddress.split('.').slice(0, 3).join('.')}.x</b> network range</li>
                      <li>Change the PLC to be in the <b>{ipAddress.split('.').slice(0, 3).join('.')}.x</b> network range</li>
                    </Typography>
                  </React.Fragment>
                }
              />
            </Snackbar>
            <IPAddressInputField value={ipAddress} onChange={value => updateBreakerConfig('ipAddress', value)} />
          </FormControl>

          <FormControl className={classes.formField}>
            <TextField
              id='outlined-error'
              label='Slave ID'
              type="number"
              value={breakerConfig.breakerSlaveId}
              onChange={e => updateBreakerConfig('breakerSlaveId', parseInt(e.target.value, 10))}
              margin='normal'
              variant='outlined'
            />
          </FormControl>


          <FormControl className={classes.formField} fullWidth>
            <InputLabel>Device Type</InputLabel>
            <Select
              value={breakerConfig.type}
              onChange={(e) => {
                updateBreakerConfig('type', e.target.value as BreakerType);
              }}
            >
              <MenuItem value={BreakerType.UNDEFINED}>Select a device</MenuItem>
              <MenuItem value={BreakerType.WL_BREAKER}>WL Breaker</MenuItem>
              <MenuItem value={BreakerType.VL_BREAKER}>VL Breaker</MenuItem>
              <MenuItem value={BreakerType.VA_BREAKER}>VA Breaker</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formField}>
            <TextField
              id='outlined-error'
              label='Associated Input'
              type="number"
              value={breakerConfig.associatedInput}
              onChange={e => updateBreakerConfig('associatedInput', parseInt(e.target.value, 10))}
              margin='normal'
              variant='outlined'
            />
          </FormControl>

          <FormControl className={classes.formField}>
            <TextField
              id='outlined-error'
              label='Associated Output'
              type="number"
              value={breakerConfig.associatedOutput}
              onChange={e => updateBreakerConfig('associatedOutput', parseInt(e.target.value, 10))}
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