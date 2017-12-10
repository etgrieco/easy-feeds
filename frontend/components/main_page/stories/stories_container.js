import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import StoriesIndex from './stories_index';
import { fetchSingleFeed } from '../../../actions/subscription_actions';
import { fetchUnsubscribedFeed, fetchLatest, readStory,
         unreadStory, fetchReads } from '../../../actions/story_actions';

const mapStateToProps = (state, ownProps) => {
  const storiesById = state.entities.stories.byId;
  const feeds = state.entities.feeds.byId;
  let stories;
  let title;
  let titleLink;
  let viewProp = {};

  if (ownProps.match.path === "/i/latest") {
    stories = state.session.latest.map(storyId => storiesById[storyId]);
    title = "Latest"
  } else if (ownProps.match.path === "/i/reads") {
    stories = state.session.reads.map(storyId => storiesById[storyId]);
    title = "Recently Read"
    viewProp = {readView: true };
  } else {
    const id = ownProps.match.params.id;
    const feed = feeds[id];

    if (feed) {
      stories = feed.stories.map(storyId => storiesById[storyId]);
      title = feed.subscription_title || feed.title;
      titleLink = feed.website_url;
    }

    if (ownProps.match.path.split('/')[2] === "discover") {
      viewProp = {previewView: true};
    }
  }

  return ({title, stories, feeds, titleLink, ...viewProp});
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const commonProps = {
    readStory: id => dispatch(readStory(id)),
    unreadStory: id => dispatch(unreadStory(id))
  };

  let fetchAction = () => {};
  if (ownProps.match.path === "/i/latest") {
    fetchAction = (_feedId, offset) => dispatch(fetchLatest(offset))
  } else if (ownProps.match.path === "/i/reads") {
    fetchAction = (_feedId, offset) => dispatch(fetchReads(offset))
  } else if (ownProps.match.path.split('/')[2] === "discover") {
    fetchAction = feedId => dispatch(fetchUnsubscribedFeed(feedId));
  } else {
    fetchAction = (feedId, offset) => dispatch(fetchSingleFeed(feedId, offset));
  }

  return ({...commonProps, fetchAction});
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps)(StoriesIndex));
