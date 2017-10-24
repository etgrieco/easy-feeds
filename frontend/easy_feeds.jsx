import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';

//test
import * as SessionApiUtil from './util/session_api_util';
import * as SessionActions from './actions/session_actions';

const Root = () => <h1>Hello!</h1>;

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
  window.SessionApiUtil = SessionApiUtil;
  window.SessionActions = SessionActions;
  window.getState = store.getState;
  window.dispatch = store.dispatch;

  const root = document.getElementById("root");
  ReactDOM.render(<Root />, root);
});
