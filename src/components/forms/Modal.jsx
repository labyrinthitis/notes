import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

const Modal = ({ children, activator }) => {
  const [show, setShow] = useState(false)

  const submitOnKey = event => {
    if (event.key === "Enter") {
      setShow(false);
    }
  }

  const content = (
    <div className="overlay">
      <div className="modal" onKeyDown={event => submitOnKey(event)}> 
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )

  return (
    <>
      {activator({ setShow })}
      {createPortal(
        <CSSTransition
          in={show}
          timeout={120}
          classNames="modal-transition"
          unmountOnExit
        >
          {() => <div>{content}</div>}
        </CSSTransition>,
        document.body
      )}
    </>
  )
}

export default Modal;