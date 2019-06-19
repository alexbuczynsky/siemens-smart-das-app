// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import { useStore } from '../../hooks';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { BreakerSetupObject } from '../../models';
import { ConfigureBreakerButton } from './ConfigureBreakerButton';

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%'
  },
  table: {
    minWidth: 650,
  },
}));

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export type BreakerListProps = {
  breakers: BreakerSetupObject[]
};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const BreakerList: React.FC<BreakerListProps> = props => {
  const classes = useStyles();

  const dasStatuses = useStore(state => state.breakers.DAS.status);
  const alarms = useStore(state => state.breakers.alarms);
  const activateCommands = useStore(state => state.breakers.DAS.activateCommands)


  type BreakerStatus = {
    isDASEnabled: boolean;
    isCOMAlarmActive: boolean;
    activateCommandState: boolean;
  }
  const getBreakerState = (id: number): BreakerStatus => {
    const status = {
      isDASEnabled: false,
      isCOMAlarmActive: false,
      activateCommandState: false,
    };

    switch (id) {
      case 1:
        status.isDASEnabled = dasStatuses.dasStatusBreaker1;
        status.isCOMAlarmActive = alarms.comAlarmBreaker1;
        status.activateCommandState = activateCommands.dasActivateBreaker1;
        break;
      case 2:
        status.isDASEnabled = dasStatuses.dasStatusBreaker2;
        status.isCOMAlarmActive = alarms.comAlarmBreaker2;
        status.activateCommandState = activateCommands.dasActivateBreaker2;
        break;
      case 3:
        status.isDASEnabled = dasStatuses.dasStatusBreaker3;
        status.isCOMAlarmActive = alarms.comAlarmBreaker3;
        status.activateCommandState = activateCommands.dasActivateBreaker3;
        break;
      case 4:
        status.isDASEnabled = dasStatuses.dasStatusBreaker4;
        status.isCOMAlarmActive = alarms.comAlarmBreaker4;
        status.activateCommandState = activateCommands.dasActivateBreaker4;
        break;
      case 5:
        status.isDASEnabled = dasStatuses.dasStatusBreaker5;
        status.isCOMAlarmActive = alarms.comAlarmBreaker5;
        status.activateCommandState = activateCommands.dasActivateBreaker5;
        break;
      case 6:
        status.isDASEnabled = dasStatuses.dasStatusBreaker6;
        status.isCOMAlarmActive = alarms.comAlarmBreaker6;
        status.activateCommandState = activateCommands.dasActivateBreaker6;
        break;
      case 7:
        status.isDASEnabled = dasStatuses.dasStatusBreaker7;
        status.isCOMAlarmActive = alarms.comAlarmBreaker7;
        status.activateCommandState = activateCommands.dasActivateBreaker7;
        break;
      case 8:
        status.isDASEnabled = dasStatuses.dasStatusBreaker8;
        status.isCOMAlarmActive = alarms.comAlarmBreaker8;
        status.activateCommandState = activateCommands.dasActivateBreaker8;
        break;
      case 9:
        status.isDASEnabled = dasStatuses.dasStatusBreaker9;
        status.isCOMAlarmActive = alarms.comAlarmBreaker9;
        status.activateCommandState = activateCommands.dasActivateBreaker9;
        break;
    }

    return status;
  }

  const renderTableRow = (breaker: BreakerSetupObject) => {
    const breakerState = getBreakerState(breaker.id);

    return (
      <TableRow key={breaker.id}>
        <TableCell align="left">{breaker.id}</TableCell>
        <TableCell align="left">{breaker.breakerTypeAsString}</TableCell>
        <TableCell align="left">{breakerState.isDASEnabled ? "ON" : "OFF"}</TableCell>
        <TableCell align="left">{breakerState.activateCommandState ? "ON" : "OFF"}</TableCell>
        <TableCell align="left">{breakerState.isCOMAlarmActive ? "Alarm Active" : "No Alarm"}</TableCell>
        <TableCell align="left">
          <ConfigureBreakerButton breaker={breaker} />
        </TableCell>
      </TableRow>
    )
  }





  return (
    <div className={classes.root}>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">Number</TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="left">DAS State</TableCell>
            <TableCell align="left">DAS Command State</TableCell>
            <TableCell align="left">Alarm</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.breakers.map(renderTableRow)}
        </TableBody>
      </Table>
    </div>
  );
};