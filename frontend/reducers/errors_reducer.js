import { combineReducers } from 'redux';
import { CLEAR_ERRORS } from '../actions/errors_actions';
import { RECEIVE_CURRENT_USER,
  RECEIVE_SESSION_ERRORS } from '../actions/session_actions';
import { CLEAR_SESSION_ERRORS } from '../actions/errors_actions';
import merge from 'lodash-es/merge';

const SessionErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
    case CLEAR_SESSION_ERRORS:
    case CLEAR_ERRORS:
      return [];
    case RECEIVE_SESSION_ERRORS:
      return action.errors ? action.errors : state;
    default:
      return state;
  }
};

import { RECEIVE_SUBSCRIPTION_ERRORS, RECEIVE_SINGLE_FEED, REMOVE_FEED }
  from '../actions/subscription_actions';

const SubscriptionErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SUBSCRIPTION_ERRORS:
      return action.errors ? action.errors : state;
    case CLEAR_ERRORS:
    case RECEIVE_SINGLE_FEED:
    case REMOVE_FEED:
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  session: SessionErrorsReducer,
  feeds: SubscriptionErrorsReducer
});
