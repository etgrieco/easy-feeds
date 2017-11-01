import { combineReducers } from 'redux';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { REMOVE_FEED, RECEIVE_NEW_FEED, RECEIVE_ALL_SUBSCRIPTIONS }
  from '../actions/subscription_actions';
import { RECEIVE_LATEST } from '../actions/story_actions';
import { CLEAR_ENTITIES } from '../actions/session_actions';
import merge from 'lodash/merge';

const userReducer = (state = null, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState = action.currentUser;
      return newState;
    default:
      return state;
  }
};

const subscriptionsReducer = (state = [], action) => {
  Object.freeze(state);
  let newState;
  let idx;
  switch (action.type) {
    case RECEIVE_ALL_SUBSCRIPTIONS:
      return action.feeds.allIds;
    case RECEIVE_NEW_FEED:
      const newFeedId = action.feed.allIds[0];
      return state.concat([newFeedId]);
    case REMOVE_FEED:
      idx = state.indexOf(action.feedId);
      newState = state.concat();
      idx > -1 ? newState.splice(idx, 1) : null;
      return newState;
    case CLEAR_ENTITIES:
      return [];
    default:
      return state;
  }
};

const latestStoriesReducer = (state = [], action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_LATEST:
      return action.stories.allIds;
    case CLEAR_ENTITIES:
      return [];
    default:
      return state;
  }
};


export default combineReducers({
  currentUser: userReducer,
  subscriptions: subscriptionsReducer,
  latest: latestStoriesReducer
});
