import { useState } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import './TaskList.css';

const SortableItem = SortableElement(({ task, onUpdate, onDelete }) => (
  <TaskItem 
    task={task} 
    onUpdate={onUpdate} 
    onDelete={onDelete} 
  />
));

const SortableList = SortableContainer(({ tasks, onUpdate, onDelete }) => (
  <div className="task-list-container">
    {tasks.map((task, index) => (
      <SortableItem 
        key={`item-${task._id}`} 
        index={index}
        task={task}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    ))}
  </div>
));

const TaskList = ({ 
  tasks, 
  onTaskCreate, 
  onTaskUpdate, 
  onTaskDelete,
  onTaskReorder 
}) => {
  const [newTask, setNewTask] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    onTaskCreate({
      description: newTask.trim(),
      completed: false,
      order: tasks.length,
      _id: Date.now().toString(), // Temporary ID for frontend
    });
    
    setNewTask('');
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    onTaskReorder(oldIndex, newIndex);
  };

  return (
    <div className="task-list">
      <h2 className="task-list-title">Tasks</h2>
      
      <form onSubmit={handleCreate} className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
        />
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>

      {tasks.length > 0 ? (
        <SortableList 
          tasks={tasks} 
          onUpdate={onTaskUpdate}
          onDelete={onTaskDelete}
          onSortEnd={onSortEnd}
          useDragHandle
          lockAxis="y"
        />
      ) : (
        <div className="empty-tasks">
          <p>No tasks yet. Add one to get started!</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;