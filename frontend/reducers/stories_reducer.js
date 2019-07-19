import merge from 'lodash-es/merge';
import { combineReducers } from 'redux';
import { RECEIVE_SINGLE_FEED, RECEIVE_NEW_FEED } from '../actions/subscription_actions';
import { RECEIVE_LATEST, RECEIVE_STORY, RECEIVE_READS, RECEIVE_READ, RECEIVE_UNREAD } from '../actions/story_actions';
import { CLEAR_ENTITIES } from '../actions/session_actions';

const storiesById = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  let newStories;

  switch (action.type) {
    case RECEIVE_LATEST:
    case RECEIVE_SINGLE_FEED:
    case RECEIVE_NEW_FEED:
    case RECEIVE_STORY:
    case RECEIVE_READS:
    case RECEIVE_READ:
    case RECEIVE_UNREAD:
      newState = merge({}, state, action.stories.byId);
      return newState;
    case CLEAR_ENTITIES:
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  byId: storiesById,
});
