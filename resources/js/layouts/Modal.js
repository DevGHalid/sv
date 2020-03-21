import React from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal-root");

export default function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal">
      <div class="modal-dialog">
        <div class="modal-content">{children}</div>
      </div>
    </div>,
    modalRoot
  );
}
