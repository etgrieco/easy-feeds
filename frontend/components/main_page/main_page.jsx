import React from 'react';
import SessionBarContainer from './sessionbar/sessionbar_container';
import MainContent from './main_content';
import LoadingMessagesContainer from './loading_messages_container';
import { withRouter } from 'react-router-dom';

const MainPage = props => {
  return (
    <main className="main-page">
      <SessionBarContainer />
      <LoadingMessagesContainer />
      <MainContent />
    </main>
  );
};

export default withRouter(MainPage);
