import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StoriesIndex from './stories_index';
import { fetchAllSubscriptions, fetchFeed }
  from '../../actions/subscription_actions';

const getFetchInfo = (path) => {
  switch (path.split("/")[2]) {
    case "subscriptions":
      return ["FEED", fetchFeed];
    case "collections":
      // return ["COLLECTIONS", fetchCollection];
    case "latest":
      return ["ALL", fetchAllSubscriptions];
    default:
      return ["ALL", fetchAllSubscriptions];
  }
};

const mapStateToProps = (state, ownProps) => {
  return ({
    storyIds: state.entities.stories.allIds,
    stories: state.entities.stories.byId,
    feeds: state.entities.feeds.byId
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const [fetchType, fetchAction] = getFetchInfo(ownProps.match.path);

  return ({
    fetchType,
    fetchAction: (arg) => dispatch(fetchAction(arg))
  });
};

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(StoriesIndex));
