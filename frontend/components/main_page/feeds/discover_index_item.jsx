import React from 'react';
import SubscriptionStoriesContainer from '../stories/subscription_stories_container';
import { withRouter } from 'react-router-dom';

class DiscoverIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubscribe(feed) {
    this.props.createFeed(feed);
  }

  handleClick(feed) {
    this.props.history.push(`/i/discover/${feed.id}`);
  }

  render() {
    const { feed, openPopOut, fetchUnsubscribedFeed } = this.props;
    return (
      <div key={feed.id} className="search-item">
        <div className="feed-search-name">
          <img src={feed.favicon_url}
            className="feed-index-icon"
            />
          <div className="feed-search-description">
            <h3 onClick={e => this.handleClick(feed)}>
              {feed.title}
            </h3>
            <p>{feed.description}</p>
          </div>
        </div>
        <div>
          {feed.subscribed ?
            <button className="following-button discover-button"
              >Following</button> :
            <button
              className="follow-button discover-button"
              onClick={e => this.handleSubscribe(feed)}>
              Follow</button>
          }
        </div>
      </div>
    );
  }

}


export default withRouter(DiscoverIndexItem);
