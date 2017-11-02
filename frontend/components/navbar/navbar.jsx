import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { hidden: false };
  }

  componentDidMount() {
    // change to fetch all collections!!
      // -- should include collections + basic subscription info
    this.props.fetchAllSubscriptions();
  }

  render() {
    const feedsList = this.props.feedIds.map(feedId => {
    const feed = this.props.feeds[feedId];
      return (
        <li key={feedId}>
          <img src={feed.favicon_url} />
          <Link to={`/i/subscriptions/${feed.id}`}>
            {feed.subscription_title}
          </Link>
        </li>
      );
    });

    return (
      <aside className="navbar-container">
        <div className={`navbar-closed ${this.state.hidden ? "" : "hidden"}`}>
          <span className="navbar-show-button" onClick={e => this.setState({hidden: false})}>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </span>
        </div>
        <div className={`navbar-open ${this.state.hidden ? "hidden" : ""}`}>
          <div onClick={e => this.setState({hidden: true})}>Hide</div>
          <div className="navbar-collections">
            <div className="feeds-header noselect">
              <div>Feeds</div>
              <div>
                <Link to="/i/feeds/">
                  <i className="fa fa-cog" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
            <div className="tabs-container">
              <div className="latest">
                <Link to="/i/latest">
                  <span><i className="fa fa-bars" aria-hidden="true"></i></span>
                  Latest
                </Link>
              </div>

              <div className="feeds">
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
      </aside>
    );
  }
}

export default NavBar;
