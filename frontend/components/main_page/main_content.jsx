import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../../util/route_util.jsx';
import Landing from './landing';
import SubscriptionStoriesContainer from './stories/stories_container';
import FeedsIndexContainer from './feeds/feeds_index_container';
import DiscoverContainer from './feeds/discover_container';
import SubscriptionStoriesIndexPopout from './stories/subscription_stories_index_popout';
import StoryShowPopout from './stories/story_show_popout';
import { receiveFeedTitle } from '../../actions/ui_actions';
import { throttle } from 'lodash';

class MainContent extends React.Component {
  componentDidMount() {
    this.props.receiveFeedTitle(null);
    window.document.querySelector(".main-content")
      .addEventListener('scroll', this.throttledSessionBarScroll, false);
  }

  componentWillUnmount() {
    window.document.querySelector(".main-content")
      .removeEventListener('scroll', this.throttledSessionBarScroll, false);
  }

  throttledSessionBarScroll = throttle(e => this.onScroll(e), 50, {leading: true});

  onScroll = (e) => {
    const titlePresent = Boolean(this.props.sessionBarTitle);

    if(e.target.scrollTop > 80 && !titlePresent) {
      this.props.receiveFeedTitle(this.getTitle());
    }
    else if (e.target.scrollTop < 80 && titlePresent) {
      this.props.receiveFeedTitle(null);
    }
  }

  getTitle() {
    const path = this.props.location.pathname.split("/")[2];

    const sessionTitles = {
      discover: "Discover Feeds",
      feeds: "Organize Feeds",
      latest: "Latest",
      subscriptions: this.props.subscriptionTitle,
      reads: "Recently Read"
    };

    return (sessionTitles[path] || "Welcome to EasyFeeds");
  }

  render () {
    const landingStyleProps = (this.props.match.path === "/" &&
      this.props.match.isExact) ||
      this.props.history.location.pathname === "/login" ||
      this.props.history.location.pathname === "/signup"  ? {style: {padding: "0"}} : {};

    return (
      <section className="main-content" {...landingStyleProps}>
        <AuthRoute exact path="/" component={Landing} />
        <AuthRoute path="/login" component={Landing} />
        <AuthRoute path="/signup" component={Landing} />
        <ProtectedRoute path="/i/feeds" component={FeedsIndexContainer} />
        <ProtectedRoute path="/i/latest" component={SubscriptionStoriesContainer} />
        <ProtectedRoute path="/i/reads" component={SubscriptionStoriesContainer} />
        <Switch>
          <ProtectedRoute path="/i/:prevSource/:prevId/stories/:id" component={StoryShowPopout} />
          <ProtectedRoute path="/i/discover/:id" component={SubscriptionStoriesIndexPopout} />
        </Switch>
        <ProtectedRoute path="/i/discover" component={DiscoverContainer} />
        <ProtectedRoute path="/i/subscriptions/:id" component={SubscriptionStoriesContainer} />
        <ProtectedRoute path="/i/collections/:id" component={SubscriptionStoriesContainer} />
        <ProtectedRoute path="/i/:prevSource/stories/:id" component={StoryShowPopout} />
      </section>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  const feedsById = state.entities.feeds.byId;
  const id = ownProps.history.location.pathname.split("/")[3];
  const feed = feedsById[id] ? { subscription_title: "" } : feedsById[id];
  const subscriptionTitle = feed.subscription_title || feed.title;
  return ({ subscriptionTitle, sessionBarTitle: state.ui.feedTitle });
};

const mapDispatchToProps = dispatch => ({
  receiveFeedTitle: title => dispatch(receiveFeedTitle(title))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainContent)
);
