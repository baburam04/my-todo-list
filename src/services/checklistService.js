import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getChecklists = async (query = '') => {
  const response = await axios.get(`${API_URL}/checklists`, {
    params: { query },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

const getChecklist = async (id) => {
  const response = await axios.get(`${API_URL}/checklists/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

const createChecklist = async (checklistData) => {
  const response = await axios.post(`${API_URL}/checklists`, checklistData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

const updateChecklist = async (id, updateData) => {
  const response = await axios.put(`${API_URL}/checklists/${id}`, updateData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

const deleteChecklist = async (id) => {
  await axios.delete(`${API_URL}/checklists/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export {
  getChecklists,
  getChecklist,
  createChecklist,
  updateChecklist,
  deleteChecklist,
};