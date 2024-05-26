import React, { useState, useEffect } from 'react';
import From from './components/From';
import Overlay from './components/Overplay';
import List from './components/List';

interface Employee {
  id: number;
  name: string;
  dob: string;
  email: string;
  address: string;
  status: string;
}

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState<() => void>(() => () => {});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    setEmployees(storedEmployees);
  }, []);

  const handleAddNewEmployee = () => {
    setEditEmployee(null);
    setIsFormOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditEmployee(employee);
    setIsFormOpen(true);
  };

  const handleSaveEmployee = (employee: Employee) => {
    const updatedEmployees = [...employees];
    const existingEmployeeIndex = updatedEmployees.findIndex((emp) => emp.id === employee.id);
    if (existingEmployeeIndex >= 0) {
      updatedEmployees[existingEmployeeIndex] = employee;
    } else {
      updatedEmployees.push(employee);
    }
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  const handleOpenModal = (message: string, action: () => void) => {
    setModalMessage(message);
    setModalAction(() => action);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <List
        employees={employees}
        onAddNewEmployee={handleAddNewEmployee}
        onEditEmployee={handleEditEmployee}
        onOpenModal={(action) => handleOpenModal('Bạn có chắc chắn muốn thực hiện hành động này?', action)}
        setEmployees={setEmployees}
      />
      {isFormOpen && (
        <From
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveEmployee}
          editEmployee={editEmployee}
        />
      )}
      {isModalOpen && (
        <Overlay
          message={modalMessage}
          onConfirm={() => {
            modalAction();
            handleCloseModal();
          }}
          onCancel={handleCloseModal}
        />
      )}
    </>
  );
}
