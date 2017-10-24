import { createStore, applyMiddleware } from 'redux';
import RootReducer from '../reducers/root_reducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const configureStore = (preLoadedState = {}) => {
  return createStore(
    RootReducer,
    preLoadedState,
    applyMiddleware(thunk, logger));
};

export default configureStore;
