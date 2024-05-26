import React, { useState, useEffect } from 'react';
import { Task } from './types';

interface TaskFormProps {
  addTask: (task: Task) => void;
  editTask: Task | null;
  updateTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask, editTask, updateTask }) => {
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    if (editTask) {
      setTaskName(editTask.name);
    }
  }, [editTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim()) {
      alert('Tên công việc không được để trống');
      return;
    }

    const newTask: Task = {
      id: editTask ? editTask.id : new Date().getTime(),
      name: taskName,
      completed: editTask ? editTask.completed : false,
    };

    if (editTask) {
      updateTask(newTask);
    } else {
      addTask(newTask);
    }

    setTaskName('');
  };

  return (
    <form className="d-flex justify-content-center align-items-center mb-4" onSubmit={handleSubmit}>
      <div className="form-outline flex-fill">
        <input
          type="text"
          id="taskName"
          className="form-control"
          placeholder="Nhập tên công việc"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>
      <button type="submit" className="btn ms-2 btn-info">
        {editTask ? 'Sửa' : 'Thêm'}
      </button>
    </form>
  );
};

export default TaskForm;
