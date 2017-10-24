import React from 'react';
import Landing from './landing/landing';
import { Route } from 'react-router-dom';
import SessionFormContainer from '../session/session_form_container';

const MainPage = props => (

  <main>
    <Route path="/" component={Landing} />
    <Route path="/login" component={SessionFormContainer} />
    <Route path="/signup" component={SessionFormContainer} />
  </main>
);

export default MainPage;
