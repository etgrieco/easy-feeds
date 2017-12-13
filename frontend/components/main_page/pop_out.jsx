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
    const { component: Component, closePopOut } = this.props;
    return (
      <aside style={{width: "100vw"}} id="pop-out">
        <div className="pop-out-exit noselect">
          <div className="noselect" onClick={e => this.props.handleClose()}>
            &#10006;
          </div>
        </div>

        <div className="pop-out-window">
          <Component />
        </div>
      </aside>
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
          this.props.closePopOut();
        }, 300);
      this.timeouts.push(timeout);
    });
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
      <div className={"pop-out-screen" +
        (this.state.appeared ? "" : "-appearing")
      } onClick={e => { if(e.target.id === "pop-out") { this.handleClose(); }}}>
        <div
          className={"pop-out-transition" +
            (this.state.appeared ? "" : "-appearing" )
          }>
          <PopOut {...this.props} handleClose={this.handleClose} />
        </div>
      </div>
    );
  }
}
