import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ChecklistList from '../components/checklist/ChecklistList';
import ChecklistForm from '../components/checklist/ChecklistForm';
import SearchBar from '../components/common/SearchBar';
import Header from '../components/common/Header';
import './HomePage.css';

const HomePage = () => {
  const { currentUser, logout } = useAuth();
  const [checklists, setChecklists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChecklists = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from your API
        // const data = await getChecklists(searchQuery);
        // Simulated data
        const data = [
          { _id: '1', title: 'Groceries', pinned: false, user: currentUser.uid },
          { _id: '2', title: 'Work Tasks', pinned: true, user: currentUser.uid },
        ];
        setChecklists(data);
      } catch (err) {
        console.error('Failed to fetch checklists:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChecklists();
  }, [searchQuery, currentUser]);

  const handleCreateChecklist = (newChecklist) => {
    setChecklists([newChecklist, ...checklists]);
  };

  const handleDeleteChecklist = (id) => {
    setChecklists(checklists.filter(checklist => checklist._id !== id));
  };

  const handleTogglePin = (id, pinned) => {
    setChecklists(checklists.map(checklist => 
      checklist._id === id ? { ...checklist, pinned } : checklist
    ));
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  return (
    <div className="home-page">
      <Header onLogout={handleLogout} />
      <div className="container">
        <div className="home-content">
          <div className="home-header">
            <h1>My Checklists</h1>
            <SearchBar onSearch={setSearchQuery} />
          </div>
          <ChecklistForm onCreate={handleCreateChecklist} />
          {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            <ChecklistList 
              checklists={checklists} 
              onDelete={handleDeleteChecklist}
              onTogglePin={handleTogglePin}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;