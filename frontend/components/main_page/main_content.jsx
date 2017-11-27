import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../../util/route_util.js';
import Landing from './landing';
import SubscriptionStoriesContainer from './stories/stories_container';
import FeedsIndexContainer from './feeds/feeds_index_container';
import DiscoverFeedsContainer from './feeds/discover_feeds_container';
import SubscriptionStoriesIndexPopout from './stories/subscription_stories_index_popout';
import StoryShowPopout from './stories/story_show_popout';
import { receiveFeedTitle } from '../../actions/ui_actions';

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
    this.titleSent = false;
  }

  componentDidMount() {
    window.document.querySelector(".main-content").scrollTo(0,0);
    this.props.receiveFeedTitle(null);
    window.document.querySelector(".main-content")
      .addEventListener('scroll', this.onScroll, false);
  }

  componentWillReceiveProps(newProps) {
    this.componentWillUnmount();
    this.componentDidMount();
  }

  componentWillUnmount() {
    window.document.querySelector(".main-content")
      .removeEventListener('scroll', this.onScroll, false);
  }

  onScroll(e) {
    if((e.target.scrollTop > 80) && !this.titleSent) {
      this.titleSent = true;
      this.props.receiveFeedTitle(this.getTitle());
    }
    else if (e.target.scrollTop < 80) {
      this.titleSent = false;
      this.props.receiveFeedTitle(null);
    }
  }

  getTitle() {
    const path = this.props.history.location.pathname.split("/")[2];

    const sessionTitles = {
      discover: "Discover Feeds",
      feeds: "Organize Feeds",
      latest: "Latest",
      subscriptions: this.props.sessionBarTitle
    };

    return sessionTitles[path];
  }

  render () {
    return (
      <section className="main-content">
        <AuthRoute exact path="/" component={Landing} />
        <AuthRoute path="/login" component={Landing} />
        <AuthRoute path="/signup" component={Landing} />
        <ProtectedRoute path="/i/feeds" component={FeedsIndexContainer} />
        <ProtectedRoute path="/i/latest" component={SubscriptionStoriesContainer} />
        <ProtectedRoute path="/i/discover/:id" component={SubscriptionStoriesIndexPopout} />
        <ProtectedRoute path="/i/discover" component={DiscoverFeedsContainer} />
        <ProtectedRoute path="/i/subscriptions/:id" component={SubscriptionStoriesContainer} />
        <ProtectedRoute path="/i/collections/:id" component={SubscriptionStoriesContainer} />
        <ProtectedRoute path="/i/stories/:id" component={StoryShowPopout} />
        <ProtectedRoute path="/i/:prevSource/stories/:id" component={StoryShowPopout} />
        <ProtectedRoute path="/i/:prevSource/:prevId/stories/:id" component={StoryShowPopout} />
      </section>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  const feeds = state.entities.feeds.byId;
  const id = ownProps.history.location.pathname.split("/")[3];
  let feed = feeds[id];
  feed = !feed ? {subscription_title: ""} : feed;
  const sessionBarTitle = feed.subscription_title || feed.title;
  return ({ sessionBarTitle });
};

export default withRouter(connect(
  mapStateToProps,
  dispatch => ({
    receiveFeedTitle: title => dispatch(receiveFeedTitle(title))
  })
)(MainContent));
