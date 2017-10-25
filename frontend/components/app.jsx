import React from 'react';
import SessionBarContainer from './sessionbar/sessionbar_container';
import MainPage from './main_page/main_page';
import NavBar from './navbar/navbar';

const App = () => (
  <div>
    <SessionBarContainer />
    <NavBar />
    <MainPage />
  </div>
);

export default App;
