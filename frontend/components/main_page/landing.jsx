import React from 'react';
import { Route } from 'react-router-dom';
import SessionFormContainer from '../session/session_form_container';
import { connect } from 'react-redux';
import { createDemoUser } from '../../actions/session_actions';

function Landing(props) {
  return (
    <div className="landing">
      <div className="info-box background-grey">
        <section className="landing-welcome">
          <h1>Welcome to EasyFeeds</h1>
          <p>An easy way to aggregate stories from across the web.</p>
            <button
              className="green-button"
              onClick={e => props.history.push("/signup")}>
              Get Started</button>
            <button
              className="green-button demo-user"
              onClick={e => props.createDemoUser()
              }>
              Demo User
            </button>
        </section>
        <div className="landing-image-container">
          <img src="https://i.imgur.com/Exbov3T.png" />
        </div>
      </div>
      <div className="info-box background-white">
        This is a test
      </div>
      <div className="info-box background-grey">
        This is a test
      </div>
      <div className="info-box background-white">
        This is a test
      </div>

      <Route path="/login" component={SessionFormContainer} />
      <Route path="/signup" component={SessionFormContainer} />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return ({
    createDemoUser: () => dispatch(createDemoUser())
  });
};

export default connect(null, mapDispatchToProps)(Landing);
