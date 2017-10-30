import { RECEIVE_ALL_SUBSCRIPTIONS, REMOVE_FEED, RECEIVE_FEED }
  from '../actions/subscription_actions';
import merge from 'lodash/merge';
import { combineReducers } from 'redux';

const feedsById = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  let newFeeds;

  switch (action.type) {
    case RECEIVE_ALL_SUBSCRIPTIONS:
    case RECEIVE_FEEDS_RESULTS:
      newFeeds = merge({}, action.feeds.byId, action.subscriptions );
      newState = merge({}, state, newFeeds);
      return newState;
    case RECEIVE_FEED:
      newState = merge({}, state, action.feed, action.subscription);
      return newState;
    default:
      return state;
  }
};

const allSubscriptions = (state = [], action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_ALL_SUBSCRIPTIONS:
      // return Object.keys(action.subscriptions).map(key => parseInt(key));
      return action.feeds.allIds;
    case RECEIVE_FEED:
      // will receive directly
      const newSubFeedId = parseInt(Object.keys(action.subscription)[0]);
      return state.concat(newSubFeedId);
    case REMOVE_FEED:
      let idx = state.indexOf(action.feedId);
      newState = state.concat();
      idx > -1 ? newState.splice(idx, 1) : null;
      return newState;
    default:
      return state;
  }
};

import { RECEIVE_FEEDS_RESULTS } from '../actions/discovery_actions';

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
