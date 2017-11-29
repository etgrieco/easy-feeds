import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import StoriesIndex from './stories_index';
import { fetchSingleFeed } from '../../../actions/subscription_actions';
import { fetchUnsubscribedFeed, fetchLatest, readStory, unreadStory } from '../../../actions/story_actions';
import merge from 'lodash/merge';

const mapStateToProps = (state, ownProps) => {
  const storiesState = state.entities.stories.byId;
  const feeds = state.entities.feeds.byId;

  if (ownProps.match.path === "/i/latest") {
    const stories = state.session.latest.map(storyId => storiesState[storyId]);
    return ({ title: "Latest", stories, feeds });
  }

  const id = ownProps.match.params.id;

  let feed = feeds[id];

  const stories = feed.stories.map(storyId => storiesState[storyId]);
  const title = feed.subscription_title || feed.title;

  return ({title, stories, feeds, titleLink: feed.website_url});
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
