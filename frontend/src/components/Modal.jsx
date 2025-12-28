import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>{title}</h4>
        <p>{children}</p>
        <div className="modal-actions">
          <button onClick={onClose} className="modal-cancel-btn">
            Cancel
          </button>
          <button onClick={onConfirm} className="modal-confirm-btn">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
