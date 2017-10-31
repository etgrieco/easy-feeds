import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../../util/route_util.js';
import Landing from './landing';
import StoriesContainer from '../stories/stories_container';
import FeedsIndexContainer from './feeds/feeds_index_container';
import DiscoverFeedsContainer from './feeds/discover_feeds_container';

export default (props) => {
  return (
    <section className="main-content">
      <AuthRoute exact path="/" component={Landing} />
      <AuthRoute path="/login" component={Landing} />
      <AuthRoute path="/signup" component={Landing} />
      <Switch>
        <ProtectedRoute path="/i/feeds" component={FeedsIndexContainer} />
        <ProtectedRoute path="/i/discover" component={DiscoverFeedsContainer} />
        <ProtectedRoute path="/i/latest" component={StoriesContainer} />
        <ProtectedRoute path="/i/subscriptions/:id" component={StoriesContainer} />
        <ProtectedRoute path="/i/collection/:id" component={StoriesContainer} />
        <Route path="/i/:anyRoute" render={() => <Redirect to="/i/latest"/>} />
      </Switch>
    </section>
  );
};
