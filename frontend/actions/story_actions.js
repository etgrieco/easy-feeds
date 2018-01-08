import * as StoryApiUtil from '../util/story_api_util';
import * as FeedApiUtil from '../util/feed_api_util';
import { receiveSingleFeed } from './subscription_actions';

export const RECEIVE_LATEST = 'RECEIVE_LATEST';
export const RECEIVE_READS = 'RECEIVE_READS';
export const RECEIVE_READ = 'RECEIVE_READ';
export const RECEIVE_UNREAD = 'RECEIVE_UNREAD';
export const RECEIVE_STORY = 'RECEIVE_STORY';

const commonAction = type => payload => ({
  type,
  feeds: payload.feeds,
  subscriptions: payload.subscriptions,
  stories: payload.stories
});

export const receiveLatest = commonAction(RECEIVE_LATEST);
export const receiveReads = commonAction(RECEIVE_READS);
export const receiveRead = commonAction(RECEIVE_READ);
export const receiveStory = commonAction(RECEIVE_STORY);
export const receiveUnread = commonAction(RECEIVE_UNREAD);

export const fetchStory = storyId => dispatch => (
  StoryApiUtil.fetchStory(storyId)
    .then(story => dispatch(receiveStory(story)))
);

export const fetchLatest = offset => dispatch => (
  StoryApiUtil.fetchLatest(offset)
    .then(stories => dispatch(receiveLatest(stories)))
);

export const fetchUnsubscribedFeed = feedId => dispatch => (
  FeedApiUtil.fetchUnsubscribedFeed(feedId)
    .then(feedPayload => dispatch(receiveSingleFeed(feedPayload)))
);

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
