import React from 'react';
import MainPage from './main_page/main_page';
import NavBar from './navbar/navbar';
import { AuthRoute, ProtectedRoute } from '../util/route_util.js';

const App = () => (
  <div className="app-wrapper">
    <ProtectedRoute path="/i" component={NavBar} />
    <MainPage />
  </div>
);

export default App;
