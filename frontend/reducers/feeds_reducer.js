import { RECEIVE_FEEDS_RESULTS } from '../actions/discovery_actions';
import
  { RECEIVE_ALL_SUBSCRIPTIONS, REMOVE_FEED,
  RECEIVE_NEW_FEED, RECEIVE_FEED }
from '../actions/subscription_actions';
import merge from 'lodash/merge';
import { combineReducers } from 'redux';

const feedsById = (state = {}, action) => {
  Object.freeze(state);
  let newState;

  switch (action.type) {
    case RECEIVE_FEEDS_RESULTS:
      newState = merge({}, state, action.feeds.byId);
      return newState;
    case RECEIVE_ALL_SUBSCRIPTIONS:
    case RECEIVE_FEED:
    case RECEIVE_NEW_FEED:
      newState = merge({}, state, action.feeds.byId, action.subscriptions.byId );
      return newState;
    default:
      return state;
  }
};

const allSubscriptions = (state = [], action) => {
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


const allFeedsResults = (state = [], action) => {
  Object.freeze(state);
  let newState;

  switch (action.type) {
    case RECEIVE_FEEDS_RESULTS:
      return action.results;
    default:
      return state;
  }
};

const feedsReducer = combineReducers({
  byId: feedsById,
  allSubIds: allSubscriptions,
  results: allFeedsResults
});

export default feedsReducer;
