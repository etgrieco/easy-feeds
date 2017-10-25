import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends Component {

  constructor(props) {
    super(props);
    this.state = { email: "", password: "", first_name: "", last_name: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearErrors = this.props.clearSessionErrors; // for semantic ease
  }

  update(field) {
    return e => this.setState( { [field]: e.target.value } );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.clearErrors();
    const { processForm } = this.props;
    const credentials = Object.assign({}, this.state);
    processForm(credentials)
      .then(() => this.props.history.push("/"),
      () => this.setState({ email: "", password: ""}));
  }

  userCreationDetails() {
    return this.props.formType === 'signup' ?
      <div className="user-details">
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

  handleXClick() {
    return e => {
      e.preventDefault();
      this.props.history.push("/");
      this.clearErrors();
    };
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
        <div className="session-modal-screen"></div>

        <div className="session-modal-form-container">
          <header className="session-modal-header">
            <button className="session-form-exit-button"
              onClick={this.handleXClick()}>&#10006;</button>
          </header>
          <div className="session-modal-form">
            <h3>{headerText}</h3>
            <form className="session-form" onSubmit={this.handleSubmit}>
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

                {this.userCreationDetails()}

                <button className="green-button">{buttonText}</button>
              </form>

              <div className="session-form-supplement">
                <Link to={otherLink}
                  onClick={this.clearErrors}
                  >{otherText}</Link>

                <ul className="session-errors">
                  {errorItems}
                </ul>
              </div>

            </div>
        </div>
      </div>
    );
  }
}

export default SessionForm;
