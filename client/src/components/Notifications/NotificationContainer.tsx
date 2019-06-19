// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React, { useEffect } from 'react';
// Material UI Imports
import { useNotificationStyles } from './style';
import { useSnackbar } from 'notistack';
import useStore from '../../hooks/useStore';
import { NotificationLevel } from '../../store/reducers/notification.reducer';
import clsx from 'clsx';
import { StoreActions } from '../../store';
import { SnackbarContent } from '@material-ui/core';
import { NotificationContent } from './NotificationContent';

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export interface NotificationContainerProps { }

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const NotificationContainer: React.FC<NotificationContainerProps> = props => {
  const classes = useNotificationStyles();
  const notifications = useStore(state => state.notifications.queue);
  const snacks = useSnackbar();

  useEffect(() => {
    notifications.map(notification => {

      let className = classes.notificationWrapper;

      switch (notification.level) {
        case NotificationLevel.Debug:
          className = clsx(className, classes.notificationWrapperDebug);
          break;
        case NotificationLevel.Info:
          className = clsx(className, classes.notificationWrapperInfo);
          break;
        case NotificationLevel.Success:
          className = clsx(className, classes.notificationWrapperSuccess);
          break;
        case NotificationLevel.Warning:
          className = clsx(className, classes.notificationWrapperWarning);
          break;
        case NotificationLevel.Danger:
          className = clsx(className, classes.notificationWrapperError);
          break;
      }

      const anchorOrigin = notification.meta.anchorOrigin || {
        vertical: 'top',
        horizontal: 'right',
      };

      snacks.enqueueSnackbar(notification.id, {
        autoHideDuration: notification.autoHideDuration,
        preventDuplicate: true,
        persist: notification.meta.persist,
        key: notification.id,
        anchorOrigin,
        onClose: () => {
          StoreActions.Notifications.remove(notification.id);
        },
        children: () => (
          <SnackbarContent
            className={className}
            message={
              <NotificationContent {...notification} />
            }
          />
        ),
      });
    });
  }, [notifications.length]);

  return <div />;
};
