import * as FeedApiUtil from '../util/feed_api_util';

export const RECEIVE_FEEDS_RESULTS = 'RECEIVE_FEEDS_RESULTS';

export const receiveFeedResults = feedsPayload => ({
  type: RECEIVE_FEEDS_RESULTS,
  feeds: feedsPayload.feeds,
  results: feedsPayload.results
});

export const fetchFeedResults = query => dispatch => {
  return FeedApiUtil.fetchFeedResults(query)
    .then(feedsPayload => dispatch(receiveFeedResults(feedsPayload)));
};
