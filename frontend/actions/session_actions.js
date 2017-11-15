import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_ENTITIES = 'CLEAR_ENTITIES';

export const receiveCurrentUser = user => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser: user
  };
};

export const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const clearEntities = () => ({
  type: CLEAR_ENTITIES
});

export const login = user => dispatch => (
  SessionApiUtil.login(user)
    .then(loggedInUser => dispatch(receiveCurrentUser(loggedInUser)),
    errors => dispatch(receiveSessionErrors(errors.responseJSON))
  )
);

export const signup = user => dispatch => (
  SessionApiUtil.signup(user)
    .then(signedUpUser => dispatch(receiveCurrentUser(signedUpUser)),
    errors => dispatch(receiveSessionErrors(errors.responseJSON)))
);

export const createDemoUser = () => dispatch => (
  SessionApiUtil.createDemoUser()
    .then(signedUpUser => dispatch(receiveCurrentUser(signedUpUser)),
    errors => dispatch(receiveSessionErrors(errors.responseJSON)))
);

export const logout = () => dispatch => {
  return SessionApiUtil.logout()
    .then(() => {
      dispatch(receiveCurrentUser(null));
      dispatch(clearEntities());
    },
    errors => dispatch(receiveSessionErrors(errors.responseJSON))
  );
};
