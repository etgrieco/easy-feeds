import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
  return (
    <div className="navbar-container">
      <div className="navbar-collections">
        <div className="collections-header">
          <div>Feeds</div>
          <div>
            <Link to="/i/feeds">
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
        </div>

      </div>
      <div className="nav-add-content">
        <Link to="/i/feeds">
          <div className="nav-add-container">
            <span><i className="fa fa-plus" aria-hidden="true"></i></span>
            Add Content
          </div>
        </Link>
      </div>
  </div>
  );

};

export default NavBar;
