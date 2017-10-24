import React from 'react';
import Landing from './landing/landing';
import { Route, Switch } from 'react-router-dom';
import SessionFormContainer from '../session/session_form_container';
import { AuthRoute } from '../../util/route_util.js';

const MainPage = props => (

  <main>
    <Switch>
      <AuthRoute path="/login" component={SessionFormContainer} />
      <AuthRoute path="/signup" component={SessionFormContainer} />
      <Route path="/" component={Landing} />
    </Switch>
  </main>
);

export default MainPage;
