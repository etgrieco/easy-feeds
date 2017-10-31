import * as StoryApiUtil from '../util/story_api_util';

export const RECEIVE_LATEST = 'RECEIVE_LATEST';
export const START_FEED_ACTION = 'START_FEED_ACTION';

export const receiveLatest = feedsPayload => ({
  type: RECEIVE_LATEST,
  feeds: feedsPayload.feeds,
  subscriptions: feedsPayload.subscriptions,
  stories: feedsPayload.stories
});

export const fetchLatest = () => dispatch => {
  // dispatch(startFeedAction(["Loading Feeds..."]));
  return (
    StoryApiUtil.fetchLatest()
      .then(
      stories =>
        dispatch(receiveLatest(stories))
      )
  );
};
