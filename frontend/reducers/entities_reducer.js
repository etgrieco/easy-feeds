import { combineReducers } from 'redux';
import FeedsReducer from './feeds_reducer';

export default combineReducers({
  feeds: FeedsReducer
});
