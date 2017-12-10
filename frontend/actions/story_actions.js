import * as StoryApiUtil from '../util/story_api_util';
import * as FeedApiUtil from '../util/feed_api_util';
import { receiveSingleFeed } from './subscription_actions';

export const RECEIVE_LATEST = 'RECEIVE_LATEST';
export const RECEIVE_READS = 'RECEIVE_READS';
export const RECEIVE_READ = 'RECEIVE_READ';
export const RECEIVE_UNREAD = 'RECEIVE_UNREAD';
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

export const receiveRead = storyPayload => ({
  type: RECEIVE_READ,
  feeds: storyPayload.feeds,
  subscriptions: storyPayload.subscriptions,
  stories: storyPayload.stories
});

export const receiveUnread = storyPayload => ({
  type: RECEIVE_UNREAD,
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
    .then(storyPayload => dispatch(receiveRead(storyPayload)))
);

export const unreadStory = id => dispatch => (
  StoryApiUtil.unreadStory(id)
    .then(storyPayload => dispatch(receiveUnread(storyPayload)))
);

export const fetchReads = (offset) => dispatch => (
  StoryApiUtil.fetchReads(offset)
    .then(stories => dispatch(receiveReads(stories)))
);
