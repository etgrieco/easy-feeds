import { connect } from 'react-redux';
import FeedsIndex from './feeds_index';
import { deleteFeed, updateSubscription } from '../../../actions/subscription_actions';

const mapStateToProps = state => ({
  feeds: state.entities.feeds.byId,
  subscriptionIds: state.session.subscriptions,
  currentUserId: state.session.currentUser.id,
  errors: state.errors.feeds
});

const mapDispatchToProps = dispatch => ({
  deleteFeed: feed => dispatch(deleteFeed(feed)),
  updateSubscription: subscription => dispatch(updateSubscription(subscription)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedsIndex);
