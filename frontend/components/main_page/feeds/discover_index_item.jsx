import React from 'react';

class DiscoverIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubscribe = this.handleSubscribe.bind(this);
  }

  handleSubscribe(feed) {
    this.props.createFeed(feed);
  }

  render() {
    const { feed } = this.props;
    return (
      <div key={feed.id} className="search-item">
        <div className="feed-search-name">
          <img src={feed.favicon_url}
            className="feed-index-icon"
            />
          <div className="feed-search-description">
            <h3>{feed.title}</h3>
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


export default DiscoverIndexItem;
