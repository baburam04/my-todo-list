import ChecklistCard from './ChecklistCard';
import './ChecklistList.css';

const ChecklistList = ({ checklists, onDelete, onTogglePin }) => {
  const pinnedChecklists = checklists.filter(checklist => checklist.pinned);
  const regularChecklists = checklists.filter(checklist => !checklist.pinned);

  return (
    <div className="checklist-list">
      {pinnedChecklists.length > 0 && (
        <div className="pinned-section">
          <h3 className="section-title">Pinned</h3>
          {pinnedChecklists.map(checklist => (
            <ChecklistCard
              key={checklist._id}
              checklist={checklist}
              onDelete={onDelete}
              onTogglePin={onTogglePin}
            />
          ))}
        </div>
      )}

      {regularChecklists.length > 0 && (
        <div className="regular-section">
          {pinnedChecklists.length > 0 && <h3 className="section-title">All</h3>}
          {regularChecklists.map(checklist => (
            <ChecklistCard
              key={checklist._id}
              checklist={checklist}
              onDelete={onDelete}
              onTogglePin={onTogglePin}
            />
          ))}
        </div>
      )}

      {checklists.length === 0 && (
        <div className="empty-state">
          <p>No checklists yet. Create one to get started!</p>
        </div>
      )}
    </div>
  );
};

export default ChecklistList;