import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = ({ onLogout }) => {
  const { currentUser } = useAuth();

  return (
    <header className="app-header">
      <div className="container">
        <div className="header-content">
          <h1 className="logo">To-Do List</h1>
          {currentUser && (
            <div className="user-actions">
              <span className="username">{currentUser.username}</span>
              <button onClick={onLogout} className="btn btn-outline">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;