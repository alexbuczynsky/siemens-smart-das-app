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

const useStyles = makeStyles((theme: any) => ({
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


  const getStatus = (id: number) => {
    switch (id) {
      case 1:
        return dasStatuses.dasStatusBreaker1;
      case 2:
        return dasStatuses.dasStatusBreaker2;
      case 3:
        return dasStatuses.dasStatusBreaker3;
      case 4:
        return dasStatuses.dasStatusBreaker4;
      case 5:
        return dasStatuses.dasStatusBreaker5;
      case 6:
        return dasStatuses.dasStatusBreaker6;
      case 7:
        return dasStatuses.dasStatusBreaker7;
      case 8:
        return dasStatuses.dasStatusBreaker8;
      case 9:
        return dasStatuses.dasStatusBreaker9;
      default:
        return null;
    }
  }

  const getAlarmStatus = (id: number) => {
    switch (id) {
      case 1:
        return alarms.comAlarmBreaker1;
      case 2:
        return alarms.comAlarmBreaker2;
      case 3:
        return alarms.comAlarmBreaker3;
      case 4:
        return alarms.comAlarmBreaker4;
      case 5:
        return alarms.comAlarmBreaker5;
      case 6:
        return alarms.comAlarmBreaker6;
      case 7:
        return alarms.comAlarmBreaker7;
      case 8:
        return alarms.comAlarmBreaker8;
      case 9:
        return alarms.comAlarmBreaker9;
      default:
        return null;
    }
  }

  return (
    <div className={classes.root}>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">Number</TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="left">DAS State</TableCell>
            <TableCell align="left">Alarm</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.breakers.map(breaker => (
            <TableRow key={breaker.id}>
              <TableCell align="left">
                {breaker.id}
              </TableCell>
              <TableCell align="left">{breaker.breakerTypeAsString}</TableCell>
              <TableCell align="left">{getStatus(breaker.id) ? "ON" : "OFF"}</TableCell>
              <TableCell align="left">{getAlarmStatus(breaker.id) ? "Alarm Active" : "No Alarm"}</TableCell>
              <TableCell align="left">
                <ConfigureBreakerButton breaker={breaker} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};