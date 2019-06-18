// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React, { useState } from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import { Card, CardHeader, CardContent, CardActions, Button } from '@material-ui/core';
import { WiringWizardDialog } from './WiringWizard/WiringWizardDialog';
import { ChangeAllBreakerIPButton } from './ChangeAllBreakerIPButton';

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

export type ToolsCardProps = {};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const ToolsCard: React.FC<ToolsCardProps> = props => {
  const classes = useStyles();

  const [isWiringWizardOpen, setWiringWizardIsOpen] = useState(false);


  return (
    <div className={classes.root}>
      <WiringWizardDialog isOpen={isWiringWizardOpen} onClose={() => setWiringWizardIsOpen(false)} />
      <Card>
        <CardHeader title="Tools"></CardHeader>
        <CardActions>
          <Button
            onClick={() => setWiringWizardIsOpen(true)}
            variant="contained"
            color="primary"
          >Wiring Wizard</Button>
          <ChangeAllBreakerIPButton />
        </CardActions>
      </Card>
    </div>
  );
};