import React, { useState } from 'react';

interface Employee {
  id: number;
  name: string;
  dob: string;
  email: string;
  address: string;
  status: string;
}

interface ListProps {
  employees: Employee[];
  onAddNewEmployee: () => void;
  onEditEmployee: (employee: Employee) => void;
  onOpenModal: (action: () => void) => void;
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}

export default function List({ employees, onAddNewEmployee, onEditEmployee, onOpenModal, setEmployees }: ListProps) {
  const [searchEmail, setSearchEmail] = useState<string>('');

  const handleBlockEmployee = (id: number) => {
    const updatedEmployees = employees.map(emp => 
      emp.id === id ? { ...emp, status: emp.status === 'active' ? 'blocked' : 'active' } : emp
    );
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  const handleDeleteEmployee = (id: number) => {
    const updatedEmployees = employees.filter(emp => emp.id !== id);
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  const filteredEmployees = employees.filter(emp => 
    searchEmail === '' || emp.email.includes(searchEmail)
  );

  return (
    <div className="w-[80%] m-auto mt-4 h-[100vh]">
      <main className="main">
        <header className="d-flex justify-content-between mb-3">
          <h3>Nhân viên</h3>
          <button className="btn btn-primary" onClick={onAddNewEmployee}>Thêm mới nhân viên</button>
        </header>
        <div className="d-flex align-items-center justify-content-end gap-2 mb-3">
          <input
            style={{ width: 350 }}
            type="text"
            className="form-control"
            placeholder="Tìm kiếm theo email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
          <i className="fa-solid fa-arrows-rotate" title="Refresh" onClick={() => setSearchEmail('')} />
        </div>
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ và tên</th>
              <th>Ngày sinh</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>Trạng thái</th>
              <th colSpan={2}>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{index + 1}</td>
                  <td>{employee.name}</td>
                  <td>{employee.dob}</td>
                  <td>{employee.email}</td>
                  <td>{employee.address}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className={`status ${employee.status === 'active' ? 'status-active' : 'status-blocked'}`} />
                      <span>{employee.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}</span>
                    </div>
                  </td>
                  <td>
                    <span className="button button-block" onClick={() => onOpenModal(() => handleBlockEmployee(employee.id))}>
                      {employee.status === 'active' ? 'Chặn' : 'Bỏ chặn'}
                    </span>
                  </td>
                  <td>
                    <span className="button button-edit" onClick={() => onEditEmployee(employee)}>Sửa</span>
                  </td>
                  <td>
                    <span className="button button-delete" onClick={() => onOpenModal(() => handleDeleteEmployee(employee.id))}>Xóa</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center">Không có kết quả tìm kiếm</td>
              </tr>
            )}
          </tbody>
        </table>
        <footer className="d-flex justify-content-end align-items-center gap-3">
          <select className="form-select">
            <option>Hiển thị 10 bản ghi trên trang</option>
            <option>Hiển thị 20 bản ghi trên trang</option>
            <option>Hiển thị 50 bản ghi trên trang</option>
            <option>Hiển thị 100 bản ghi trên trang</option>
          </select>
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#">Previous</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">1</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">2</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">3</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>
        </footer>
      </main>
    </div>
  );
}
