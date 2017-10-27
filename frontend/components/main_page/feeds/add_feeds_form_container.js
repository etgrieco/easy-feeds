import { connect } from 'react-redux';
import { createFeed } from '../../../actions/subscription_actions';
import AddFeedForm from './add_feed_form';

const mapDispatchToProps = dispatch => {
  return ({
    createFeed: feed => dispatch(createFeed(feed))
  });
};


export default connect(null, mapDispatchToProps)(AddFeedForm);
