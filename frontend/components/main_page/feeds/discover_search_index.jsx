import React from 'react';
import { Link } from 'react-router-dom';
import DiscoverIndexItem from './discover_index_item';
import AddFeedFormContainer from './add_feeds_form_container';

class DiscoverSearchIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {query: "", dataBaseSearch: true};
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.titleSent = false;
  }

  componentDidMount() {
    window.document.querySelector(".main-content").scrollTo(0,0);

    this.props.fetchFeedResults(this.state.query);
    this.props.receiveFeedTitle(null);
    window.document.querySelector(".main-content").addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.document.querySelector(".main-content").removeEventListener('scroll', this.onScroll, false);
  }

  onScroll(e) {
    if((e.target.scrollTop > 80) && !this.titleSent) {
      this.titleSent = true;
      this.props.receiveFeedTitle("Discover");
    }
    else if (e.target.scrollTop < 80) {
      this.props.receiveFeedTitle(null);
      this.titleSent = false;
    }
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
          deleteFeed={this.props.deleteFeed}
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

  handleSwitch({ dataBaseSearch, clearErrors }) {
    this.setState({ dataBaseSearch });
    clearErrors ? this.props.clearErrors() : null;
  }

  render() {
    const { feeds } = this.props;
    const discoverIndexItems = this.createDiscoverIndexItems(feeds);

    return(
      <div className="discover-search-index">
        <div className="discover-form-switch">
          <div className={`discover-search-button no-select ${this.state.dataBaseSearch ? "selected" : ""}`}
            onClick={e => this.handleSwitch({dataBaseSearch: true, clearErrors: true})}
            >
            <i className="fa fa-rss" aria-hidden="true"></i>
            Search
          </div>
          <div className={`discover-add-url-button no-select ${this.state.dataBaseSearch ? "": "selected"}`}
            onClick={e => this.handleSwitch({dataBaseSearch: false})}
            >
            <i className="fa fa-link" aria-hidden="true"></i>
            Add URL
          </div>
        </div>
        { this.state.dataBaseSearch ?
        <div>
          <h1>What sources do you want to follow?</h1>
          <form>
            <div className="feed-search-input-container">
              <input className="feed-search"
                value={this.state.query}
                onChange={this.handleQueryChange}
                placeholder="Search for a feed..."
                />
              <i className="fa fa-search" aria-hidden="true"></i>
            </div>
          </form>
        </div>
          :
        <div>
          <h1>Have your own feed URL?</h1>
          <AddFeedFormContainer />
        </div>
        }
        {this.discoverSearch(discoverIndexItems)}
      </div>
    );
  }
}

export default DiscoverSearchIndex;

























// end of doc
