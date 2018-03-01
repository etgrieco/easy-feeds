import React from 'react';
import { Link } from 'react-router-dom';
import DiscoverIndexItem from './discover_index_item';
import AddFeedForm from './add_feed_form';

class DiscoverSearchIndex extends React.Component {
  state = {query: "", dataBaseSearch: true};

  componentDidMount() {
    window.document.querySelector(".main-content").scrollTo(0,0);
    this.props.fetchFeedResults(this.state.query);
  }

  handleQueryChange = e => {
    this.setState({query: e.target.value});
    this.props.fetchFeedResults(e.target.value);
  }

  handleSwitch = ({ dataBaseSearch, clearErrors }) => {
    this.setState({ dataBaseSearch });
    clearErrors ? this.props.clearErrors() : null;
  }

  render() {
    const text = this.state.query.length === 0 ? "Popular Feeds" : "Results";

    return(
      <div className="discover-search-index">
        <DiscoverFormSwitch handleSwitch={this.handleSwitch} {...this.state} />
        { this.state.dataBaseSearch ?
          <DataBaseSearch handleQueryChange={this.handleQueryChange} {...this.state} /> :
          <AddFeedForm  {...this.props} /> }
        <div className="discover-items">
          <h2>{text}</h2>
          <DiscoverIndexItems {...this.props} />
        </div>
      </div>
    );
  }
}

function DiscoverFormSwitch({ handleSwitch, dataBaseSearch }) {
  return (
    <div className="discover-form-switch">
      <div className={`discover-search-button no-select ${dataBaseSearch ? "selected" : ""}`}
        onClick={e => handleSwitch({dataBaseSearch: true, clearErrors: true})}
        >
        <i className="fa fa-rss" aria-hidden="true"></i>
        Search
      </div>
      <div className={`discover-add-url-button no-select ${dataBaseSearch ? "": "selected"}`}
        onClick={e => handleSwitch({dataBaseSearch: false})}
        >
        <i className="fa fa-link" aria-hidden="true"></i>
        Add URL
      </div>
    </div>
  );
}

function DataBaseSearch({ query, handleQueryChange }) {
  return (
    <div>
      <h1>What sources do you want to follow?</h1>
      <form>
        <div className="feed-search-input-container">
          <input className="feed-search"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search for a feed..."
            />
          <i className="fa fa-search" aria-hidden="true"></i>
        </div>
      </form>
    </div>
  );
}

function DiscoverIndexItems({ feeds, ...feedActions }) {
  const results = feeds.results.length === 0 ?
    ["No Feeds Found"] :
    feeds.results.map(resultId => {
      let feed = feeds.byId[resultId];
      return <DiscoverIndexItem
        key={feed.id}
        feed={feed}
        {...feedActions}
      />;
    });

  return (
    <div className="results">
      {results}
    </div>
  );
}

export default DiscoverSearchIndex;
