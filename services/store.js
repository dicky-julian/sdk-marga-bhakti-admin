import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../redux/reducers';

let store;

const initStore = (initialState) => {
  return createStore(
    reducers,
    initialState,
    applyMiddleware(thunk)
  )
}

const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState
    })

    store = undefined
  }

  if (typeof window === 'undefined') return _store;
  if (!store) store = _store;

  return _store;
}

const useStore = (initialState) => {
  const store = useMemo(() => initializeStore(initialState),
    [initialState]);
  return store;
}

export {
  initializeStore,
  useStore
}