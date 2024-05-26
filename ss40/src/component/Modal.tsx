import React from 'react';

interface ModalProps {
  title: string;
  message: string;
  confirmAction: () => void;
  cancelAction: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, message, confirmAction, cancelAction }) => {
  return (
    <div className="overlay">
      <div className="modal-custom">
        <div className="modal-header-custom">
          <h5>{title}</h5>
          <i className="fas fa-xmark" onClick={cancelAction} />
        </div>
        <div className="modal-body-custom">
          <p>{message}</p>
        </div>
        <div className="modal-footer-custom">
          <button className="btn btn-light" onClick={cancelAction}>Hủy</button>
          <button className="btn btn-danger" onClick={confirmAction}>Xác nhận</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
