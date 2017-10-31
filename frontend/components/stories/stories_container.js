import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StoriesIndex from './stories_index';
import { fetchAllSubscriptions, fetchFeed }
  from '../../actions/subscription_actions';

const mapStateToProps = (state, ownProps) => {

  let fetchType = 'ALL';
  if (ownProps.match.path === "/i/subscriptions/:feedId") {
    fetchType = 'FEED';
  } else if (ownProps.match.path === "/i/collections/:collectionId") {
    fetchType = 'COLLECTION';
  }

  return ({
    fetchType,
    storiesIds: state.entities.stories.allIds,
    stories: state.entities.stories.byId,
    feeds: state.entities.feeds.byId
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let fetchAction;
  switch (ownProps.match.path) {
    case "/i/subscriptions/:feedId":
      fetchAction = fetchFeed;
      break;
    case "/i/collections/:collectionId":
      //collection action goes here
      break;
    default:
      fetchAction = fetchAllSubscriptions;
  }

  return ({
    fetchAction: (arg) => dispatch(fetchAction(arg))
  });
};

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(StoriesIndex));
