import { OPEN_POPOUT, CLOSE_POPOUT } from '../actions/popout_actions';
import merge from 'lodash/merge';

export default (state = { popOutIsOpen: false }, action) => {
  switch (action.type) {
    case OPEN_POPOUT:
      return merge({}, state, { popOutIsOpen: true });
    case CLOSE_POPOUT:
      return merge({}, state, { popOutIsOpen: false });
    default:
      return state;
  }
};
