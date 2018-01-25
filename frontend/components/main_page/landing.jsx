import React from 'react';
import { Route } from 'react-router-dom';
import SessionFormContainer from '../session/session_form_container';
import { connect } from 'react-redux';
import { createDemoUser } from '../../actions/session_actions';

class Landing extends React.Component {

  componentDidMount() {
    document.querySelector(".main-content").scrollTo(0,0);
  }

  render() {
    return (
      <div className="landing">
        <div className="info-box background-grey">
          <div className="contents">
            <h1>Welcome to EasyFeeds</h1>
            <p>An easy way to aggregate stories from across the web.</p>
            <button
              className="green-button"
              onClick={e => this.props.history.push("/signup")}>
              Get Started</button>
            <button
              className="green-button demo-user"
              onClick={this.props.createDemoUser}>
              Demo User
            </button>
            <div className="landing-image-container">
              <img src="https://i.imgur.com/Exbov3T.png" />
            </div>
          </div>
        </div>

        <Route path="/login" component={SessionFormContainer} />
        <Route path="/signup" component={SessionFormContainer} />
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => {
  return ({
    createDemoUser: () => dispatch(createDemoUser())
  });
};

export default connect(null, mapDispatchToProps)(Landing);
