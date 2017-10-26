import React from 'react';
import Landing from './landing';
import { Route, Switch } from 'react-router-dom';
import SessionFormContainer from '../session/session_form_container';
import { AuthRoute, ProtectedRoute } from '../../util/route_util.js';
import StoriesContainer from '../stories/stories_container';
import SessionBarContainer from './sessionbar/sessionbar_container';
import FeedsIndexContainer from './feeds/feeds_index_container';

const MainPage = props => {
  //redirect from /i/ to dashboard
  return (
    <main className="main-page">
      <SessionBarContainer />
      <AuthRoute exact path="/" component={Landing} />
      <AuthRoute path="/login" component={Landing} />
      <AuthRoute path="/signup" component={Landing} />
      <ProtectedRoute path="/i/latest" component={StoriesContainer} />
      <ProtectedRoute path="/i/feeds" component={FeedsIndexContainer} />
    </main>
  );
};

export default MainPage;
