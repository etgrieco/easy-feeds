import { connect } from 'react-redux';
import { createFeed } from '../../../actions/subscription_actions';
import AddFeedForm from './add_feed_form';

const mapDispatchToProps = dispatch => ({
  createFeed: (feed) => dispatch(createFeed)
});

export default connect(null, mapDispatchToProps)(AddFeedForm);
