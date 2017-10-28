import React from 'react';
import SessionBarContainer from './sessionbar/sessionbar_container';
import MainContent from './main_content';
import LoadingMessagesContainer from './loading_messages_container';

export default (props) => {
  return (
    <main className="main-page">
      <SessionBarContainer />
      <LoadingMessagesContainer />
      <MainContent />
    </main>
  );
};
