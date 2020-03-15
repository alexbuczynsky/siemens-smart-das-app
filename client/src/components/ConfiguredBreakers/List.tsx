// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React from 'react';
// Material UI Imports
import { makeStyles, useTheme } from '@smartgear/edison';
import { Table, TableHead, TableRow, TableCell, TableBody, Chip, Avatar } from '@material-ui/core';
import { BreakerSetupObject } from '../../models';
import { ConfigureBreakerButton } from './ConfigureBreakerButton';
import { useBreakerStatuses } from '../../hooks/useBreakerStatus';
import { DASStatusChip } from '../DASStatusChip';
import WarningIcon from "@material-ui/icons/Warning"

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

const CommAlarmStatus: React.FC<{ isAlarmActive: boolean }> = props => {
  const theme = useTheme();

  const chipStyle: React.CSSProperties = {};

  const avatarStyle: React.CSSProperties = {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.warning.light,
  };

  if (props.isAlarmActive) {
    chipStyle.backgroundColor = theme.palette.warning.light;
  }
  return (
    <Chip
      avatar={props.isAlarmActive ? <Avatar style={avatarStyle}><WarningIcon /></Avatar> : undefined}
      label={props.isAlarmActive ? "Alarm Active" : "No Alarm"}
      style={chipStyle}
    />
  )
}

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
        <TableCell align="left">{<DASStatusChip isEnabled={breakerState.isDASEnabled} />}</TableCell>
        <TableCell align="left">{breakerState.activateCommandState ? "ON" : "OFF"}</TableCell>
        <TableCell align="left">{<CommAlarmStatus isAlarmActive={breakerState.isCOMAlarmActive} />}</TableCell>
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
            <TableCell align="left">Communication Alarm</TableCell>
            <TableCell align="left">Edit Breaker</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.breakers.map(renderTableRow)}
        </TableBody>
      </Table>
    </div>
  );
};