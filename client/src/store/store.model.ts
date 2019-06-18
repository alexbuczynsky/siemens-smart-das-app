import { createStore, applyMiddleware } from 'redux';

// import { of } from 'rxjs';
// import { delay } from 'rxjs/operators';

// -------------------------------------------------------------------------
// Import Reducers
// -------------------------------------------------------------------------
import rootReducer from './reducers';

// const epic1 = () => of({ type: 'SET_NAME', payload: 'Sally' }).pipe(delay(2000));

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
  type: 'INITALIZE_APPLICATION',
});

export type StoreState = ReturnType<typeof store.getState>;
export type CustomStore = typeof store;

export default store;
