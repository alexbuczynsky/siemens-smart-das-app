// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React, { useState, useEffect } from 'react';
// Material UI Imports
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, Avatar, CardContent, FormControl, Select, MenuItem, InputLabel, CardActions, TextField, Button } from '@material-ui/core';
import { BreakerType, BreakerSetupObject } from '../models';
import { SmartDASClientService } from '../services/configured-services';
import { StoreActions } from '../store';
import { IPAddressInputField } from './IPAddressInputField';

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
    width: '100%',
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

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const BreakerConfigCard: React.FC<BreakerConfigCardProps> = props => {
  const classes = useStyles();

  const index = props.config.id;

  const [ipAddress, setIPAddress] = useState(props.config.ipAddress);

  const [serverConfig, setServerConfig] = useState(new BreakerSetupObject(index, props.config));

  const [breakerConfig, setBreakerConfig] = useState(props.config);

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
      .catch(err => alert(err))
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
    }

    breakerConfig[key] = value;

    setBreakerConfig(new BreakerSetupObject(index, breakerConfig));
  }

  const disableButton = hasChanged() === false || error;

  console.log("---------------------------------------")
  console.log({ breakerConfig })
  console.log({ disableButton, hasChanged: hasChanged() })
  console.log("---------------------------------------")

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