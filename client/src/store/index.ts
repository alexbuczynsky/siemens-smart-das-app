import { RootState } from './reducers';
import { StoreContext as SymbolicStoreContext } from 'redux-react-hook';
import Store from './store.model';
import * as actions from './actions';

export * from './reducers';

export const StoreActions = actions;

export const StoreContext = SymbolicStoreContext as React.Context<RootState>;

export default Store;
