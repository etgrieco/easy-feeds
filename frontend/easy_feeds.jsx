import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

//test
import * as SubscriptionActions from './actions/subscription_actions';
import * as SubscriptionApiUtil from './util/subscription_api_util';
import * as FeedApiUtil from './util/feed_api_util';

document.addEventListener("DOMContentLoaded", () => {

  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  //test
  window.SubscriptionApiUtil = SubscriptionApiUtil;
  window.SubscriptionActions = SubscriptionActions;

  window.getState = store.getState;
  window.dispatch = store.dispatch;

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store}/>, root);
});
