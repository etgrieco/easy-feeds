import React from 'react';

class PopOut extends React.Component {
  handleEscKey = (event) => {
    if(event.keyCode === 27){
      this.props.handleClose();
    }
  }

  componentWillMount() {
    document.addEventListener("keydown", this.handleEscKey, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEscKey, false);
  }

  render() {
    const { closePopOut, handleClose, children } = this.props;
    return (
        <div className="pop-out-window">
          <div className="pop-out-exit noselect">
            <div className="noselect" onClick={handleClose}>&#10006;</div>
          </div>
          {children}
        </div>
    );
  }

}

export default class PopOutWithTransition extends React.Component {
  state = { appeared: false }
  timeouts = [];

  handleClose = () => {
    this.setState({ appeared: false },
      () => {
        const timeout = setTimeout(() => {
          this.props.history.push(this.props.closePath);
        }, 300);
      this.timeouts.push(timeout);
    });
  }

  handleClick = e => {
    if(e.target.className === "pop-out-screen") {
      this.handleClose();
    }
  }

  componentDidMount(){
    const timeout = setTimeout(() => {
      this.setState({appeared: true});
    }, 0)
    this.timeouts.push(timeout);
  }

  componentWillUnmount() {
    this.timeouts.forEach(to => clearTimeout(to));
  }

  render() {
    return (
        <div onClick={this.handleClick} className={"pop-out-screen" +
          (this.state.appeared ? "" : " appearing")
        }>
          <PopOut {...this.props} handleClose={this.handleClose}>
            {this.props.children}
          </PopOut>
        </div>
    );
  }
}
