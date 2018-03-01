import React from 'react';
import { Link } from 'react-router-dom';

function DiscoverIndexItem({ feed, deleteFeed, createFeed }) {
  return (
    <div key={feed.id} className="search-item">
      <div className="feed-search-name">
        <img src={feed.favicon_url} className="feed-index-icon" />
        <div className="feed-search-description">
          <Link to={`/i/discover/${feed.id}`}>
            <h3>{feed.title}</h3>
          </Link>
          <p>{feed.description}</p>
        </div>
      </div>
      <div>
        {feed.subscribed ?
          <UnsubscribeButton {...{feed, deleteFeed}} /> :
          <SubscribeButton {...{feed, createFeed}} />
          }
        </div>
      </div>
  );
}

class UnsubscribeButton extends React.Component {
  state = { hovering: false };

  render() {
    return (
      <button className="following-button discover-button"
        onMouseOver={e => this.setState({hovering: true})}
        onMouseLeave={e => this.setState({hovering: false})}
        onClick={e => this.props.deleteFeed(this.props.feed)}
        >
        { this.state.hovering ? "Unfollow?" : "Following" }
      </button>
    );
  }
}

function SubscribeButton({ feed, createFeed }) {
  return (
    <button className="follow-button discover-button"
      onClick={e => createFeed(feed)}>
      Follow
    </button>
  );
}

export default DiscoverIndexItem;
