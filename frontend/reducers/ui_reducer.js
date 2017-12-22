import { combineReducers } from 'redux';
import { OPEN_POPOUT, CLOSE_POPOUT } from '../actions/popout_actions';
import { RECEIVE_FEED_TITLE } from '../actions/ui_actions';
import { CLEAR_ENTITIES } from '../actions/session_actions';
import {  RECEIVE_SINGLE_FEED } from '../actions/subscription_actions';
import { RECEIVE_LATEST } from '../actions/story_actions';

const storiesReducer = (state = true, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_SINGLE_FEED:
    case RECEIVE_LATEST:
      if (action.stories.length === 0) { return state; }
      return !(Object.keys(action.stories.byId).length === 0);
    default:
      return state;
  }
};

const feedTitleReducer = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_FEED_TITLE:
      return action.feedTitle;
    case CLEAR_ENTITIES:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  feedTitle: feedTitleReducer,
  moreStories: storiesReducer
});
