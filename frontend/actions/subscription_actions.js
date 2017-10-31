import * as SubscriptionApiUtil from '../util/subscription_api_util';

export const REMOVE_FEED = 'REMOVE_FEED';
export const RECEIVE_FEED = 'RECEIVE_FEED';
export const RECEIVE_NEW_FEED = 'RECEIVE_NEW_FEED';
export const RECEIVE_SUBSCRIPTION_ERRORS = 'RECEIVE_SUBSCRIPTION_ERRORS';
export const START_FEED_ACTION = 'START_FEED_ACTION';
export const RECEIVE_ALL_SUBSCRIPTIONS = 'RECEIVE_ALL_SUBSCRIPTIONS';

export const receiveAllSubscriptions = subscriptionsPayload => ({
  type: RECEIVE_ALL_SUBSCRIPTIONS,
  feeds: subscriptionsPayload.feeds,
  subscriptions: subscriptionsPayload.subscriptions
});

export const removeFeed = feedId => ({
  type: REMOVE_FEED,
  feedId
});

export const receiveFeed = feedPayload => ({
  type: RECEIVE_FEED,
  feeds: feedPayload.feeds,
  subscriptions: feedPayload.subscriptions,
  stories: feedPayload.stories
});

export const receiveNewFeed = feedPayload => ({
  type: RECEIVE_NEW_FEED,
  feeds: feedPayload.feeds,
  subscriptions: feedPayload.subscriptions,
  stories: feedPayload.stories
});

export const startFeedAction = messages => ({
  type: START_FEED_ACTION,
  messages
});

export const receiveSubscriptionErrors = errors => ({
  type: RECEIVE_SUBSCRIPTION_ERRORS,
  errors
});

export const fetchAllSubscriptions = () => dispatch => {
  return (
    SubscriptionApiUtil.fetchAllSubscriptions()
      .then(
        subscriptionsPayload =>
          dispatch(receiveAllSubscriptions(subscriptionsPayload))
      )
  );
};

export const fetchFeed = feedId => dispatch => {
  dispatch(startFeedAction(["Loading Feed..."]));
  return (
    SubscriptionApiUtil.fetchFeed(feedId)
      .then(
        feedPayload =>
          dispatch(receiveFeed(feedPayload)),
        errors =>
          dispatch(receiveSubscriptionErrors(errors.responseJSON))
      )
  );
};

export const deleteFeed = feed => dispatch => (
  SubscriptionApiUtil.deleteSubscription(feed.subscription_id)
    .then(() => dispatch(removeFeed(feed.id)))
);

export const updateFeed = feed => dispatch => {
  const subscription = {
    title: feed.subscription_title,
    id: feed.subscription_id
  };
  dispatch(startFeedAction(["Updating Feed..."]));
  return SubscriptionApiUtil.updateSubscription(subscription)
    .then(
      updatedFeed => {
        return dispatch(receiveFeed(updatedFeed));
      },
      errors => {
        return dispatch(receiveSubscriptionErrors(errors.responseJSON));
    });
};

export const createFeed = feed => dispatch => {
  dispatch(startFeedAction(["Subscribing to Feed..."]));
  return (
    SubscriptionApiUtil.createFeed(feed)
    .then(
      newFeed => dispatch(receiveNewFeed(newFeed)),
      errors => dispatch(receiveSubscriptionErrors(errors.responseJSON)))
  );
};
