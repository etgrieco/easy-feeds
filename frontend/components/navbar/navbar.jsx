import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {

  componentDidMount() {
    // this.props.fetchAllSubscriptions();
    // change to fetch all collections!!
      // -- should include collections + basic subscription info
    this.props.fetchCurrentUser();
  }

  render() {
    const feedsList = this.props.feedIds.map(feedId => {
    const feed = this.props.feeds[feedId];
      return (
        <li key={feedId}>
          <Link to={`/i/subscriptions/${feed.id}`}>
            {feed.subscription_title}
          </Link>
        </li>
      );
    });

    return (
      <div className="navbar-container">
        <div className="navbar-collections">
          <div className="collections-header">
            <div>Feeds</div>
            <div>
              <Link to="/i/feeds/">
                <i className="fa fa-cog" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
          <div className="tabs">
            <div className="latest-tab">
              <Link to="/i/latest">
                <span><i className="fa fa-bars" aria-hidden="true"></i></span>
                All
              </Link>
            </div>

            <div>
              {feedsList}
            </div>
          </div>

        </div>
        <div className="nav-add-content">
          <Link to="/i/discover">
            <div className="nav-add-container">
              <span><i className="fa fa-plus" aria-hidden="true"></i></span>
              Add Content
            </div>
          </Link>
        </div>
    </div>
    );
  }
}

export default NavBar;
