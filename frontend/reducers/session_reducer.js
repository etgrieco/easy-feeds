import { combineReducers } from 'redux';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import
  { RECEIVE_ALL_SUBSCRIPTIONS, REMOVE_FEED,
  RECEIVE_NEW_FEED }
from '../actions/subscription_actions';

const subscriptionsReducer = (state = [], action) => {
  Object.freeze(state);
  let newState;
  let idx;
  switch (action.type) {
    case RECEIVE_ALL_SUBSCRIPTIONS:
      return action.feeds.allIds;
    case RECEIVE_NEW_FEED:
      const newFeedId = action.subscriptions.allIds[0];
      return state.concat([newFeedId]);
    case REMOVE_FEED:
      idx = state.indexOf(action.feedId);
      newState = state.concat();
      idx > -1 ? newState.splice(idx, 1) : null;
      return newState;
    default:
      return state;
  }
};

const userReducer = (state = null, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      const newState = Object.assign({}, state, { currentUser: action.currentUser });
      return newState;
    default:
      return state;
  }
};



export default combineReducers({
  currentUser: userReducer,
  subscriptions: subscriptionsReducer
});
