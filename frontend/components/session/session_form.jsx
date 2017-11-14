import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends Component {

  constructor(props) {
    super(props);
    this.state = { email: "", password: "", first_name: "", last_name: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState( { [field]: e.target.value } );
  }

  handleSubmit(e) {
    e.preventDefault();
    const { processForm } = this.props;
    const credentials = Object.assign({}, this.state);
    processForm(credentials)
      .then(() => this.props.history.push("/i/latest"),
      () => {
        if (this.props.formType === 'login') {
          this.setState({ email: "", password: ""});
        }
      }
    );
  }

  newUserDetails() {
    return this.props.formType === 'signup' ?
      <div className="new-user-details">
          <input type="text"
            placeholder="First Name"
            onChange={this.update('first_name')}
            value={this.state.first_name} />
          <input type="text"
            placeholder="Last Name (optional)"
            onChange={this.update('last_name')}
            value={this.state.last_name} />
      </div>
      : "";
  }

  handleXClick(e) {
    e.preventDefault();
    this.props.clearSessionErrors();
    this.props.history.push("/");
  }

  render() {
    const { formType, errors } = this.props;
    const headerText = formType === 'signup' ? "Sign Up for EasyFeeds"
      : "Login to EasyFeeds";
    const buttonText = formType === 'signup' ? "Sign Up" : "Login";
    const otherText = formType === 'signup' ? "Existing User? Login"
      : "New User? Sign up";
    const otherLink = formType === 'signup' ? '/login' : '/signup';

    const errorItems = errors.map((error, idx) => (
      <li key={idx}>{error}</li>
    ));

    return(
      <div className="session-modal">
        <div className="session-modal-screen" onClick={e => this.handleXClick(e)}></div>

        <div className="session-form-window">
          <header className="session-modal-header">
            <button className="session-form-exit-button"
              onClick={e => this.handleXClick(e)}>&#10006;</button>
          </header>

          <div className="session-form-container">
            <form className="session-form" onSubmit={this.handleSubmit}>
              <h3>{headerText}</h3>

              <div className="credentials">
                <input type="text"
                  placeholder="Email"
                  onChange={this.update('email')}
                  value={this.state.email}/>
                <input type="password"
                  placeholder={"Password"
                    + ( formType === "signup" ?
                    " (minimum 6 characters)" : "")}
                    onChange={this.update('password')}
                    value={this.state.password} />
              </div>

              <div>
                {this.newUserDetails()}
              </div>

              <button className="green-button">{buttonText}</button>
            </form>

              <ul className="session-errors">
                {errorItems}
              </ul>

              <Link to={otherLink}
                onClick={this.props.clearSessionErrors}
                >{otherText}</Link>
            </div>
        </div>
      </div>
    );
  }
}

export default SessionForm;
