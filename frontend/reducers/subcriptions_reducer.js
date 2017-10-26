import { RECEIVE_ALL_SUBSCRIPTIONS } from '../actions/subscription_actions';

const intitialState = {};
 //form: { feeds: {...}, subscriptions: {...} }

const receiveAllSubscriptions = (state = intitialState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ALL_SUBSCRIPTIONS:
      const newFeeds = Object.assign(action.feeds, action.subscriptions);
      const newState = Object.assign({}, state, newFeeds);
      return newState;
    default:
      return state;
  }
};
