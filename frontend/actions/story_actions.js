import * as StoryApiUtil from '../util/story_api_util';
import { startFeedAction } from './loading_actions';

export const RECEIVE_LATEST = 'RECEIVE_LATEST';

export const receiveLatest = feedsPayload => ({
  type: RECEIVE_LATEST,
  feeds: feedsPayload.feeds,
  subscriptions: feedsPayload.subscriptions,
  stories: feedsPayload.stories
});

export const fetchLatest = () => dispatch => {
  dispatch(startFeedAction(["Loading Feeds..."]));
  return (
    StoryApiUtil.fetchLatest()
      .then(
      stories =>
        dispatch(receiveLatest(stories))
      )
  );
};
