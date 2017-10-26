import { RECEIVE_ALL_SUBSCRIPTIONS } from '../actions/subscription_actions';
import merge from 'lodash/merge';

const intitialState = {};
 // action.feeds: { feeds: {...}
 //action.subscriptions: { subscriptions: {...} }
 // state: { feeds: {..., subcription_id, subcription_title} }

const subscriptionsReducer = (state = intitialState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ALL_SUBSCRIPTIONS:
      const newFeeds = merge(action.feeds, action.subscriptions);
      const newState = merge({}, state, newFeeds);
      return newState;
    default:
      return state;
  }
};

export default subscriptionsReducer;
