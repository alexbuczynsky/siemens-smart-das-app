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
import { useBreakerStatuses } from '../../hooks/useBreakerStatus';

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

  const breakerStatuses = useBreakerStatuses();

  const renderTableRow = (breaker: BreakerSetupObject) => {
    const breakerState = breakerStatuses.find(x => x.breakerId === breaker.id);

    if (breakerState === undefined) {
      return null;
    }

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