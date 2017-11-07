import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { hidden: false };
  }

  componentDidMount() {
    this.props.fetchAllSubscriptions();
  }

  render() {
    const feedsList = this.props.feedIds.map(feedId => {
    const feed = this.props.feeds[feedId];
      return (
        <Link key={feedId} to={`/i/subscriptions/${feed.id}`}>
        <li>
          <img src={feed.favicon_url} />
            {feed.subscription_title}
        </li>
      </Link>
      );
    });

    return (
      <section className="navbar">
        <div className={`navbar-show-button${this.state.hidden ? "-hidden" : ""}`}>
          <span onClick={e => this.setState({hidden: !this.state.hidden})}>
            { this.state.hidden ?
              <i className="fa fa-expand" aria-hidden="true"></i> :
              <i className="fa fa-compress" aria-hidden="true"></i>
            }
          </span>
        </div>
        <nav className={`navbar-container${this.state.hidden ? "-hidden" : ""} navbar-transition`}>
          <div className={`navbar-closed${this.state.hidden ? "":  "-hidden"}`}>
          </div>
          <div className={`navbar-contents${this.state.hidden ? "-hidden" : ""}`}>
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
                <div className="feeds">
                  <Link to="/i/latest" className="latest">
                  <li>
                      <span><i className="fa fa-bars" aria-hidden="true"></i></span>
                      Latest
                  </li>
                </Link>
                  {feedsList}
                </div>
              </div>
            </div>
          </div>
        </nav>
        <aside className={`nav-add-content-container ${this.state.hidden ? "hidden" : ""}`}>
          <Link to="/i/discover">
            <div className="nav-add-content">
              <span className="nav-add-content-plus"><i className="fa fa-plus" aria-hidden="true"></i></span>
              Add Content
            </div>
          </Link>
        </aside>
      </section>
    );
  }
}

export default NavBar;
