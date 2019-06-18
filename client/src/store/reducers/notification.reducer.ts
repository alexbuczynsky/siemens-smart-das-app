// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------
import { createMsg, ActionMap, ActionMapActions } from '../tools/Messages';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { CreateItem, RemoveItem, UpdateItem } from '../tools/ReduxArrayHelpers';

// -------------------------------------------------------------------------
// DEFINE MODEL / ACTIONS / MESSAGES
// -------------------------------------------------------------------------

export enum NotificationLevel {
  Debug,
  Info,
  Success,
  Warning,
  Danger,
}

interface NotificationMetaData {
  link?: string;
  persist?: boolean;
  autoHideDuration?: number;
  hideDate?: boolean;
  anchorOrigin?: {
    horizontal: 'left' | 'center' | 'right';
    vertical: 'top' | 'bottom';
  };
}

export interface NewNotification {
  /**
   * UUID of notification
   *
   * @type {string}
   * @memberof NewNotification
   */
  id?: string;
  title: string;
  message: string;
  level: NotificationLevel;
  meta?: NotificationMetaData;
}

class NotificationState {
  public createdAt: moment.Moment;
  public acknowledged: boolean;

  constructor() {
    this.acknowledged = false;
    this.createdAt = moment();
  }
}

// tslint:disable-next-line: max-classes-per-file
export class Notification {
  public meta: NotificationMetaData;

  constructor(options: NewNotification) {
    this.id = options.id || uuid();

    this.title = options.title;
    this.message = options.message;

    this.state = new NotificationState();
    this.level = options.level;
    this.meta = {
      ...options.meta,
    };
  }

  public toJSON() {
    return {
      ...this,
      levelVariant: this.levelVariant,
      autoHideDuration: this.autoHideDuration,
    };
  }

  get autoHideDuration() {
    return this.meta.autoHideDuration || 5000;
  }

  get levelVariant() {
    switch (this.level) {
      case NotificationLevel.Debug:
        return 'default';
      case NotificationLevel.Info:
        return 'info';
      case NotificationLevel.Success:
        return 'success';
      case NotificationLevel.Warning:
        return 'warning';
      case NotificationLevel.Danger:
        return 'error';
    }
  }
}

export interface Notification extends NewNotification {
  /**
   * UUID of notification
   *
   * @type {string}
   * @memberof NewNotification
   */
  id: string;
  state: NotificationState;
}

interface NotificationChangeRequest extends Partial<Notification> {
  id: string;
}

export enum NotificationActions {
  /**
   * Create a new notification
   */
  Create = 'Notifications/Created',
  /**
   * Change the state of a current notification
   */
  Update = 'Notifications/Update',
  /**
   * Remove an existing notification
   */
  Remove = 'Notifications/Remove',
  /**
   * Remove all notifications
   */
  RemoveAll = 'Notificaiton/RemoveAll',
}

export interface Messages {
  [NotificationActions.Create]: NewNotification;
  [NotificationActions.Update]: NotificationChangeRequest;
  [NotificationActions.Remove]: { id: Notification['id'] };
  [NotificationActions.RemoveAll]: undefined;
}

export const Msg = createMsg<Messages>();

export type ActionMap = ActionMap<Messages>;
export type Actions = ActionMapActions<Messages>;

// -------------------------------------------------------------------------
// DEFINE STATE MODEL
// -------------------------------------------------------------------------

interface NotificationsState {
  queue: Notification[];
  stored: Notification[];
}

const initialState: NotificationsState = {
  queue: [],
  stored: [],
};

// -------------------------------------------------------------------------
// HELPER FUNCTIONS
// -------------------------------------------------------------------------

/**
 * Finds a notifcation
 *
 * @param {NotificationsState} state
 */
const findNotification = (state: NotificationsState) => (id: string) => {
  const index = state.queue.findIndex(x => x.id === id);

  if (index === -1) {
    return {
      doesExist: false,
      index: -1,
    } as const;
  } else {
    return {
      doesExist: true,
      index,
    } as const;
  }
};

/**
 * Adds a notification to queue
 *
 * @param {NotificationsState} state
 */
const createNotification = (state: NotificationsState) => (newNotification: NewNotification) => {
  state.queue = CreateItem(state.queue, new Notification(newNotification));
};

/**
 * Removes a notification
 *
 * @param {NotificationsState} state
 */
const removeNotification = (state: NotificationsState) => (id: string) => {
  state.queue = RemoveItem(state.queue, id, 'id');
};

/**
 * Updates a notification if it exists
 *
 * @param {NotificationsState} state
 */
const updateNotification = (state: NotificationsState) => (newProps: NotificationChangeRequest) => {
  state.queue = UpdateItem(state.queue, newProps, 'id');
};

// -------------------------------------------------------------------------
// REDUCER
// -------------------------------------------------------------------------

export const notificationReducer = (state = initialState, action: Actions) => {

  switch (action.type) {
    case NotificationActions.Create:
      createNotification(state)(action.payload);
      break;
    case NotificationActions.Remove:
      removeNotification(state)(action.payload.id);
      break;
    case NotificationActions.Update:
      updateNotification(state)(action.payload);
      break;

    case NotificationActions.RemoveAll:
      state.queue = [];
      break;
    default:
      return state;
  }
  return { ...state };
};

export default notificationReducer;
