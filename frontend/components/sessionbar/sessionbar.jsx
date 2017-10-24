import React from 'react';
import { withRouter } from 'react-router-dom';

class SessionBar extends React.Component {

  constructor(props) {
    super(props);
    this.handleSignInClick = this.handleSignInClick.bind(this);
  }

  handleSignInClick(e) {
    e.preventDefault();
    this.props.history.push("/signup");
  }

  render() {

    return (
      <header className="session-bar">
        <h1>EasyFeeds</h1>
        <button onClick={this.handleSignInClick}>Sign Up</button>
      </header>
    );

  }
}

export default withRouter(SessionBar);
