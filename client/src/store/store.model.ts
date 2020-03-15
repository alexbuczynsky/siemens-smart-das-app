import { createStore, applyMiddleware } from 'redux';

// -------------------------------------------------------------------------
// Import Reducers
// -------------------------------------------------------------------------
import rootReducer from './reducers';

// -------------------------------------------------------------------------
// IMPORT MIDDLEWARE
// -------------------------------------------------------------------------
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

// -------------------------------------------------------------------------
// CONFIGURE MIDDLEWARE
// -------------------------------------------------------------------------

const reduxLoggerInstance = createLogger();

/**
 * Configure Redux Store
 *
 * @export
 * @returns
 */
export function configureStore() {

  // const rootEpic = combineEpics(epic1);

  // const epicMiddleware = createEpicMiddleware();

  const middleware: any = composeWithDevTools(applyMiddleware(
    reduxLoggerInstance,
    thunk,
  ));

  return createStore(
    rootReducer,
    undefined,
    middleware
  );
}

const store = configureStore();

store.dispatch({
  type: 'INITALIZE_APPLICATION' as any,
});


export type CustomStore = typeof store;
export type StoreState = ReturnType<CustomStore['getState']>;

export default store;
