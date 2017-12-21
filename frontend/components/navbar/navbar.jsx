import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {

  getSelectedLink = () => {
    const location = this.props.location.pathname.split("/")[2]
    return location === "subscriptions" ?
    this.props.location.pathname.split("/")[3] : location;
  }
  state = { isOpen: true, selected: this.getSelectedLink() };

  componentDidMount() {
    this.props.fetchAllSubscriptions();
  }

  handleClick = () => {
    this.setState(({ isOpen }) => ({isOpen: !isOpen}));
  }

  handleSelectedUpdate = () => {
    setTimeout(() => this.setState({selected: this.getSelectedLink()}), 0)
  }

  render() {
    const { isOpen } = this.state;

    return (
      <section onClick={this.handleSelectedUpdate}
        className={`navbar ${isOpen ? "" : "collapsed"}`}>
        <NavBarMenu {...this.state} handleClick={this.handleClick} />
        { isOpen ?
          <div>
            <NavBarLinks feedIds={this.props.feedIds}
                         feeds={this.props.feeds}
                         selected={this.state.selected} />
            <NavBarAddContent />
          </div>
          : null
        }
      </section>
    );
  }
}

const NavBarMenu = (props) => (
  <div className="menu-container">
    {props.isOpen ?
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

const NavBarLinks = ({ feedIds, feeds, selected }) => {
  const feedsList = feedIds.map(feedId => {
    const feed = feeds[feedId];
    return (
      <Link className={selected == feedId ? "selected" : ""} key={feedId} to={`/i/subscriptions/${feed.id}`}>
        <li>
          <img src={feed.favicon_url} /> {feed.subscription_title}
        </li>
    </Link>
    );
  });

  return(
    <nav className="navbar-links">
      <div className="feeds">
        <Link to="/i/latest" className={`latest${selected === "latest" ? " selected" : ""}`}>
          <li><span><i className="fa fa-bars" aria-hidden="true"></i></span>
            Latest
          </li>
        </Link>

        <Link to="/i/reads" className={`reads${selected === "reads" ? " selected" : ""}`}>
          <li>
            <span>
              <i className="fa fa-book" aria-hidden="true"></i>
            </span>
            Recently Read
          </li>
        </Link>
        <div className="feeds-list">
          {feedsList}
        </div>
      </div>
    </nav>
  );
}

const NavBarAddContent = () => (
  <aside className="nav-add-content-container">
    <Link to="/i/discover">
      <div className="nav-add-content">
        <span className="nav-add-content-plus"><i className="fa fa-plus" aria-hidden="true"></i></span>
        Add Content
      </div>
    </Link>
  </aside>
);

export default NavBar;
