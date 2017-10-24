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
        <label>First Name
          <input type="text"
            onChange={this.update('first_name')}
            value={this.state.first_name} />
        </label>
        <label>Last Name
          <input type="text"
            onChange={this.update('last_name')}
            value={this.state.last_name} />
        </label>
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
    const text = formType === 'signup' ? "Sign Up" : "Log In";
    const otherText = formType === 'signup' ? "Log In" : "Sign Up";
    const otherLink = formType === 'signup' ? '/login' : '/signup';

    const errorItems = errors.map((error, idx) => (
      <li key={idx}>{error}</li>
    ));

    return(
      <div>
        <button onClick={this.handleXClick()}>x</button>

        <h3>{text}</h3>
        <form className="sesssion-form" onSubmit={this.handleSubmit}>
          <label>Email
            <input type="text"
              onChange={this.update('email')}
              value={this.state.email}/>
          </label>
          <label>Password
            <input type="password"
              onChange={this.update('password')}
              value={this.state.password} />
          </label>

          {this.userCreationDetails()}

          <button>{text}</button>
        </form>
        <Link to={otherLink}
          onClick={this.clearErrors}
          >{otherText}</Link>

        <ul>
          {errorItems}
        </ul>
      </div>
    );
  }
}

export default SessionForm;
