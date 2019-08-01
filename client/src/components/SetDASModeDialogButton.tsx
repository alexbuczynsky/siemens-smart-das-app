// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React, { useState, useEffect } from "react";
// Material UI Imports
import { makeStyles } from "@smartgear/edison";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Badge,
  Chip,
  Typography,
  Divider
} from "@material-ui/core";
import { AsyncSaveButton } from "./AsyncSaveButton";
import { useStore } from "../hooks";
import { SmartDASClientService } from "../services/configured-services";
import { StoreActions } from "../store";
import { BreakerSetupObject } from "../models";
import { ButtonProps } from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { useBreakerStatuses } from "../hooks/useBreakerStatus";
import { DASStatusChip } from "./DASStatusChip";

// ---------------------------------------  ----------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100%"
  },
  list: {
    minWidth: "500px"
  },
  dastStatusIndicatorContainer: {
    flex: "1 1 auto"
  },
  dasStatusIndicator: {
    margin: "auto"
  }
}));

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export interface SetDASModeDialogButtonProps extends ButtonProps { }

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const SetDASModeDialogButton: React.FC<
  SetDASModeDialogButtonProps
> = props => {
  const classes = useStyles();

  const breakers = useStore(state => state.breakers.List);
  const activateCommands = useStore(
    state => state.breakers.DAS.activateCommands
  );
  const breakerStatuses = useBreakerStatuses();
  const StoreSiteSwitchType = useStore(state => state.breakers.switchType);

  const [open, setOpen] = useState(false);

  const [switchType, setSwitchType] = useState(StoreSiteSwitchType);

  useEffect(() => {
    setSwitchType(StoreSiteSwitchType);
  }, [StoreSiteSwitchType]);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function handleSave() {
    try {
      const siteSetupStructure = BreakerSetupObject.ConvertToSiteSetupStructure(
        breakers,
        switchType
      );
      const payload = await SmartDASClientService.setSiteSetupStructure(
        siteSetupStructure
      );

      StoreActions.Breakers.setSwitchType(payload.switchType);
    } catch (err) {
      StoreActions.Notifications.publishError({
        title: `Switch Type Failed updating`,
        message: err.message
      });

      return {
        isSuccess: false
      };
    }

    return {
      isSuccess: true
    };
  }

  function renderListItem(breaker: BreakerSetupObject) {
    const breakerState = breakerStatuses.find(x => x.breakerId === breaker.id);

    if (breakerState === undefined) {
      return null;
    }

    const handleToggle = async () => {
      const id = breaker.id;
      (activateCommands as any)[
        `dasActivateBreaker${id}`
      ] = !breakerState.activateCommandState;
      try {
        const payload = await SmartDASClientService.setDASActiveCommands(
          activateCommands
        );
        StoreActions.Breakers.updateDASCommands(payload);
      } catch (e) { }
    };

    const isCOMAlarmActive = breakerState.isCOMAlarmActive;
    const isDASEnabled = breakerState.isDASEnabled;

    return (
      <ListItem key={breaker.id}>
        <ListItemText primary={`Breaker ${breaker.id}`} />
        <DASStatusChip isEnabled={breakerState.isDASEnabled} />

        <Button disabled={isCOMAlarmActive} variant="contained" color="primary" onClick={handleToggle}>
          {isCOMAlarmActive ? "Breaker Not Connected" : isDASEnabled ? "Turn off DAS" : "Turn on DAS"}
        </Button>
      </ListItem>
    );
  }

  return (
    <div>
      <Button
        {...props}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Set Breaker DAS Modes
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Set Breaker DAS Modes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modify the DAS state by using the interface below. To enable /
            disable DAS mode press the button on the right next to the breaker
            you are testing.
          </DialogContentText>
          <List dense className={classes.list}>
            {breakers.map(renderListItem)}
          </List>
          <DialogContentText>
            <Divider style={{ marginBottom: '5px' }} />
            <Typography variant="h4">WARNING: THIS FEATURE IS NOT MEANT FOR PRODUCTION USE</Typography>
            This tool is designed to test the DAS functionality of breakers before the SmartDAS unit
            is deployed in a production environment. It should not be used to control breaker DAS state
            once the switchboard / switchgear is deployed and is in operation.
            <br />
            Use of this software in any other context is at your own risk.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
