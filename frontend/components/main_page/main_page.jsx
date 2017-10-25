import React from 'react';
import Landing from './landing/landing';
import { Route, Switch } from 'react-router-dom';
import SessionFormContainer from '../session/session_form_container';
import { AuthRoute, ProtectedRoute } from '../../util/route_util.js';
import StoriesContainer from '../stories/stories_container';

const MainPage = props => (

  <main className="main-page">
    <AuthRoute exact path="/" component={Landing} />
    <AuthRoute path="/login" component={Landing} />
    <AuthRoute path="/signup" component={Landing} />
    <ProtectedRoute path="/latest" component={StoriesContainer} />
  </main>
);

export default MainPage;
