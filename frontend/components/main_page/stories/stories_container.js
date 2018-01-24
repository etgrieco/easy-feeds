import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import StoriesIndex from './stories_index';
import { fetchSingleFeed } from '../../../actions/subscription_actions';
import { fetchUnsubscribedFeed, fetchLatest, readStory,
         unreadStory, fetchReads } from '../../../actions/story_actions';

const mapStateToProps = (state, ownProps) => {
  const feeds = state.entities.feeds.byId;
  const id = ownProps.match.params.id;
  const feed = feeds[id] || {stories: []};
  feed.title = feed ? (feed.subscription_title || feed.title) : ""
  feed.titleLink = feed ? feed.website_url : null;

  const path = ownProps.match.path.split('/')[2];

  const pathProps = {
    latest: {title: "Latest"},
    reads: {title: "Recently Read", readView: true},
    discover: {...feed, previewView: true},
    subscriptions: {...feed}
  };

  const storyIds = {
    latest: state.session.latest,
    reads: state.session.reads,
    discover: feed.stories,
    subscriptions: feed.stories
  }
  const storiesById = state.entities.stories.byId;
  const stories = storyIds[path].map(storyId => storiesById[storyId]);

  return ({
    feeds,
    ...pathProps[path],
    stories,
    moreStories: state.ui.moreStories
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const fetchActions = {
    latest: (_id, offset) => dispatch(fetchLatest(offset)),
    reads: (_id, offset) => dispatch(fetchReads(offset)),
    discover: id => dispatch(fetchUnsubscribedFeed(id)),
    subscriptions: (id, offset) => dispatch(fetchSingleFeed(id, offset))
  };

  const path = ownProps.match.path.split('/')[2];
  const fetchAction = fetchActions[path];

  return {
    readStory: id => dispatch(readStory(id)),
    unreadStory: id => dispatch(unreadStory(id)),
    fetchAction
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps)(StoriesIndex));
