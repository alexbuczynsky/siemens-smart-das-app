// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React, { useEffect, useState } from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import Typography from '@material-ui/core/Typography';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core';
import { IPAddressInputField } from './IPAddressInputField';
import { AsyncSaveButton } from './AsyncSaveButton';
import { useStore } from '../hooks';
import { SmartDASClientService } from '../services/configured-services';
import { StoreActions } from '../store';
import { BreakerSetupObject } from '../models';

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%'
  }
}));

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export type ModifyTargetPLCButtonProps = {};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const ModifyTargetPLCButton: React.FC<ModifyTargetPLCButtonProps> = props => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [ip, setIP] = useState('0.0.0.0');

  const [isValid, setIsValid] = React.useState({
    ip: true,
  });

  useEffect(() => {
    getTargetIP();
  }, [])




  function getTargetIP() {
    return SmartDASClientService
      .getPLCConfig()
      .then(config => {
        setIP(config.ip);
      })
      .catch(err => {
        // alert(err.message)
        console.error(err)
      })
  }

  function handleClickOpen() {
    getTargetIP();
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function handleSave() {
    try {
      const updatedConfig = await SmartDASClientService
        .setPLCConfig({
          ip: ip,
        });
      setIP(updatedConfig.ip);
    } catch (err) {
      StoreActions.Notifications.publishError({
        title: `Failed Updating PLC Network Configuration`,
        message: err.message,
      })

      return {
        isSuccess: false
      }
    }

    return {
      isSuccess: true
    }
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Change Target PLC
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modify PLC Network Settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modify the IP Address of the PLC you are attempting to connect to.
          </DialogContentText>
          <IPAddressInputField label="IP Address" value={ip} onChange={(value, valid) => {
            setIP(value);
            setIsValid({
              ...isValid,
              ip: valid,
            });
          }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <AsyncSaveButton disabled={!(isValid.ip)} onClick={handleSave} />
        </DialogActions>
      </Dialog>
    </div>
  )
};