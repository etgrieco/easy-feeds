import React from 'react';

export default function PopOut({component: Component, closePopOut}) {

  const handleClose = (e) => {
    if(e.target.className === "pop-out-modal-screen" ||
       e.target.parentElement.className.includes("pop-out-exit")
      ) { closePopOut(); }
  }

  return(
    <div className="pop-out-modal-screen"
         onClick={e => handleClose(e)}>
      <div className="pop-out-exit noselect">
        <div className="noselect" onClick={e => handleClose(e)}>
          &#10006;
        </div>
      </div>

      <div className="pop-out-window">
        <Component />
      </div>
    </div>
  );

}
