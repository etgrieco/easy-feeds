import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import { RECEIVE_SINGLE_FEED } from '../actions/subscription_actions';
import { RECEIVE_LATEST } from '../actions/story_actions';
import { CLEAR_ENTITIES } from '../actions/session_actions';

const storiesById = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  let newStories;

  switch (action.type) {
    case RECEIVE_LATEST:
    case RECEIVE_SINGLE_FEED:
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
