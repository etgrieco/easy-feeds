import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StoriesIndex from './stories_index';
import { fetchSingleFeed } from '../../actions/subscription_actions';

const mapStateToProps = (state, ownProps) => {
  const stories = state.entities.stories.byId;
  const feeds = state.entities.feeds.byId;
  const id = ownProps.match.params.id;

  return ({
    title: state.entities.feeds.byId[id].subscription_title,
    stories,
    feeds,
    storyIds: state.entities.feeds.byId[id].stories,
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    fetchAction: (feedId) => dispatch(fetchSingleFeed(feedId))
  });
};

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(StoriesIndex));
