// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React, { useEffect } from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { IPAddressInputField } from './IPAddressInputField';
import { AsyncSaveButton } from './AsyncSaveButton';
import { useStore } from '../hooks';
import { SmartDASClientService } from '../services/configured-services';
import { StoreActions } from '../store';
import { BreakerSetupObject } from '../models';
import { ButtonProps } from '@material-ui/core/Button';
import { SiteSetupStructure } from '../models/SiteSetupStructure';

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

export interface InvalidBreakerConfigModalProps extends ButtonProps {
  open?: boolean;
};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const InvalidBreakerConfigModal: React.FC<InvalidBreakerConfigModalProps> = props => {
  const classes = useStyles();

  const breakers = useStore(state => state.breakers.List);

  const [open, setOpen] = React.useState(false);
  const [ip, setIP] = React.useState('0.0.0.0');
  const [isValid, setIsValid] = React.useState(false);

  useEffect(() => {
    if (props.open !== undefined) {
      setOpen(props.open);
    }
  }, [props.open])

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function handleResetPLC() {

    try {

      const siteSetup = await SmartDASClientService.setSiteSetupStructure(new SiteSetupStructure());

      const breakers = SiteSetupStructure.ConvertToBreakerSetupObjectArray(new SiteSetupStructure(siteSetup));

      StoreActions.Breakers.updateAll(breakers);
      StoreActions.Breakers.setSwitchType(siteSetup.switchType);

    } catch (err) {
      console.error(err)
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
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Warning: Invalid / Corrupted PLC Configuration Detected</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The PLC configuration is invalid and outside the acceptable operating range. This can occur when the
            PLC has a corrupted configuration or due to operator error. If you would like to reset the configuration
            of the PLC back to its default settings click the <b>"RESET PLC"</b> button below. If you feel comfortable enough
            to continue to use the application, you can ignore this message.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ignore
          </Button>

          <Button onClick={handleResetPLC} color="primary" variant='contained'>
            Reset PLC
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  )
};