import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getTasks = async (checklistId) => {
  const response = await axios.get(`${API_URL}/checklists/${checklistId}/tasks`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

const createTask = async (checklistId, taskData) => {
  const response = await axios.post(
    `${API_URL}/checklists/${checklistId}/tasks`,
    taskData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return response.data;
};

const updateTask = async (taskId, updateData) => {
  const response = await axios.put(`${API_URL}/tasks/${taskId}`, updateData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

const deleteTask = async (taskId) => {
  await axios.delete(`${API_URL}/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const reorderTasks = async (checklistId, tasksOrder) => {
  await axios.put(
    `${API_URL}/tasks/${checklistId}/reorder`,
    { tasks: tasksOrder },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
};

export {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  reorderTasks,
};