import { useState } from 'react';
import './ChecklistForm.css';

const ChecklistForm = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [pinned, setPinned] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onCreate({
      title: title.trim(),
      pinned,
      _id: Date.now().toString(), // Temporary ID for frontend
    });
    
    setTitle('');
    setPinned(false);
  };

  return (
    <form onSubmit={handleSubmit} className="checklist-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Create a new checklist..."
        className="checklist-input"
      />
      <div className="checklist-options">
        <label className="pin-checkbox">
          <input
            type="checkbox"
            checked={pinned}
            onChange={(e) => setPinned(e.target.checked)}
          />
          <span>Pin</span>
        </label>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </div>
    </form>
  );
};

export default ChecklistForm;