
import React from 'react';

class SessionBar extends React.Component {
  constructor(props) {
    super(props);
  }

  sessionButton() {
    const buttonText = this.props.loggedIn ?  "Log Out" : "Login";
    const buttonAction = this.props.loggedIn ?
      e => this.props.logout()
      : e => this.props.history.push("/login");

    return (
      <button onClick={buttonAction}>{buttonText}</button>
    );
  }

  render() {
    return (
      <header className="session-bar">
        <div className="session-bar-contents">
          <h3 className="session-logo">EasyFeeds</h3>
          {this.sessionButton()}
        </div>
      </header>
    );
  }
}

export default SessionBar;
