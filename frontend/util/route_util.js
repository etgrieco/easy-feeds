import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';

const mapStateToProps = state => {
  return {loggedIn: Boolean(state.session.currentUser)};
};

const Auth = ({component: Component, path, loggedIn, exact}) => {

  return (<Route exact={exact} path={path} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/latest" />
    )
  )}/>
);
};


export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));

const Protect = ({component: Component, path, loggedIn}) => {
  return (
    <Route path={path} render={(props) => (
      loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    )}/>
  );
};

export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protect));

// Define a <ProtectedRoute> helper method in your route_util.js. It should:
// Check to see if the application state has a currentUser property. You can use the loggedIn boolean like we did in our AuthRoute component.
// If true, render the component.
// Otherwise, Redirect to "/login".
// Add the route to our App component like so:
