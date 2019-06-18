// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------
import { createMsg, ActionMap, ActionMapActions } from '../tools/Messages';
import { CreateItem, RemoveItem, UpdateItem } from '../tools/ReduxArrayHelpers';
import { BreakerSetupObject } from '../../models';
// import { Task, TaskHelpers } from '../tools/RunningTaskHelpers';

// -------------------------------------------------------------------------
// DEFINE MODEL / ACTIONS / MESSAGES
// -------------------------------------------------------------------------

export enum BreakerActions {
  Update = 'Breakers/Update',
  UpdateAll = 'Breakers/UpdateAll',
  Add = 'Breakers/Add',
  Delete = 'Breakers/Delete',
  SetDASStatus = 'Breakers/SetDASStatus',
  SetDASActivateCommands = 'Breakers/SetDASActivateCommands',
  SetAlarms = 'Breakers/SetAlarms',
  SetPLCConnectionStatus = 'Breakers/SetPLCConnectionStatus',
}

export interface Messages {
  [BreakerActions.Add]: { Breaker: BreakerSetupObject };
  [BreakerActions.Delete]: { id: string };
  [BreakerActions.Update]: { Breaker: BreakerSetupObject };
  [BreakerActions.UpdateAll]: { Breakers: BreakerSetupObject[] };
  [BreakerActions.SetDASStatus]: { status: SmartDAS.Models.DASStatusPayload },
  [BreakerActions.SetDASActivateCommands]: { commands: SmartDAS.Models.DASActivatePayload }
  [BreakerActions.SetAlarms]: { alarms: SmartDAS.Models.BreakerAlarmPayload }
  [BreakerActions.SetPLCConnectionStatus]: { isConnected: boolean }

}

export const Msg = createMsg<Messages>();

export type ActionMap = ActionMap<Messages>;
export type Actions = ActionMapActions<Messages>;

// -------------------------------------------------------------------------
// DEFINE STATE MODEL
// -------------------------------------------------------------------------

interface BreakerState {
  isPLCConnected: boolean;
  List: BreakerSetupObject[];
  DAS: {
    status: SmartDAS.Models.DASStatusPayload,
    activateCommands: SmartDAS.Models.DASActivatePayload,
  },
  alarms: SmartDAS.Models.BreakerAlarmPayload,
}

const initialState: BreakerState = {
  isPLCConnected: false,
  List: [],
  DAS: {
    status: {
      dasStatusBreaker1: false,
      dasStatusBreaker2: false,
      dasStatusBreaker3: false,
      dasStatusBreaker4: false,
      dasStatusBreaker5: false,
      dasStatusBreaker6: false,
      dasStatusBreaker7: false,
      dasStatusBreaker8: false,
      dasStatusBreaker9: false,
    },
    activateCommands: {
      dasActivateBreaker1: false,
      dasActivateBreaker2: false,
      dasActivateBreaker3: false,
      dasActivateBreaker4: false,
      dasActivateBreaker5: false,
      dasActivateBreaker6: false,
      dasActivateBreaker7: false,
      dasActivateBreaker8: false,
      dasActivateBreaker9: false,
    },
  },
  alarms: {
    comAlarmBreaker1: true,
    comAlarmBreaker2: true,
    comAlarmBreaker3: true,
    comAlarmBreaker4: true,
    comAlarmBreaker5: true,
    comAlarmBreaker6: true,
    comAlarmBreaker7: true,
    comAlarmBreaker8: true,
    comAlarmBreaker9: true,
  }
};

// -------------------------------------------------------------------------
// HELPER FUNCTIONS
// -------------------------------------------------------------------------

const addBreaker = (state: BreakerState, model: BreakerSetupObject) => CreateItem(state.List, model);
const removeBreaker = (state: BreakerState, id: string) => RemoveItem(state.List, id, 'id');
const updateBreaker = (state: BreakerState, model: BreakerSetupObject) => UpdateItem(state.List, model, 'id');

// -------------------------------------------------------------------------
// REDUCER
// -------------------------------------------------------------------------

export const BreakerReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case BreakerActions.Update:
      state.List = state.List.map(x => {
        if (x.id === action.payload.Breaker.id) {
          x = action.payload.Breaker;
        }
        return x;
      });
      break;
    case BreakerActions.UpdateAll:
      state.List = action.payload.Breakers;
      // action.payload.Breakers.forEach(Breaker => addBreaker(state, Breaker));
      break;
    case BreakerActions.Add:
      state.List = addBreaker(state, action.payload.Breaker);
      break;
    case BreakerActions.Delete:
      state.List = removeBreaker(state, action.payload.id);
      break;

    case BreakerActions.SetDASStatus:
      state.DAS.status = action.payload.status;
      break;
    case BreakerActions.SetDASActivateCommands:
      state.DAS.activateCommands = action.payload.commands;
      break;
    case BreakerActions.SetAlarms:
      state.alarms = action.payload.alarms;
      break;
    case BreakerActions.SetPLCConnectionStatus:
      state.isPLCConnected = action.payload.isConnected;
      break;

    // // HANDLE FETCHING OF ALL BreakerS
    // case BreakerActions.FetchAll:
    //   TaskHelpers.startTask(state.FetchTasks.List);
    //   break;
    // case BreakerActions.FetchAllError:
    //   TaskHelpers.taskError(state.FetchTasks.List, action.payload.message);
    //   break;
    // case BreakerActions.FetchAllSuccess:
    //   TaskHelpers.taskSuccess(state.FetchTasks.List);
    //   break;
    default:
      return state;
  }

  return { ...state };
};

export default BreakerReducer;