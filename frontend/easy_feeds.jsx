import React from 'react';
import ReactDOM from 'react-dom';

//test
import * as UsersApiUtils from './util/users_api';

const Root = () => <h1>Hello!</h1>;

document.addEventListener("DOMContentLoaded", () => {

  //test
  window.UsersApiUtils = UsersApiUtils;

  const root = document.getElementById("root");
  ReactDOM.render(<Root />, root);
});
