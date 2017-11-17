import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../actions/session_actions';
import SessionBar from './sessionbar';

const mapStateToProps = state => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    title: state.ui.feedTitle
  };
};

const mapDispatchToProps = dispatch => {
  return { logout: () => dispatch(logout()) };
};

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(SessionBar));
