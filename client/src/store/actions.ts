import Store from './store.model';

import {
  Msg,
  NotificationActions,
  BreakerActions,
  NotificationLevel,
} from './reducers';

import { NewNotification, Notification } from './reducers/notification.reducer';
import { BreakerSetupObject } from '../models';
import { SmartDASClientService } from '../services/configured-services';

const dispatch = Store.dispatch;

interface PublishNotifOptions {
  title: string;
  message: string;
  meta?: NewNotification['meta'];
}

const publishNotification = (level: NotificationLevel) => (
  { title, message, meta }: PublishNotifOptions
) => {

  const newNotification = new Notification({
    level,
    message,
    title,
    meta,
  });

  dispatch(Msg(NotificationActions.Create, newNotification));

  return newNotification;
};

export const Notifications = {
  async publishError(options: PublishNotifOptions) {
    return publishNotification(NotificationLevel.Danger)(options);
  },
  async publishDanger(options: PublishNotifOptions) {
    return publishNotification(NotificationLevel.Danger)(options);
  },
  async publishInfo(options: PublishNotifOptions) {
    return publishNotification(NotificationLevel.Info)(options);
  },
  async publishSuccess(options: PublishNotifOptions) {
    return publishNotification(NotificationLevel.Success)(options);
  },
  async publishDebug(options: PublishNotifOptions) {
    return publishNotification(NotificationLevel.Debug)(options);
  },
  async publishWarning(options: PublishNotifOptions) {
    return publishNotification(NotificationLevel.Warning)(options);
  },
  async remove(id: Notification['id']) {
    dispatch(Msg(NotificationActions.Remove, {
      id,
    }));
  },
};


export const Breakers = {
  updateAll: (breakerConfigs: BreakerSetupObject[]) => {
    dispatch(Msg(BreakerActions.UpdateAll, {
      Breakers: breakerConfigs
    }))
  },
  updateOne: (breakerConfig: BreakerSetupObject) => {
    dispatch(Msg(BreakerActions.Update, {
      Breaker: breakerConfig
    }))
  },
  updateDASStatus: (status: SmartDAS.Models.DASStatusPayload) => {
    dispatch(Msg(BreakerActions.SetDASStatus, {
      status,
    }))
  },
  updateDASCommands: (commands: SmartDAS.Models.DASActivatePayload) => {
    dispatch(Msg(BreakerActions.SetDASActivateCommands, {
      commands,
    }))
  },
  updateAlarms: (alarms: SmartDAS.Models.BreakerAlarmPayload) => {
    dispatch(Msg(BreakerActions.SetAlarms, {
      alarms,
    }))
  },
  setPLCConnectionStatus: (isConnected: boolean) => {
    dispatch(Msg(BreakerActions.SetPLCConnectionStatus, {
      isConnected,
    }))
  }
}

export function TestPLCConnection() {
  return SmartDASClientService.getPLCConnectionStatus()
    .then(payload => {
      const isConnected = Store.getState().breakers.isPLCConnected;
      if (payload.code === 0) {
        if (isConnected === false) {
          Notifications.publishSuccess({
            title: 'PLC Connected',
            message: 'Connection established with PLC'
          })
          Breakers.setPLCConnectionStatus(true);
        }
      }

      else {
        if (isConnected === true) {
          Notifications.publishError({
            title: 'Cannot Connect to PLC',
            message: `${payload.message}, code: ${payload.code}`
          })
          Breakers.setPLCConnectionStatus(false);
        }
      }

      dispatch(Msg(BreakerActions.SetPLCConnectionState, {
        status: payload,
      }))
    })
}

export function setBackendConnectionStatus(connected: boolean) {
  dispatch(Msg(BreakerActions.SetBackendConnection, {
    isConnected: connected
  }))
}