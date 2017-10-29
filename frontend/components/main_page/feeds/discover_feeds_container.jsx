import React from 'react';
import { connect } from 'react-redux';
import { fetchFeedResults } from '../../../actions/discovery_actions';

// const DiscoverFeeds = ({ feeds, fetchFeedResults }) => {
//   console.log(fetchFeedResults)
//   debugger
//
//   const feedResults = feeds.results.map(result => {
//     let feed = feeds[result];
//     return (<div key={feed.id}>{feed.title}</div>);
//   });
//
//   return <div className="results">{feedResults}</div>;
// };

class DiscoverFeeds extends React.Component {

  componentDidMount() {
    this.props.fetchFeedResults("giant");
  }

  render() {
      const { feeds } = this.props;
      const feedResults = feeds.results.map(resultId => {
        debugger
        let feed = feeds.byId[resultId];
        return (<div key={feed.id}>{feed.title}</div>);
      });

      return <div className="results">{feedResults}</div>;
  }

}

const mapStateToProps = state => {
  return ({
    feeds: state.entities.feeds
  });
};

const mapDispatchToProps = dispatch => {
  return ({
    fetchFeedResults: query => dispatch(fetchFeedResults(query))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscoverFeeds);
