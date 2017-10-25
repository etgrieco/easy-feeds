import React from 'react';
import SessionBarContainer from './sessionbar/sessionbar_container';
import MainPage from './main_page/main_page';
import NavBar from './navbar/navbar';
import { AuthRoute, ProtectedRoute } from '../util/route_util.js';

const App = () => (
  <div>
    <SessionBarContainer />
    <div className="app-wrapper">
      <ProtectedRoute path="/latest" component={NavBar} />
      <MainPage />
    </div>
  </div>
);

export default App;
