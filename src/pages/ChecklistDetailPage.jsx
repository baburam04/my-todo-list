import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import TaskList from '../components/task/TaskList';
import Header from '../components/common/Header';
import { getChecklist, updateChecklist, deleteChecklist } from '../services/checklistService';
import { getTasks, createTask, updateTask, deleteTask, reorderTasks } from '../services/taskService';
import './ChecklistDetailPage.css';

const ChecklistDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [checklist, setChecklist] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const checklistData = await getChecklist(id);
        const tasksData = await getTasks(id);
        
        if (checklistData.user !== currentUser._id) {
          throw new Error('Not authorized to view this checklist');
        }
        
        setChecklist(checklistData);
        setTasks(tasksData);
        setError('');
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch checklist:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, currentUser]);

  const handleTaskCreate = async (newTask) => {
    try {
      const createdTask = await createTask(id, newTask);
      setTasks([...tasks, createdTask]);
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  const handleTaskUpdate = async (taskId, updates) => {
    try {
      const updatedTask = await updateTask(taskId, updates);
      setTasks(tasks.map(task => 
        task._id === taskId ? updatedTask : task
      ));
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const handleTaskReorder = async (oldIndex, newIndex) => {
    try {
      const reorderedTasks = [...tasks];
      const [movedTask] = reorderedTasks.splice(oldIndex, 1);
      reorderedTasks.splice(newIndex, 0, movedTask);
      
      // Update local state optimistically
      setTasks(reorderedTasks);
      
      // Send update to server
      await reorderTasks(id, reorderedTasks.map((task, index) => ({
        _id: task._id,
        order: index,
      })));
    } catch (err) {
      console.error('Failed to reorder tasks:', err);
    }
  };

  const handleChecklistDelete = async () => {
    try {
      await deleteChecklist(id);
      navigate('/');
    } catch (err) {
      console.error('Failed to delete checklist:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="checklist-detail-page">
      <Header onLogout={handleLogout} />
      <div className="container">
        <div className="checklist-detail-content">
          <div className="checklist-header">
            <h1>{checklist?.title}</h1>
            <button 
              onClick={handleChecklistDelete} 
              className="btn btn-outline delete-checklist-btn"
            >
              Delete Checklist
            </button>
          </div>
          
          <TaskList
            tasks={tasks}
            onTaskCreate={handleTaskCreate}
            onTaskUpdate={handleTaskUpdate}
            onTaskDelete={handleTaskDelete}
            onTaskReorder={handleTaskReorder}
          />
        </div>
      </div>
    </div>
  );
};

export default ChecklistDetailPage;