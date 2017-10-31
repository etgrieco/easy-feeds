import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StoriesIndex from './stories_index';
import { fetchAllSubscriptions, fetchFeed }
  from '../../actions/subscription_actions';

const getFetchProps = path => {
  switch (path.split("/")[2]) {
    case "subscriptions":
      return ["FEED", fetchFeed, (state, feedId) => {
        return state.entities.feeds.byId[feedId].stories;
      }];
    case "collections":
      return ["FEED", fetchFeed];
    default:
      return ["ALL", fetchAllSubscriptions, state => state.session.latest];
  }
};

const mapStateToProps = (state, ownProps) => {
  const storyIds = getFetchProps(ownProps.match.path)[2](state, ownProps.match.params);

  return ({
    stories: state.entities.stories.byId,
    storyIds,
    feeds: state.entities.feeds.byId
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const [fetchType, fetchAction] = getFetchProps(ownProps.match.path);

  return ({
    fetchType,
    fetchAction: (arg) => dispatch(fetchAction(arg))
  });
};

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(StoriesIndex));
