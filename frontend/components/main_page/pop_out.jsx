import React from 'react';

export default ({ component: Component, isOpen, closePopOut }) => {

  return (
    <div className={isOpen ? "pop-out-modal" : "hidden"}>
      <div className="pop-out-modal-screen" onClick={e => closePopOut() }>
        <div className="pop-out-exit noselect"><div>&#10006;</div></div>
        <div className="pop-out-window">
          {isOpen ? <Component /> : null}
        </div>
      </div>
    </div>);
};
