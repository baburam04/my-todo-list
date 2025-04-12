import { useState, useEffect } from 'react';
import { getChecklists as apiGetChecklists } from '../services/checklistService';

const useChecklists = (searchQuery = '') => {
  const [checklists, setChecklists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChecklists = async () => {
      try {
        setLoading(true);
        const data = await apiGetChecklists(searchQuery);
        setChecklists(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch checklists:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChecklists();
  }, [searchQuery]);

  return { checklists, loading, error, setChecklists };
};

export default useChecklists;