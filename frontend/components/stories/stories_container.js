import { connect } from 'react-redux';
import StoriesIndex from './stories_index';
import { fetchAllSubscriptions } from '../../actions/subscription_actions';

const mapStateToProps = state => {
  return ({
    storiesIds: state.entities.stories.allIds,
    stories: state.entities.stories.byId
  });
};

const mapDispatchToProps = dispatch => {
  return ({
    fetchAllSubscriptions: () => dispatch(fetchAllSubscriptions())
  });
};

export default connect(mapStateToProps,
  mapDispatchToProps)(StoriesIndex);
