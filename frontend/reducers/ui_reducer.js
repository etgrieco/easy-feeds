import { OPEN_POPOUT, CLOSE_POPOUT } from '../actions/popout_actions';
import { RECEIVE_FEED_TITLE } from '../actions/ui_actions';
import { CLEAR_ENTITIES } from '../actions/session_actions';
import merge from 'lodash/merge';

export default (state = { feedTitle: null }, action) => {
  switch (action.type) {
    case RECEIVE_FEED_TITLE:
      return merge({}, state, { feedTitle: action.feedTitle });
    case CLEAR_ENTITIES:
      return { feedTitle: null };
    default:
      return state;
  }
};
