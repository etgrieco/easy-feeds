import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../../util/route_util.js';
import Landing from './landing';
import LatestStoriesContainer from './stories/latest_stories_container';
import SubscriptionStoriesContainer from './stories/subscription_stories_container';
import FeedsIndexContainer from './feeds/feeds_index_container';
import DiscoverFeedsContainer from './feeds/discover_feeds_container';
import SubscriptionStoriesIndexPopout from './stories/subscription_stories_index_popout_container';

import { openPopOut } from '../../actions/popout_actions';
import { connect } from 'react-redux';

export default (props) => {
  return (
    <section className="main-content">
      <AuthRoute exact path="/" component={Landing} />
      <AuthRoute path="/login" component={Landing} />
      <AuthRoute path="/signup" component={Landing} />
      <ProtectedRoute path="/i/feeds" component={FeedsIndexContainer} />
      <ProtectedRoute path="/i/latest" component={LatestStoriesContainer} />
      <ProtectedRoute path="/i/discover" component={DiscoverFeedsContainer} />
      <ProtectedRoute path="/i/discover/:id" component={SubscriptionStoriesIndexPopout} />
      <ProtectedRoute path="/i/subscriptions/:id" component={SubscriptionStoriesContainer} />
      <ProtectedRoute path="/i/collection/:id" component={SubscriptionStoriesContainer} />
    </section>
  );
};
// <Route path="/i/:anyRoute" render={() => <Redirect to="/i/latest"/>} />
//
// const mapDispatchToProps = dispatch => ({
//   openPopOut: () => dispatch(openPopOut(<SubscriptionStoriesContainer />))
// });
//
// class ShowPopOver extends React.Component {
//
//   componentDidMount() {
//     debugger
//     this.props.openPopOut();
//   }
//
//   render() {
//     return null;
//   }
// }
//
// const ShowPopOverContainer = connect(null, mapDispatchToProps)(ShowPopOver);
