import React from 'react';

export default class PopOut extends React.Component {

  handleEscKey = (event) => {
    if(event.keyCode === 27){
      this.props.closePopOut();
    }
  }

  componentWillMount() {
    document.addEventListener("keydown", this.handleEscKey, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEscKey, false);
  }

  handleClose = e => {
    if(e.target.className === "pop-out-modal-screen" ||
       e.target.className.includes("close-popout")
     ) { this.props.closePopOut(); }
  }

  render() {
    const { component: Component, closePopOut } = this.props;

    return (
      <div className="pop-out-modal-screen"
           onClick={e => this.handleClose(e)}>
        <div className="pop-out-exit noselect">
          <div className="close-popout noselect" onClick={e => this.handleClose(e)}>
            &#10006;
          </div>
        </div>

        <div className="pop-out-window">
          <Component />
        </div>
      </div>
    );
  }

}
