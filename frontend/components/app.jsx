import React from 'react';
import { Route } from 'react-router-dom';
import SessionBar from './sessionbar/sessionbar';
import MainPage from './main_page/main_page';

const App = () => (
  <div>
    <SessionBar />
    <MainPage />
  </div>
);

export default App;
