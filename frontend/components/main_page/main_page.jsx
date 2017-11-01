import React from 'react';
import SessionBarContainer from './sessionbar/sessionbar_container';
import MainContent from './main_content';
import LoadingMessagesContainer from './loading_messages_container';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PopOutContainer from './pop_out_container';

const MainPage = (props) => {
  return (
    <main className="main-page">
      <SessionBarContainer />
      {props.popOutIsOpen ? <PopOutContainer /> : null}
      <LoadingMessagesContainer />
      <MainContent />
    </main>
  );
};

const mapStateToProps = state => {

  return ({
    popOutIsOpen: state.ui.popOutIsOpen
  });

};

const mapDispatchToProps = dispatch => {
  return ({

  });
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps)(MainPage)
);
