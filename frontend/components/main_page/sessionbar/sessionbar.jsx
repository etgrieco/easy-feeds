import React from 'react';

class SessionBar extends React.Component {

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
    const { loggedIn, title } = this.props;
    return (
      <header className={`session-bar${ title ? " drop-shadow" : ""}`}>
        <div className={"session-bar-contents" +
          (loggedIn ? " logged-in-session" : "")
        }>
          <h3 className="session-logo">{ title ? title : "EasyFeeds" }</h3>
          {this.sessionButton()}
        </div>
      </header>
    );
  }
}

export default SessionBar;
