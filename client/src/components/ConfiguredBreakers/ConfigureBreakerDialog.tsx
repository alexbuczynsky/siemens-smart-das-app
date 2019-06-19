// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React, { useState, useEffect, useCallback } from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import Typography from '@material-ui/core/Typography';
import { Dialog, DialogTitle, DialogActions, Button, DialogContent } from '@material-ui/core';
import { BreakerSetupObject } from '../../models';
import { BreakerConfigCard } from '../BreakerConfigCard';

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

export type ConfigureBreakerDialogProps = {
  isOpen: boolean;
  breaker: BreakerSetupObject;
  onClose?: () => void;
};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const ConfigureBreakerDialog: React.FC<ConfigureBreakerDialogProps> = props => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(props.isOpen);

  useEffect(() => {
    if (props.isOpen) {
      handleOpen();
    } else {
      handleClose();
    }

  }, [props.isOpen])

  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    }
    setIsOpen(false);
  }

  const handleOpen = () => {
    setIsOpen(true);
  }


  const { breaker } = props;

  return (
    <div className={classes.root}>
      <Dialog
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle>{`Update Breaker ${breaker.id}`}</DialogTitle>
        <DialogContent>
          <BreakerConfigCard config={breaker} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close Dialog
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};