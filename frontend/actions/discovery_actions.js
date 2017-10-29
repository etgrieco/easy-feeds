import * as FeedApiUtil from '../util/feed_api_util';

export const RECEIVE_FEEDS_RESULTS = 'RECEIVE_FEEDS_RESULTS';

export const receiveFeeds = feedsPayload => ({
  type: RECEIVE_FEEDS_RESULTS,
  feeds: feedsPayload.feeds,
  results: feedsPayload.results
});

export const fetchFeedResults = query => dispatch => {
  return FeedApiUtil.fetchFeeds(query)
    .then( feedsPayload => dispatch(receiveFeeds(feedsPayload)));
};
