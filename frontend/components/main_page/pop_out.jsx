import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class PopOut extends React.Component {
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

  render() {
    const { component: Component, closePopOut } = this.props;
    return (
      <div>
        <div className="pop-out-exit noselect">
          <div className="noselect" onClick={this.props.closePopOut}>
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

export default function PopOutWithTransition(props) {
  const handleClose = e => {
    if(e.target.className === "pop-out-modal-screen") {
      props.closePopOut();
    }
  }

  return (
    <div className="pop-out-modal-screen"
      onClick={e => handleClose(e)}>
      <ReactCSSTransitionGroup
        transitionName="pop-out-transition"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionLeave={false}
        transitionEnter={false}
        >
        <PopOut {...props} />
      </ReactCSSTransitionGroup>
    </div>
  );
}
