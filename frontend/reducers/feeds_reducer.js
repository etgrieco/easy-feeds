import { RECEIVE_FEEDS_RESULTS } from '../actions/discovery_actions';
import { REMOVE_FEED, RECEIVE_NEW_FEED, RECEIVE_SINGLE_FEED, RECEIVE_ALL_SUBSCRIPTIONS }
  from '../actions/subscription_actions';
import { CLEAR_ENTITIES, RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_LATEST, RECEIVE_STORY } from '../actions/story_actions';
import merge from 'lodash/merge';
import { combineReducers } from 'redux';

const feedsById = (state = { byId: {} }, action) => {
  Object.freeze(state);
  let newState;

  switch (action.type) {
    case RECEIVE_FEEDS_RESULTS:
      newState = merge({}, state, action.feeds.byId);
      return newState;
    case RECEIVE_SINGLE_FEED:
    case RECEIVE_LATEST:
    case RECEIVE_NEW_FEED:
    case RECEIVE_ALL_SUBSCRIPTIONS:
    case RECEIVE_STORY:
      newState = merge({}, state, action.feeds.byId, action.subscriptions.byId);
      return newState;
    case CLEAR_ENTITIES:
      return {};
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
    case CLEAR_ENTITIES:
      return [];
    default:
      return state;
  }
};

const feedsReducer = combineReducers({
  byId: feedsById,
  results: allFeedsResults
});

export default feedsReducer;
