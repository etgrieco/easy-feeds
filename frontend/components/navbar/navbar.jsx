import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
  return <div className="navbar-container">
    <div className="navbar-collections">
      <p>Collections will go here</p>
      <Link to="/i/feeds">Click to Organize and Add Feeds</Link>
      <br />
      <Link to="/i/latest">Click to see stories</Link>
      <div className="sample-nav-container"></div>
      <div className="sample-nav-container"></div>
      <div className="sample-nav-container"></div>
      <div className="sample-nav-container"></div>
    </div>
    <div className="nav-add-content">
      <a href="#">Add Content</a>
    </div>
  </div>;
};

export default NavBar;
