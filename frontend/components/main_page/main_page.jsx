import React from 'react';
import SessionBarContainer from './sessionbar/sessionbar_container';
import MainContent from './main_content';

export default (props) => {
  return (
    <main className="main-page">
      <SessionBarContainer />
      <MainContent />
    </main>
  );
};
