import { connect } from 'react-redux';
import React from 'react';
import FeedsIndex from './feeds_index';
import { subscribedFeeds } from '../../../reducers/selectors';
import { fetchAllSubscriptions, deleteFeed, updateFeed }
        from '../../../actions/subscription_actions';

const mapStateToProps = state => ({
  feeds: Object.values(state.entities.feeds.byId)
});

const mapDispatchToProps = dispatch => ({
  deleteFeed: feed => dispatch(deleteFeed(feed)),
  fetchAllSubscriptions: () => dispatch(fetchAllSubscriptions()),
  updateFeed: (feed) => dispatch(updateFeed(feed))
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedsIndex);
