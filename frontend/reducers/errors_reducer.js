import { combineReducers } from 'redux';
import { CLEAR_ERRORS } from '../actions/errors_actions';

import { RECEIVE_CURRENT_USER,
  RECEIVE_SESSION_ERRORS} from '../actions/session_actions';
import { CLEAR_SESSION_ERRORS } from '../actions/errors_actions';

const intitialState = [];

//Session login/signup errors
const SessionErrorsReducer = (state = intitialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
    case CLEAR_SESSION_ERRORS:
    case CLEAR_ERRORS:
      return [];
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    default:
      return state;
  }
};

//Subscription/feed errors
import { RECEIVE_SUBSCRIPTION_ERRORS } from '../actions/subscription_actions';

const SubscriptionErrorsReducer = (state = intitialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SUBSCRIPTION_ERRORS:
      return action.errors;
    default:
      return state;
  }
};

export default combineReducers({
  session: SessionErrorsReducer,
  feeds: SubscriptionErrorsReducer
});
