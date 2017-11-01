import { OPEN_POPOUT, CLOSE_POPOUT } from '../actions/popout_actions';
import merge from 'lodash/merge';

export default (state = { component: null }, action) => {
  switch (action.type) {
    case OPEN_POPOUT:
    case CLOSE_POPOUT:
      return merge({}, state, { component: action.component });
    default:
      return state;
  }
};
