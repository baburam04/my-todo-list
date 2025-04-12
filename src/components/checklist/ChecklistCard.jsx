import { Link } from 'react-router-dom';
import { FiPin, FiTrash2, FiMoreVertical } from 'react-icons/fi';
import './ChecklistCard.css';

const ChecklistCard = ({ checklist, onDelete, onTogglePin }) => {
  return (
    <div className={`checklist-card ${checklist.pinned ? 'pinned' : ''}`}>
      <div className="checklist-header">
        <button 
          className="pin-btn" 
          onClick={() => onTogglePin(checklist._id, !checklist.pinned)}
        >
          <FiPin className={checklist.pinned ? 'pinned-icon' : ''} />
        </button>
        <h3>
          <Link to={`/checklists/${checklist._id}`}>{checklist.title}</Link>
        </h3>
        <div className="checklist-actions">
          <button className="delete-btn" onClick={() => onDelete(checklist._id)}>
            <FiTrash2 />
          </button>
          <button className="more-btn">
            <FiMoreVertical />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChecklistCard;