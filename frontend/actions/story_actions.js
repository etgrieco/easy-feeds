import * as StoryApiUtil from '../util/story_api_util';
import * as FeedApiUtil from '../util/feed_api_util';
import { startFeedAction } from './loading_actions';
import { receiveSingleFeed } from './subscription_actions';

export const RECEIVE_LATEST = 'RECEIVE_LATEST';
export const RECEIVE_STORY = "RECEIVE_STORY";

export const receiveLatest = feedsPayload => ({
  type: RECEIVE_LATEST,
  feeds: feedsPayload.feeds,
  subscriptions: feedsPayload.subscriptions,
  stories: feedsPayload.stories
});

export const receiveStory = storyPayload => ({
  type: RECEIVE_STORY,
  feeds: storyPayload.feeds,
  subscriptions: storyPayload.subscriptions,
  stories: storyPayload.stories
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

export const fetchUnsubscribedFeed = feedId => dispatch =>  {
  return (
    FeedApiUtil.fetchUnsubscribedFeed(feedId)
      .then(
        feedPayload => dispatch(receiveSingleFeed(feedPayload))
    )
  );
};
