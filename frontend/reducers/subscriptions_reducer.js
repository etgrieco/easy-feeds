import { RECEIVE_ALL_SUBSCRIPTIONS, REMOVE_FEED, EDIT_FEED }
  from '../actions/subscription_actions';
import merge from 'lodash/merge';
import { combineReducers } from 'redux';

const subscriptionsById = (state = {}, action) => {
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
    case EDIT_FEED:
      newState = merge({}, state, action.subscription);
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






const subscriptionsReducer = combineReducers({
  byId: subscriptionsById,
  allIds: allSubscriptions
});

// const intitialState = {};
//  // action.feeds: { feeds: {...}
//  //action.subscriptions: { subscriptions: {...} }
//  // state: { feeds: {..., subcription_id, subcription_title} }
//
// const subscriptionsReducer = (state = intitialState, action) => {
//   Object.freeze(state);
//
//   switch (action.type) {
//     case RECEIVE_ALL_SUBSCRIPTIONS:
//       const newFeeds = merge(action.feeds, action.subscriptions);
//       const newState = merge({}, state, newFeeds);
//       return newState;
//     default:
//       return state;
//   }
// };
//
export default subscriptionsReducer;
