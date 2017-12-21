import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  getSelectedLink = () => {
    const location = this.props.location.pathname.split("/")[2]
    return location === "subscriptions" ?
    this.props.location.pathname.split("/")[3] : location;
  }

  state = {
    isOpen: true,
    selected: this.getSelectedLink(),
    isManuallyClosed: false
  };

  componentDidMount() {
    this.handleResize();
    addEventListener('resize', this.handleResize, false);
    this.props.fetchAllSubscriptions();
  }

  handleResize = () => {
    if (window.innerWidth < 910) {
      this.setState({isOpen: false})
    } else if (!this.state.isManuallyClosed) {
      this.setState({isOpen: true})
    }
  }

  componentWillUnmount() {
    removeEventListener('resize');
  }

  handleClick = (e) => {
    let controlState = {};
    if (e.target.className.includes("fa-compress")) {
      controlState = {isManuallyClosed: true};
    } else {
      controlState = {isManuallyClosed: false};
    }
    this.setState(({ isOpen }) => ({isOpen: !isOpen, ...controlState}));
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
        <i className="fa fa-compress" aria-hidden="true"></i>
        : <i className="fa fa-expand" aria-hidden="true"></i>
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
  <div className="add-content">
    <Link to="/i/discover">
      <span><i className="fa fa-plus" aria-hidden="true"></i></span>
      Add Content
    </Link>
  </div>
);

export default NavBar;
