import { connect } from 'react-redux';
import NavBar from './navbar';
import { fetchCurrentUser } from '../../actions/session_actions';

const mapStateToProps = state => {
  return ({
    feeds: state.entities.feeds.byId,
    feedIds: state.session.subscriptions
  });
};

const mapDispatchToProps = dispatch => {
  return ({
    fetchCurrentUser: () => dispatch(fetchCurrentUser())
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
