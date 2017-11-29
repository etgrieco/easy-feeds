import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import StoriesIndex from './stories_index';
import { fetchSingleFeed } from '../../../actions/subscription_actions';
import { fetchUnsubscribedFeed, fetchLatest, readStory,
         unreadStory, fetchReads } from '../../../actions/story_actions';
import merge from 'lodash/merge';

const mapStateToProps = (state, ownProps) => {
  const storiesById = state.entities.stories.byId;
  const feeds = state.entities.feeds.byId;

  if (ownProps.match.path === "/i/latest") {
    const stories = state.session.latest.map(storyId => storiesById[storyId]);
    return ({ title: "Latest", stories, feeds });
  } else if (ownProps.match.path === "/i/reads") {
    const stories = state.session.reads.map(storyId => storiesById[storyId]);
    return ({ title: "Recently Read", stories, feeds });
  }

  const id = ownProps.match.params.id;
  const feed = feeds[id];
  let stories;
  let title;
  let titleLink;

  if (feed) {
    stories = feed.stories.map(storyId => storiesById[storyId]);
    title = feed.subscription_title || feed.title;
    titleLink = feed.website_url;
  }

  return ({title, stories, feeds, titleLink});
};

const mapDispatchToProps = (dispatch, ownProps) => {

  const commonProps = {
    readStory: id => dispatch(readStory(id)),
    unreadStory: id => dispatch(unreadStory(id))
  };

  if (ownProps.match.path === "/i/latest") {
    return merge(commonProps, {
      fetchAction: (_feedId, offset) => dispatch(fetchLatest(offset)),
     });
  } else if (ownProps.match.path === "/i/reads") {
    return merge(commonProps, {
      fetchAction: () => dispatch(fetchReads())
    });
  }

  const fetchAction = ownProps.match.path.split('/')[2] === "discover" ?
    feedId => dispatch(fetchUnsubscribedFeed(feedId)) :
    (feedId, offset) => dispatch(fetchSingleFeed(feedId, offset));

  return merge(commonProps, {
    fetchAction,
  });
};

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(StoriesIndex));
