import { combineReducers } from 'redux';
import NotificationReducer, { Messages as NotificationMessages } from './notification.reducer';
import BreakerReducer, { Messages as BreakerMessages } from './breakers.reducer';
import { createMsg } from '../tools/Messages';

export {
  NotificationActions,
  NotificationLevel,
} from './notification.reducer';
export { BreakerActions } from './breakers.reducer';

interface Message extends NotificationMessages, BreakerMessages { }

export const Msg = createMsg<Message>();

const rootReducer = combineReducers({
  breakers: BreakerReducer,
  notifications: NotificationReducer,
});

export type RootReducer = typeof rootReducer;

export type RootState = ReturnType<RootReducer>;

export default rootReducer;
