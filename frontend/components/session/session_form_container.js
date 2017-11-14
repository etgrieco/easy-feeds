import { connect } from 'react-redux';
import React from 'react';
import { signup, login } from '../../actions/session_actions';
import { clearSessionErrors } from '../../actions/errors_actions';
import { withRouter } from 'react-router-dom';
import SessionForm from './session_form';


const mapStateToProps = (state, ownProps) => {
  const formType = ownProps.location.pathname === '/signup' ? 'signup' : 'login';
  return {
    logged_in: Boolean(state.session.currentUser),
    errors: state.errors.session,
    formType
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const processForm = ownProps.location.pathname === '/signup' ? signup : login;
  return ({
   processForm: (credentials) => dispatch(processForm(credentials)),
   clearSessionErrors: () => dispatch(clearSessionErrors())
 });
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm));
