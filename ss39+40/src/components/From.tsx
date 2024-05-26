import React, { useState, useEffect } from 'react';

interface Employee {
  id: number;
  name: string;
  dob: string;
  email: string;
  address: string;
  status: string;
}

interface FromProps {
  onClose: () => void;
  onSave: (employee: Employee) => void;
  editEmployee?: Employee | null;
}

export default function From({ onClose, onSave, editEmployee }: FromProps) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (editEmployee) {
      setName(editEmployee.name);
      setDob(editEmployee.dob);
      setEmail(editEmployee.email);
      setAddress(editEmployee.address);
    }
  }, [editEmployee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSave({ id: editEmployee?.id || Date.now(), name, dob, email, address, status: 'active' });
      onClose();
    }
  };

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!name) errors.name = 'Họ và tên không được để trống.';
    if (!email) {
      errors.email = 'Email không được để trống.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email không đúng định dạng.';
    }
    if (new Date(dob) > new Date()) {
      errors.dob = 'Ngày sinh không được lớn hơn ngày hiện tại.';
    }
    return errors;
  };

  return (
    <div className="overlay">
      <form className="form" onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center">
          <h4>{editEmployee ? 'Chỉnh sửa nhân viên' : 'Thêm mới nhân viên'}</h4>
          <i className="fa-solid fa-xmark" onClick={onClose} />
        </div>
        <div>
          <label className="form-label" htmlFor="userName">Họ và tên</label>
          <input
            id="userName"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <div className="form-text error">{errors.name}</div>}
        </div>
        <div>
          <label className="form-label" htmlFor="dateOfBirth">Ngày sinh</label>
          <input
            id="dateOfBirth"
            type="date"
            className="form-control"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          {errors.dob && <div className="form-text error">{errors.dob}</div>}
        </div>
        <div>
          <label className="form-label" htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="form-text error">{errors.email}</div>}
        </div>
        <div>
          <label className="form-label" htmlFor="address">Địa chỉ</label>
          <textarea
            className="form-control"
            id="address"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="w-100 btn btn-primary">
            {editEmployee ? 'Cập nhật' : 'Thêm mới'}
          </button>
        </div>
      </form>
    </div>
  );
}
