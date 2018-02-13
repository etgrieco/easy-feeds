import { connect } from 'react-redux';
import NavBar from './navbar';
import { fetchAllSubscriptions } from '../../actions/subscription_actions';

const mapStateToProps = state => ({
  feeds: state.entities.feeds.byId,
  feedIds: state.session.subscriptions
});

const mapDispatchToProps = dispatch => ({
  fetchAllSubscriptions: () => dispatch(fetchAllSubscriptions())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
