// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React, { useState } from 'react';
// Material UI Imports
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, Avatar, CardContent, FormControl, Select, MenuItem, InputLabel, CardActions, TextField, Button } from '@material-ui/core';
import { BreakerType, BreakerSetupObject } from '../models';
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

export type BreakerConfigCardProps = {
  config: BreakerSetupObject;
  index: number;
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

  const [ipAddress, setIPAddress] = useState(props.config.ipAddress);

  const [serverConfig, setServerConfig] = useState(new BreakerSetupObject(props.config));

  const [breakerConfig, setBreakerConfig] = useState(props.config);


  const index = props.index;

  const error = isValidIPAddress(ipAddress) === false;

  const handleSubmit = (e: any) => {
    console.log(e.target.value);
    smartAPI
      .updateBreakerConfigByIndex(props.index, breakerConfig)
      .then(updatedConfig => {
        setBreakerConfig(new BreakerSetupObject(updatedConfig));
        setServerConfig(new BreakerSetupObject(updatedConfig));
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

    setBreakerConfig(new BreakerSetupObject(breakerConfig));
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
            <TextField
              error={error}
              id='outlined-error'
              label='Server IP Address'
              value={ipAddress}
              onChange={e => updateBreakerConfig('ipAddress', e.target.value)}
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