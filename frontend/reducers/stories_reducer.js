import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import { RECEIVE_ALL_SUBSCRIPTIONS, RECEIVE_FEED }
  from '../actions/subscription_actions';


const storiesById = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  let newStories;

  switch (action.type) {
    case RECEIVE_ALL_SUBSCRIPTIONS:
    case RECEIVE_FEED:
      newState = merge({}, state, action.stories.byId);
      return newState;
    default:
      return state;
  }
};

const allStories = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_SUBSCRIPTIONS:
    case RECEIVE_FEED:
      return action.stories.allIds;
    default:
      return state;
  }
};

export default combineReducers({
  byId: storiesById,
  allIds: allStories
});
