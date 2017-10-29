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
    this.state = ({query: ""});
    this.handleQuery = this.handleQuery.bind(this);
  }

  componentDidMount() {
    this.props.fetchFeedResults(this.state.query);
  }

  handleQuery(e) {
    this.setState({query: e.target.value});
  }

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
          <form>
            <input className="feed-search"
              value={this.state.query}
              onChange={this.handleQuery}
              />
          </form>

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
