import * as StoryApiUtil from '../util/story_api_util';
import * as FeedApiUtil from '../util/feed_api_util';
import { startFeedAction } from './loading_actions';
import { receiveSingleFeed } from './subscription_actions';

export const RECEIVE_LATEST = 'RECEIVE_LATEST';
export const RECEIVE_READS = 'RECEIVE_READS';
export const RECEIVE_STORY = 'RECEIVE_STORY';

export const receiveLatest = feedsPayload => ({
  type: RECEIVE_LATEST,
  feeds: feedsPayload.feeds,
  subscriptions: feedsPayload.subscriptions,
  stories: feedsPayload.stories
});

export const receiveReads = feedsPayload => ({
  type: RECEIVE_READS,
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

export const fetchStory = storyId => dispatch => {
  return (
    StoryApiUtil.fetchStory(storyId)
      .then(
        story => dispatch(receiveStory(story))
      )
  );
};

export const fetchLatest = offset => dispatch => {
  dispatch(startFeedAction(["Loading Feeds..."]));
  return (
    StoryApiUtil.fetchLatest(offset)
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

export const readStory = id => dispatch => (
  StoryApiUtil.readStory(id)
    .then(story => dispatch(receiveStory(story)))
);

export const unreadStory = id => dispatch => (
  StoryApiUtil.unreadStory(id)
    .then(story => dispatch(receiveStory(story)))
);

export const fetchReads = (offset) => dispatch => (
  StoryApiUtil.fetchReads(offset)
    .then(stories => dispatch(receiveReads(stories)))
);
