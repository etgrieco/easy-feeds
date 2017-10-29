import React from 'react';
import { connect } from 'react-redux';

const LoadingMessages = ({ messages }) => {

  const loadingMessages = messages.map((msg, idx) =>
    <li key={idx}>{msg}</li>
  );

  if (loadingMessages.length > 0) {
    return <div className="main-loading-messages">{loadingMessages}</div>;
  }
  return <div></div>;
};

const mapStateToProps = state => {
  return {
    messages: state.loading.messages
  };
};

export default connect(mapStateToProps, null)(LoadingMessages);
