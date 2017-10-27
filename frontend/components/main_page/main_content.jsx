import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../../util/route_util.js';
import Landing from './landing';
import StoriesContainer from '../stories/stories_container';
import FeedsIndexContainer from './feeds/feeds_index_container';

export default (props) => {
  return (
    <section className="main-content">
      <AuthRoute exact path="/" component={Landing} />
      <AuthRoute path="/login" component={Landing} />
      <AuthRoute path="/signup" component={Landing} />
      <ProtectedRoute path="/i/latest" component={StoriesContainer} />
      <ProtectedRoute path="/i/feeds" component={FeedsIndexContainer} />
    </section>
  );
};
