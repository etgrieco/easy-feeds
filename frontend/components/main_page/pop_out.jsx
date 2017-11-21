import React from 'react';

export default ({ component: Component, isOpen, closePopOut }) => {

  return (
    <div className={isOpen ? "pop-out-modal" : "hidden"}>
      <div className="pop-out-modal-screen" onClick={e => {
          if(e.target.className === "pop-out-modal-screen") {
            closePopOut();
          }
        } }>
        <div className="pop-out-exit noselect">
          <div className="noselect" onClick={e => {
              if(e.target.parentElement.className.includes("pop-out-exit")) {
                closePopOut();
              }}}>
            &#10006;
          </div>
        </div>
        <div className="pop-out-window">
          {isOpen ? <Component /> : null}
        </div>
      </div>
    </div>);
};
