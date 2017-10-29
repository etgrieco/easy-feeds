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

  constructor(props) {
    super(props);
    this.state = {query: ""};
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchFeedResults(this.state.query);
  }

  handleQueryChange(e) {
    this.setState({query: e.target.value});
    this.props.fetchFeedResults(e.target.value);
  }

  handleSubscribe()

  render() {
      const { feeds } = this.props;
      let feedResults = feeds.results.map(resultId => {
        let feed = feeds.byId[resultId];
        return (<div key={feed.id}>{feed.title}</div>);
      });

      if (feedResults.length === 0) {
        feedResults = ["No Feeds Found"];
      }

      return (
        <div>
          <for>
            <input className="feed-search"
              value={this.state.query}
              onChange={this.handleQueryChange}
              />
          </form>

          {
            this.state.query.length === 0 ?
            <h1>Popular Feeds</h1>
            : <h1>Results</h1>
          }

          <div className="results">
            {feedResults}
          </div>
        </div>
      );
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
