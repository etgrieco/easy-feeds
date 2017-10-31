import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StoriesIndex from './stories_index';
import { fetchFeed } from '../../actions/subscription_actions';
import { fetchLatest } from '../../actions/story_actions';

const mapStateToProps = (state, ownProps) => {
  let storyIds;
  let fetchType;
  switch (ownProps.match.path.split("/")[2]) {
    case "subscriptions":
      const feedId = ownProps.match.params.id;
      storyIds = state.entities.feeds[feedId].stories;
      fetchType = "SUBSCRIPTION";
      break;
    case "latest":
      storyIds = state.session.latest;
      fetchType = "LATEST";
      break;
    case "collections":
      fetchType = "COLLECTION";
      break;
    default:
      storyIds = [];
  }

  return ({
    fetchType,
    stories: state.entities.stories.byId,
    storyIds,
    feeds: state.entities.feeds.byId
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // const [fetchAction] = getFetchProps(ownProps.match.path);
  let fetchAction;
  switch (ownProps.match.path.split("/")[2]) {
    case "subscriptions":
      fetchAction = fetchFeed;
      break;
    case "latest":
      fetchAction = fetchLatest;
      break;
    case "collections":
      //
      break;
    default:
      fetchAction = null;
  }

  return ({
    fetchAction: (arg) => dispatch(fetchAction(arg))
  });
};

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(StoriesIndex));
