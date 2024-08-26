import React from 'react';
import './petseditform.css'; // Ensure this path is correct

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p className="modal-close" onClick={onClose}>X</p>
        {children}
      </div>
    </div>
  );
};

export default Modal;
