import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

//test
import * as PopOutActions from './actions/popout_actions';

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
  window.PopOutActions = PopOutActions;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.SampleComponent = () => <h1>Hello!</h1>;
  window.showSampleComponent = () => window.dispatch(PopOutActions.openPopOut(<SampleComponent />));

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store}/>, root);
});
