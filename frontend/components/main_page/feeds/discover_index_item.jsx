import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class DiscoverIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.state = { hovering: false }
  }

  handleSubscribe(feed) {
    this.props.createFeed(feed);
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
            <Link to={`/i/discover/${feed.id}`}>
              <h3>
                {feed.title}
              </h3>
            </Link>
            <p>{feed.description}</p>
          </div>
        </div>
        <div>
          {feed.subscribed ?
            <button className="following-button discover-button"
              onMouseOver={e => this.setState({hovering: true})}
              onMouseLeave={e => this.setState({hovering: false})}
              >{ this.state.hovering ? "Unfollow" : "Following" }
            </button> :
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
