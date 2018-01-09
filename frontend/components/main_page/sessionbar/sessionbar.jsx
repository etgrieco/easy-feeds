import React from 'react';

export default ({ loggedIn, title, logout, history, ...otherProps }) => {
  const buttonText = loggedIn ?  "Log Out" : "Login";
  const buttonAction = loggedIn ? e => logout() : e => history.push("/login");

  return (
    <header className={`session-bar${ title ? " with-title" : ""}`}>
      <div className={"session-bar-contents" +
        (loggedIn ? " logged-in-session" : "")
      }>
        <h3 className="session-logo">
          { title ? title : "EasyFeeds" }
        </h3>
        <button onClick={buttonAction}>{buttonText}</button>
      </div>
    </header>
  );
}
