import React from 'react';
import { connect } from 'react-redux';

function LoadingMessages({ messages }) {
  const loadingMessages = messages.map((msg, idx) =>
    <li key={idx}>{msg}</li>
  );

  if (loadingMessages.length > 0) {
    return <div className="main-loading-messages">{loadingMessages}</div>;
  }
  return <div></div>;
};

export default connect(
  state => ({messages: state.loading.messages}),
  null
)(LoadingMessages);
