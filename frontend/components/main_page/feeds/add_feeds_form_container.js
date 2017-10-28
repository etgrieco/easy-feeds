import { connect } from 'react-redux';
import { createFeed } from '../../../actions/subscription_actions';
import AddFeedForm from './add_feed_form';
import { clearErrors } from '../../../actions/errors_actions';

const mapStateToProps = state => ({
  errors: state.errors.feeds,
  loadingMessages: state.loading.messages
});

const mapDispatchToProps = dispatch => ({
  createFeed: feed => dispatch(createFeed(feed)),
  clearErrors: () => dispatch(clearErrors())
});


export default connect(mapStateToProps, mapDispatchToProps)(AddFeedForm);
