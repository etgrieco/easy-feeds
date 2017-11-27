import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchFeedResults } from '../../../actions/discovery_actions';
import { createFeed, deleteFeed } from '../../../actions/subscription_actions';
import { openPopOut } from '../../../actions/popout_actions';
import { clearErrors } from '../../../actions/errors_actions';
import { fetchUnsubscribedFeed } from '../../../actions/story_actions';
import { receiveFeedTitle } from '../../../actions/ui_actions';
import DiscoverSearchIndex from './discover_search_index';

const mapStateToProps = state => {
  return ({
    feeds: state.entities.feeds
  });
};

const mapDispatchToProps = dispatch => {
  return ({
    fetchFeedResults: query => dispatch(fetchFeedResults(query)),
    createFeed: feed => dispatch(createFeed(feed)),
    openPopOut: component => dispatch(openPopOut(component)),
    fetchUnsubscribedFeed: feedId => dispatch(fetchUnsubscribedFeed(feedId)),
    clearErrors: () => dispatch(clearErrors()),
    deleteFeed: feed => dispatch(deleteFeed(feed)),
    receiveFeedTitle: title => dispatch(receiveFeedTitle(title))
  });
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscoverSearchIndex));
