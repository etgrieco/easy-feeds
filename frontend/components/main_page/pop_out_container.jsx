import React from 'react';
import { connect } from 'react-redux';
import { closePopOut } from '../../actions/popout_actions';
import StoriesIndexContainer from './stories/subscription_stories_container';

const PopOut = ({ component, isOpen, closePopOut }) => {
  return (
    <div className={isOpen ? "pop-out-modal" : "hidden"}>
      <div className="pop-out-modal-screen" onClick={e => closePopOut() }>
      </div>

      <div className="pop-out-window">
        {component}
      </div>
    </div>);
};


const PopOutContainer = connect(
  ({ ui: { component } }) => ({ component: component, isOpen: Boolean(component) }),
  dispatch => ({ closePopOut: () => dispatch(closePopOut()) })
)(PopOut);

export default PopOutContainer;
