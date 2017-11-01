import React from 'react';
import SessionBarContainer from './sessionbar/sessionbar_container';
import MainContent from './main_content';
import LoadingMessagesContainer from './loading_messages_container';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const PopOutContainer = () => {
  return (<div></div>);
};

const MainPage = (props) => {
  return (
    <main className="main-page">
      <SessionBarContainer />
      <LoadingMessagesContainer />
      <MainContent />
      {props.popOutIsOpen ? <PopOutContainer /> : null}
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
