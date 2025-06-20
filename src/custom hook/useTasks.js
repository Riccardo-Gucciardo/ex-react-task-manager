import { useState, useEffect } from 'react';

function useTasks() {
  const [tasks, setTasks] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then(res => res.json())
      .then(setTasks);
  }, [API_URL]);

  const addTask = async taskData => {
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
    const data = await res.json();
    setTasks(prev => [...prev, data.task || data]);
  };

  const removeTask = async taskId => {
    await fetch(`${API_URL}/tasks/${taskId}`, { method: 'DELETE' });
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const updateTask = async updatedTask => {
    const res = await fetch(`${API_URL}/tasks/${updatedTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    const data = await res.json();
    const newTask = data.task || data; // Fallback se 'task' non esiste
    setTasks(prev => prev.map(t => (t.id === newTask.id ? newTask : t)));
    return newTask; // Ritorna il task per aggiornare lo stato locale in TaskDetail
  };

  return { tasks, addTask, removeTask, updateTask };
}

export default useTasks;