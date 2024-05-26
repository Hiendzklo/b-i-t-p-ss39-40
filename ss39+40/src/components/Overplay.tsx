import React from 'react';

interface OverlayProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Overlay({ message, onConfirm, onCancel }: OverlayProps) {
  return (
    <div className="overlay">
      <div className="modal-custom">
        <div className="modal-title">
          <h4>Cảnh báo</h4>
          <i className="fa-solid fa-xmark" onClick={onCancel} />
        </div>
        <div className="modal-body-custom">
          <span>{message}</span>
        </div>
        <div className="modal-footer-custom">
          <button className="btn btn-light" onClick={onCancel}>Hủy</button>
          <button className="btn btn-danger" onClick={onConfirm}>Xác nhận</button>
        </div>
      </div>
    </div>
  );
}
