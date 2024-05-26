import React from 'react';
import { Task } from './types';

interface TaskListProps {
  tasks: Task[];
  setEditTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
  toggleTaskCompletion: (taskId: number) => void;
  activeTab: string;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setEditTask, deleteTask, toggleTaskCompletion, activeTab }) => {
  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'completed') {
      return task.completed;
    } else if (activeTab === 'incomplete') {
      return !task.completed;
    } else {
      return true;
    }
  });

  return (
    <ul className="list-group mb-0">
      {filteredTasks.map(task => (
        <li
          key={task.id}
          className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
          style={{ backgroundColor: "#f4f6f7" }}
        >
          <div>
            <input
              className="form-check-input me-2"
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.name}
            </span>
          </div>
          <div className="d-flex gap-3">
            <i className="fas fa-pen-to-square text-warning" onClick={() => setEditTask(task)} />
            <i className="far fa-trash-can text-danger" onClick={() => deleteTask(task.id)} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
