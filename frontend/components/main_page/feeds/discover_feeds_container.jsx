import React from 'react';
import { connect } from 'react-redux';
import { fetchFeedResults } from '../../../actions/discovery_actions';
import { createFeed } from '../../../actions/subscription_actions';
import DiscoverIndexItem from './discover_index_item';

class DiscoverIndex extends React.Component {

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

  render() {
    const { feeds } = this.props;
    let discoverIndexItems = feeds.results.map(resultId => {
      let feed = feeds.byId[resultId];
      return <DiscoverIndexItem
        key={feed.id}
        feed={feed}
        createFeed={this.props.createFeed}
         />;
    });

    if (discoverIndexItems.length === 0) {
      discoverIndexItems = ["No Feeds Found"];
    }

    return (
      <div>
        <form>
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
          {discoverIndexItems}
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
    fetchFeedResults: query => dispatch(fetchFeedResults(query)),
    createFeed: feed => dispatch(createFeed(feed))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscoverIndex);
