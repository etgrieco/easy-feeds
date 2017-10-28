import React from 'react';
import { connect } from 'react-redux';

const LoadingMessages = ({ messages }) => {

  const loadingMessages = messages.map((msg, idx) =>
    <li key={idx}>{msg}</li>
  );

  return <div className="main-loading-messages">{loadingMessages}</div>;
};

const mapStateToProps = state => {
  return {
    messages: state.loading.messages
  };
};

export default connect(mapStateToProps, null)(LoadingMessages);
