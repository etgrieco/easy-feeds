import React from 'react';
import { connect } from 'react-redux';
import FeedsIndex from './feeds_index';
import { deleteFeed, updateFeed } from '../../../actions/subscription_actions';

const mapStateToProps = state => ({
  feeds: state.entities.feeds.byId,
  subFeedIds: state.session.subscriptions
});

const mapDispatchToProps = dispatch => ({
  deleteFeed: feed => dispatch(deleteFeed(feed)),
  updateFeed: feed => dispatch(updateFeed(feed)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)(FeedsIndex);
