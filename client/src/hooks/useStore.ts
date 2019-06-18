import { useMappedState, StoreContext } from 'redux-react-hook';
import { RootState } from '../store/reducers';
import { useCallback } from 'react';
import { useThrottle } from './useThrottle';

export function useStore<TResult>(
  mapState: (state: RootState) => TResult,
  options?: {
    throttle?: number
  }
): TResult {

  const target = useMappedState(useCallback(
    mapState,
    []
  ));

  let throttleValue = 20;

  if (options) {
    if (options.throttle) {
      throttleValue = options.throttle;
    }
  }

  return useThrottle(target, throttleValue);;
}

export default useStore;
