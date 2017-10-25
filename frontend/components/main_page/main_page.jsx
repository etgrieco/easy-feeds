import React from 'react';
import Landing from './landing/landing';
import { Route, Switch } from 'react-router-dom';
import SessionFormContainer from '../session/session_form_container';
import { AuthRoute, ProtectedRoute } from '../../util/route_util.js';
import StoriesContainer from '../stories/stories_container';

const MainPage = props => (

  <main className="main-page">
    <AuthRoute path="/" component={Landing} />
    <Switch>
      <AuthRoute path="/login" component={SessionFormContainer} />
      <AuthRoute path="/signup" component={SessionFormContainer} />
    </Switch>
    <ProtectedRoute path="/latest" component={StoriesContainer} />
  </main>
);

export default MainPage;
