// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React from 'react';
// Material UI Imports
import Typography from '@material-ui/core/Typography';

import { Notification } from '../../store/reducers/notification.reducer';
import { useSnackbar } from 'notistack';
import { StoreActions } from '../../store';
import { NotificationIcon } from './Icon';

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

import { useNotificationStyles } from './style';
import { Button } from '@material-ui/core';

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export interface NotificationContentProps {
  id: Notification['id'];
  message: Notification['message'];
  title: Notification['title'];
  level: Notification['level'];
  state: Notification['state'];
  meta: Notification['meta'];
}

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const NotificationContent: React.FC<NotificationContentProps> = props => {
  const classes = useNotificationStyles();
  const snacks = useSnackbar();

  const handleClose = () => {
    StoreActions.Notifications.remove(props.id);
    snacks.closeSnackbar(props.id);
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <NotificationIcon level={props.level} />
        <Typography variant='subtitle1' color='inherit' >
          {props.title}
        </Typography>
      </div>
      <div className={classes.message} >
        {props.message.split('\n').map(messageLine => (
          <Typography variant='body1' color='inherit' >
            {messageLine}
          </Typography>
        ))}
        {!props.meta.hideDate && <Typography variant='caption' color='inherit' >
          {props.state.createdAt.format('LLL')}
        </Typography>}

      </div>
      <div className={classes.actions} >
        <Button variant='outlined' onClick={handleClose}>
          {'Dismiss'}
        </Button>
      </div>
    </div>
  );
};
