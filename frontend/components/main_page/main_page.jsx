import React from 'react';
import Landing from './landing/landing';
import { Route, Switch } from 'react-router-dom';
import SessionFormContainer from '../session/session_form_container';
import { AuthRoute } from '../../util/route_util.js';

const MainPage = props => (

  <main className="main-page">
    <Route path="/" component={Landing} />
    <Switch>
      <AuthRoute path="/login" component={SessionFormContainer} />
      <AuthRoute path="/signup" component={SessionFormContainer} />
    </Switch>
  </main>
);

export default MainPage;
