import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  state = { isOpen: true };

  componentDidMount() {
    this.props.fetchAllSubscriptions();
  }

  handleClick = () => {
    this.setState(({ isOpen }) => ({isOpen: !isOpen}));
  }

  render() {
    const feedsList = this.props.feedIds.map(feedId => {
      const feed = this.props.feeds[feedId];
      return (
        <Link key={feedId} to={`/i/subscriptions/${feed.id}`}>
          <li>
            <img src={feed.favicon_url} /> {feed.subscription_title}
          </li>
      </Link>
      );
    });

    return (
      <section className="navbar">
        <NavBarMenu {...this.state} handleClick={this.handleClick} />
        <NavBarLinks {...this.state} feedsList={feedsList} />
        <NavBarAddContent {...this.state} />
      </section>
    );
  }
}

const NavBarMenu = (props) => (
  <div className="menu-container">
    { props.isOpen ?
      <div>
        <Link to="/i/feeds/">
          <div className="edit-button">Organize Feeds
            <i className="fa fa-cog" aria-hidden="true"></i>
          </div>
        </Link>
      </div>
      : null
    }
    <NavBarCollapseExpand {...props} />
  </div>
);

const NavBarCollapseExpand = ({ isOpen, handleClick }) => (
  <div className="navbar-show-button">
    <span onClick={handleClick}>
      {isOpen ?
        <i className="fa fa-expand" aria-hidden="true"></i>
        : <i className="fa fa-compress" aria-hidden="true"></i>
      }
      </span>
  </div>
);

const NavBarLinks = ({ isOpen, feedsList }) => (
  isOpen ?
    <nav className="navbar-container">
      <div className="navbar-contents">
        <div className="navbar-collections">
          <div className="feeds-header noselect"></div>
          <div className="tabs-container">
            <div className="feeds">
              <div className="special-feeds">
                <Link to="/i/latest" className="latest">
                  <li><span><i className="fa fa-bars" aria-hidden="true"></i></span>
                    Latest
                  </li>
                </Link>

                <Link to="/i/reads" className="reads">
                  <li>
                    <span>
                      <i className="fa fa-book" aria-hidden="true"></i>
                    </span>
                    Recently Read
                  </li>
                </Link>
              </div>
              <div className="feeds-list">
                {feedsList}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    : null
);

const NavBarAddContent = ({ isOpen }) => (
  <aside className={`nav-add-content-container ${isOpen ? "hidden" : ""}`}>
    <Link to="/i/discover">
      <div className="nav-add-content">
        <span className="nav-add-content-plus"><i className="fa fa-plus" aria-hidden="true"></i></span>
        Add Content
      </div>
    </Link>
  </aside>
);

export default NavBar;
