import { OPEN_POPOUT, CLOSE_POPOUT } from '../actions/popout_actions';
import { RECEIVE_FEED_TITLE } from '../actions/ui_actions';
import merge from 'lodash/merge';

export default (state = { component: null, feedTitle: null }, action) => {
  switch (action.type) {
    case RECEIVE_FEED_TITLE:
      return merge({}, state, { feedTitle: action.feedTitle });
    case OPEN_POPOUT:
    case CLOSE_POPOUT:
      return merge({}, state, { component: action.component });
    default:
      return state;
  }
};
