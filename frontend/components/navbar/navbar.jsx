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
            <img src={feed.favicon_url} /> {feed.subscription_title}
          </li>
      </Link>
      );
    });

    return (
      <section className={`navbar${this.state.hidden ? " navbar-closed" : ""}`}>
        <div className="menu-container">
          <div>
            <Link to="/i/feeds/">
              <div className={`edit-button${this.state.hidden ? " hidden" : ""}`}>Organize Feeds<i className="fa fa-cog" aria-hidden="true"></i></div>
            </Link>
          </div>
          <div className={`navbar-show-button${this.state.hidden ? "-hidden" : ""}`}>
            <span onClick={e => this.setState({hidden: !this.state.hidden})}>
              { this.state.hidden ?
                <i className="fa fa-expand" aria-hidden="true"></i> :
                  <i className="fa fa-compress" aria-hidden="true"></i>
                }
              </span>
          </div>
        </div>
        <NavBarMenu hidden={this.state.hidden} feedsList={feedsList} />
        <NavBarAddContent hidden={this.state.hidden} />
      </section>
    );
  }
}

const NavBarMenu = ({ hidden, feedsList }) => (
  <div></div>
);

function NavBarAddContent(props) {
  const { hidden } = props;

  return (
    <aside className={`nav-add-content-container ${hidden ? "hidden" : ""}`}>
      <Link to="/i/discover">
        <div className="nav-add-content">
          <span className="nav-add-content-plus"><i className="fa fa-plus" aria-hidden="true"></i></span>
          Add Content
        </div>
      </Link>
    </aside>
  );
}

export default NavBar;
