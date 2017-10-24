import React from 'react';
import ReactDOM from 'react-dom';

const Root = () => <h1>Hello!</h1>;

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  ReactDOM.render(<Root />, root);
});
