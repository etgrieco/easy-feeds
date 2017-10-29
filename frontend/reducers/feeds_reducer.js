import { RECEIVE_ALL_SUBSCRIPTIONS, REMOVE_FEED, RECEIVE_FEED }
  from '../actions/subscription_actions';
import merge from 'lodash/merge';
import { combineReducers } from 'redux';

const feedsById = (
  state = {},
  action) => {

  Object.freeze(state);
  let newState;
  let newFeeds;

  switch (action.type) {
    case RECEIVE_ALL_SUBSCRIPTIONS:
      newFeeds = merge({}, action.feeds, action.subscriptions );
      newState = merge({}, state, newFeeds);
      return newState;
    case REMOVE_FEED:
      newState = merge({}, state);
      delete newState[action.feedId];
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
      return state.concat(Object.keys(action.feeds));
    case REMOVE_FEED:
      let idx = state.indexOf(action.feedId);
      return idx > -1 ? state.concat([]).splice(idx, 1) : state;
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
      return Object.values(action.results);
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
