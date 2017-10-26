import * as SubscriptionApiUtil from '../util/subcription_api_util';

// export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ALL_SUBSCRIPTIONS = 'RECEIVE_ALL_SUBSCRIPTIONS';

export const receiveAllSubscriptions = feedsPayload => ({
  type: RECEIVE_ALL_SUBSCRIPTIONS,
  feeds: feedsPayload.feeds,
  subcriptions: feedsPayload.subcriptions
});

export const fetchAllSubscriptions = () => dispatch => (
  SubscriptionApiUtil.fetchSubscriptions
    .then(subscriptionsPayload =>
      dispatch(receiveAllSubscriptions(subscriptionsPayload))
      // ,
      // errors => dispatch(receiveErrors(errors))
    )
);
