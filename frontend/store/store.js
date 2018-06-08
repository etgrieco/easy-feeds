import { createStore, applyMiddleware } from 'redux';
import RootReducer from '../reducers/root_reducer';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';

const middlewaresByEnvironment = {
  production: [thunk],
  development: [thunk, logger]
};

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const middlewares = middlewaresByEnvironment[env];

const configureStore = (preLoadedState = {}) => {
  return createStore(
    RootReducer,
    preLoadedState,
    applyMiddleware(...middlewares));
};

export default configureStore;
