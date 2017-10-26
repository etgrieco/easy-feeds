import { combineReducers } from 'redux';
import SubscriptionsReducer from './subscriptions_reducer';

export default combineReducers({
  feeds: SubscriptionsReducer
});
