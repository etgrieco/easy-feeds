import { combineReducers } from 'redux';
import FeedsReducer from './feeds_reducer';
import StoriesReducer from './stories_reducer';

export default combineReducers({
  feeds: FeedsReducer,
  stories: StoriesReducer
});
