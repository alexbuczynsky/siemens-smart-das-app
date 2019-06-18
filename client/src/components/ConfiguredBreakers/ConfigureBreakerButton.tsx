// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React, { useState } from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import { IconButton } from '@material-ui/core';

import { BrandvilleIcons } from '@smartgear/icons'
import { ConfigureBreakerDialog } from './ConfigureBreakerDialog';
import { BreakerSetupObject } from '../../models';

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles((theme: any) => ({
  root: {
    maxWidth: '100%'
  }
}));

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export type ConfigureBreakerButtonProps = {
  breaker: BreakerSetupObject
};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const ConfigureBreakerButton: React.FC<ConfigureBreakerButtonProps> = props => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);


  return (
    <React.Fragment>
      <ConfigureBreakerDialog
        isOpen={isOpen}
        onClose={handleClose}
        breaker={props.breaker}
      />
      <IconButton onClick={handleOpen}>
        <BrandvilleIcons.Settings />
      </IconButton>
    </React.Fragment>
  );
};