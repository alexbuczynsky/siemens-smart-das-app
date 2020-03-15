// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React, { useEffect } from 'react';
// Material UI Imports
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { SmartDASClientService } from '../services/configured-services';
import { StoreActions } from '../store';
import { ButtonProps } from '@material-ui/core/Button';
import { SiteSetupStructure } from '../models/SiteSetupStructure';

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

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (props.open !== undefined) {
      setOpen(props.open);
    }
  }, [props.open])


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