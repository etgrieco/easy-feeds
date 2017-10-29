import React from 'react';
import { connect } from 'react-redux';
import { fetchFeedResults } from '../../../actions/discovery_actions';
import { createFeed } from '../../../actions/subscription_actions';
import DiscoverSearchIndex from './discover_search_index';

const mapStateToProps = state => {
  return ({
    feeds: state.entities.feeds
  });
};

const mapDispatchToProps = dispatch => {
  return ({
    fetchFeedResults: query => dispatch(fetchFeedResults(query)),
    createFeed: feed => dispatch(createFeed(feed))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscoverSearchIndex);
