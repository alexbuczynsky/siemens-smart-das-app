// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React from 'react';
// Material UI Imports
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import SuccessIcon from '@material-ui/icons/CheckCircleOutline';

import { Notification, NotificationLevel } from '../../store/reducers/notification.reducer';

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

import { useNotificationStyles } from './style';
import clsx from 'clsx';

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export interface NotificationIconProps {
  level: Notification['level'];
}

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const NotificationIcon: React.FC<NotificationIconProps> = props => {
  const classes = useNotificationStyles();
  const className = classes.icon;
  switch (props.level) {
    case NotificationLevel.Debug:
      return <InfoIcon className={clsx(className, classes.debugIcon)} />;
    case NotificationLevel.Info:
      return <InfoIcon className={clsx(className, classes.infoIcon)} />;
    case NotificationLevel.Success:
      return <SuccessIcon className={clsx(className, classes.successIcon)} />;
    case NotificationLevel.Warning:
      return <WarningIcon className={clsx(className, classes.warningIcon)} />;
    case NotificationLevel.Danger:
      return <ErrorIcon className={clsx(className, classes.errorIcon)} />;
  }
};
