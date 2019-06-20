// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React, { useState, useEffect } from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormLabel, RadioGroup, FormControlLabel, Radio, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { AsyncSaveButton } from './AsyncSaveButton';
import { useStore } from '../hooks';
import { SmartDASClientService } from '../services/configured-services';
import { StoreActions } from '../store';
import { BreakerSetupObject } from '../models';
import { ButtonProps } from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { useBreakerStatuses } from '../hooks/useBreakerStatus';

// ---------------------------------------  ----------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%'
  },
  list: {
    minWidth: '500px',
  }
}));

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export interface SetDASModeDialogButtonProps extends ButtonProps { };

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const SetDASModeDialogButton: React.FC<SetDASModeDialogButtonProps> = props => {
  const classes = useStyles();

  const breakers = useStore(state => state.breakers.List);
  const activateCommands = useStore(state => state.breakers.DAS.activateCommands)
  const breakerStatuses = useBreakerStatuses();
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


  function renderListItem(breaker: BreakerSetupObject) {

    const breakerState = breakerStatuses.find(x => x.breakerId === breaker.id);

    if (breakerState === undefined) {
      return null;
    }

    const handleToggle = async () => {
      const id = breaker.id;
      (activateCommands as any)[`dasActivateBreaker${id}`] = !breakerState.activateCommandState;
      try {
        const payload = await SmartDASClientService.setDASActiveCommands(activateCommands);
        StoreActions.Breakers.updateDASCommands(payload);
      } catch (e) {

      }

    }

    return (
      <ListItem key={breaker.id}>
        <ListItemText
          primary={`Breaker ${breaker.id}`}

        />
        <ListItemText
          primary={breakerState.isDASEnabled ? "DAS is Enabled" : "DAS is Disabled"}
        />
        <ListItemText
          primary={breakerState.activateCommandState ? "PLC is Enabling DAS" : "PLC is Disabling DAS"}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleToggle}
        >
          {breakerState.activateCommandState ? "Turn on DAS" : "Turn off DAS"}
        </Button>
      </ListItem>
    )
  }

  return (
    <div>
      <Button {...props} variant="outlined" color="primary" onClick={handleClickOpen}>
        Set Breaker DAS Modes
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Set Breaker DAS Modes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modify the DAS state by using the interface below.
            To enable / disable DAS mode press the button on the right next to the breaker you are testing.
          </DialogContentText>
          <List dense className={classes.list}>
            {breakers.map(renderListItem)}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};