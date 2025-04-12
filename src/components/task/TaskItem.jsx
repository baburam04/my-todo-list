import { useState } from 'react';
import { FiTrash2, FiMoreVertical } from 'react-icons/fi';
import './TaskItem.css';

const TaskItem = ({ 
  task, 
  onUpdate, 
  onDelete 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task.description);

  const handleCompleteToggle = () => {
    onUpdate(task._id, { completed: !task.completed });
  };

  const handleDescriptionUpdate = () => {
    if (description.trim() !== '') {
      onUpdate(task._id, { description });
      setIsEditing(false);
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleCompleteToggle}
          className="task-checkbox"
        />
        {isEditing ? (
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={handleDescriptionUpdate}
            onKeyPress={(e) => e.key === 'Enter' && handleDescriptionUpdate()}
            autoFocus
            className="task-edit-input"
          />
        ) : (
          <div 
            className="task-description"
            onClick={() => setIsEditing(true)}
          >
            {task.description}
          </div>
        )}
      </div>
      <div className="task-actions">
        <button className="delete-btn" onClick={() => onDelete(task._id)}>
          <FiTrash2 />
        </button>
        <button className="more-btn">
          <FiMoreVertical />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;