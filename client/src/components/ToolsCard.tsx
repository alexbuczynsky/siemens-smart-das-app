// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React, { useState } from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import { Card, CardHeader, CardActions, Button } from '@material-ui/core';
import { WiringWizardDialog } from './WiringWizard/WiringWizardDialog';
import { ChangeAllBreakerIPButton } from './ChangeAllBreakerIPButton';
import { useStore } from '../hooks';
import { ChangeSwitchTypeButton } from './ChangeSwitchTypeButton';
import { SetDASModeDialogButton } from './SetDASModeDialogButton';

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

export type ToolsCardProps = {};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const ToolsCard: React.FC<ToolsCardProps> = props => {
  const classes = useStyles();

  const [isWiringWizardOpen, setWiringWizardIsOpen] = useState(false);
  const PLCIsConnected = useStore(state => state.breakers.isPLCConnected);


  return (
    <div className={classes.root}>
      <WiringWizardDialog isOpen={isWiringWizardOpen} onClose={() => setWiringWizardIsOpen(false)} />
      <Card>
        <CardHeader title="Tools"></CardHeader>
        <CardActions>
          <Button
            disabled={!PLCIsConnected}
            onClick={() => setWiringWizardIsOpen(true)}
            variant="contained"
            color="primary"
          >Wiring Wizard</Button>
          <ChangeAllBreakerIPButton disabled={!PLCIsConnected} />
          <ChangeSwitchTypeButton disabled={!PLCIsConnected} />
          <SetDASModeDialogButton disabled={!PLCIsConnected} />
        </CardActions>
      </Card>
    </div>
  );
};