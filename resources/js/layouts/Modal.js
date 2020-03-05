import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal-root");

export default function Modal({ title, children, onClose }) {
 useEffect(() => {
  document.body.classList.add("modal-open");

  return () => {
   document.body.classList.remove("modal-open");
  };
 });

 return ReactDOM.createPortal(
  <div className="modal modal-active d-block">
   <div className="modal-dialog" role="document">
    <div className="modal-content">
     <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">
       {title}
      </h5>
      <span className="modal-close" onClick={onClose}>
       <i className="fe fe-x"></i>
      </span>
     </div>
     <div className="modal-body pb-0">{children}</div>
    </div>
   </div>
  </div>,
  modalRoot
 );
}
