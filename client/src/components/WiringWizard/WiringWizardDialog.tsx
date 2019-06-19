// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React, { useState, useEffect } from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { WiringWizardDiagram } from './WiringWizardDiagram';

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

export type WiringWizardDialogProps = {
  isOpen: boolean;
  onClose?: () => void;
};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const WiringWizardDialog: React.FC<WiringWizardDialogProps> = props => {
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

  return (
    <div className={classes.root}>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        keepMounted
        maxWidth="xl"
      >
        <DialogTitle>IO Wiring Wizard</DialogTitle>
        <DialogContent>
          <WiringWizardDiagram />
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