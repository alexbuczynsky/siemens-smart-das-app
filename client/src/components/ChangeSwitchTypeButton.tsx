// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React, { useState, useEffect } from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { AsyncSaveButton } from './AsyncSaveButton';
import { useStore } from '../hooks';
import { SmartDASClientService } from '../services/configured-services';
import { StoreActions } from '../store';
import { BreakerSetupObject } from '../models';
import { ButtonProps } from '@material-ui/core/Button';

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

export interface ChangeSwitchTypeButtonProps extends ButtonProps { };

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const ChangeSwitchTypeButton: React.FC<ChangeSwitchTypeButtonProps> = props => {
  const classes = useStyles();

  const breakers = useStore(state => state.breakers.List);
  const StoreSiteSwitchType = useStore(state => state.breakers.switchType);

  const [open, setOpen] = useState(false);


  const [switchType, setSwitchType] = useState(StoreSiteSwitchType);


  useEffect(() => {
    setSwitchType(StoreSiteSwitchType)
  }, [StoreSiteSwitchType])

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleChange(event: React.ChangeEvent<any>) {
    setSwitchType(parseInt(event.target.value, 10));
  }

  async function handleSave() {
    try {
      const siteSetupStructure = BreakerSetupObject.ConvertToSiteSetupStructure(breakers, switchType);
      const payload = await SmartDASClientService.setSiteSetupStructure(siteSetupStructure);

      StoreActions.Breakers.setSwitchType(payload.switchType);

    } catch (err) {

      StoreActions.Notifications.publishError({
        title: `Switch Type Failed updating`,
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
      <Button {...props} variant="outlined" color="primary" onClick={handleClickOpen}>
        Change Switch Type
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Change Switch Type</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select the switch type below:
          </DialogContentText>
          <FormLabel component="legend">Switch Type</FormLabel>
          <RadioGroup
            value={String(switchType)}
            onChange={handleChange}
          >
            <FormControlLabel
              value="0"
              control={<Radio color="primary" />}
              label="Toggle"
              labelPlacement="start"
            />
            <FormControlLabel
              value="1"
              control={<Radio color="primary" />}
              label="Push"
              labelPlacement="start"
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <AsyncSaveButton onClick={handleSave} />
        </DialogActions>
      </Dialog>
    </div>
  )
};