import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StoriesIndex from './stories_index';
import { fetchLatest } from '../../../actions/story_actions';

const mapStateToProps = (state, ownProps) => {
  const storiesState = state.entities.stories.byId;
  const feeds = state.entities.feeds.byId;
  const stories = state.session.latest.map(storyId => storiesState[storyId]);

  return ({
    title: "Latest",
    stories,
    feeds,
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    fetchAction: () => dispatch(fetchLatest())
  });
};

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(StoriesIndex));
