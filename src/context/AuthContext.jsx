import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as authLogin, register as authRegister, logout as authLogout } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in (e.g., check localStorage or make API call)
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const user = await authLogin(email, password);
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (err) {
      throw err;
    }
  };

  const register = async (username, email, password) => {
    try {
      const user = await authRegister(username, email, password);
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    await authLogout();
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}