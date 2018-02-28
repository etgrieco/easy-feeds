import React from 'react';
import MainPage from './main_page/main_page';
import NavBarContainer from './navbar/navbar_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util.jsx';

const App = () => (
  <div className="app-wrapper">
    <ProtectedRoute path="/i" component={NavBarContainer} />
    <MainPage />
  </div>
);

export default App;
