import React from 'react';
import { Link } from 'react-router-dom';
import DiscoverIndexItem from './discover_index_item';

class DiscoverSearchIndex extends React.Component {

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

  createDiscoverIndexItems(feeds) {
    return (
      feeds.results.length === 0 ?
      ["No Feeds Found"] :
      feeds.results.map(resultId => {
        let feed = feeds.byId[resultId];
        return <DiscoverIndexItem
          key={feed.id}
          feed={feed}
          createFeed={this.props.createFeed}
          openPopOut={this.props.openPopOut}
          fetchUnsubscribedFeed={this.props.fetchUnsubscribedFeed}
          />;
      })
    );
  }

  discoverSearch(discoverIndexItems) {
    const text = this.state.query.length === 0 ? "Popular Feeds" : "Results";
    return (
    <div className="discover-items">
      <h2>{text}</h2>
      <div className="results">
        {discoverIndexItems}
      </div>
    </div>
  );
}

  render() {
    const { feeds } = this.props;
    const discoverIndexItems = this.createDiscoverIndexItems(feeds);

    return(
      <div className="discover-search-index">
        <h1>What sources do you want to follow?</h1>
        <form>
          <div className="feed-search-input-container">
            <input className="feed-search"
              value={this.state.query}
              onChange={this.handleQueryChange}
              />
            <i className="fa fa-search" aria-hidden="true"></i>
          </div>
        </form>
        <div className="feed-url-container">
          <Link to="/i/feeds">{"Have an RSS URL? Add one here."}</Link>
        </div>
        {this.discoverSearch(discoverIndexItems)}
      </div>
    );
  }
}

export default DiscoverSearchIndex;

























// end of doc
