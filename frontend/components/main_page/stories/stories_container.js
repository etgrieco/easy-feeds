import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import StoriesIndex from './stories_index';
import { fetchSingleFeed } from '../../../actions/subscription_actions';
import { fetchUnsubscribedFeed, fetchLatest } from '../../../actions/story_actions';
import { receiveFeedTitle } from '../../../actions/ui_actions';


const mapStateToProps = (state, ownProps) => {
  const storiesState = state.entities.stories.byId;
  const feeds = state.entities.feeds.byId;

  if (ownProps.match.path === "/i/latest") {
    const stories = state.session.latest.map(storyId => storiesState[storyId]);

    return ({
      title: "Latest",
      stories,
      feeds,
    });
  }

  const id = ownProps.match.params.id;

  let feed = feeds[id];
  feed = (!feed || !feed.stories) ?
    {stories: [], subscription_title: ""} :
    feed;

  const stories = feed.stories.map(storyId => storiesState[storyId]);
  const title = feed.subscription_title || feed.title;

  return ({
    title,
    stories,
    feeds,
    titleLink: feed.website_url
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {

  if (ownProps.match.path === "/i/latest") {
    return ({
      fetchAction: (_feedId, offset) => dispatch(fetchLatest(offset)),
      receiveFeedTitle: title => dispatch(receiveFeedTitle(title))
    });
  }

  const fetchAction = ownProps.match.path.split('/')[2] === "discover" ?
    feedId => dispatch(fetchUnsubscribedFeed(feedId)) :
    (feedId, offset) => dispatch(fetchSingleFeed(feedId, offset));
  return ({
    fetchAction,
    receiveFeedTitle: title => dispatch(receiveFeedTitle(title))
  });
};

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(StoriesIndex));
