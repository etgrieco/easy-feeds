import { connect } from 'react-redux';
import NavBar from './navbar';

const mapStateToProps = state => {
  return ({
    feeds: state.entities.feeds.byId,
    feedIds: state.entities.feeds.allSubIds
  });
};

const mapDispatchToProps = dispatch => {
  return ({});
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
