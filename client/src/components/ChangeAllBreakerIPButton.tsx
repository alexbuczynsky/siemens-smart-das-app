// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React from 'react';
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

export type ChangeAllBreakerIPButtonProps = {};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const ChangeAllBreakerIPButton: React.FC<ChangeAllBreakerIPButtonProps> = props => {
  const classes = useStyles();

  const breakers = useStore(state => state.breakers.List);

  const [open, setOpen] = React.useState(false);
  const [ip, setIP] = React.useState('0.0.0.0');
  const [isValid, setIsValid] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function handleSave() {
    for (let breaker of breakers) {
      try {

        breaker.ipAddress = ip;
        const payload = await SmartDASClientService.updateBreakerConfigByIndex(breaker.id, breaker);
        breaker = new BreakerSetupObject(breaker.id, payload);
        StoreActions.Breakers.updateOne(breaker);

      } catch (err) {

        StoreActions.Notifications.publishError({
          title: `Breaker ${breaker.id} Failed Updating...`,
          message: err.message,
        })

        return {
          isSuccess: false
        }
      }
    }

    return {
      isSuccess: true
    }
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Set All Breaker IP
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Change All IP Address</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To quickly change the IP address of all breakers, set the ip address below
          </DialogContentText>
          <IPAddressInputField value={ip} onChange={(value, valid) => {
            setIP(value);
            setIsValid(valid);
          }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <AsyncSaveButton disabled={!isValid} onClick={handleSave} />
        </DialogActions>
      </Dialog>
    </div>
  )
};