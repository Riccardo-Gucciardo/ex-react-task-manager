// src/context/GlobalContext.jsx
import { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // Funzione per aggiungere un task (temporanea, senza API)
  const addTask = (title) => {
    setTasks((prevTasks) => [...prevTasks, { id: Date.now(), title }]);
  };

  // Funzione per eliminare un task
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
        if (!response.ok) {
          throw new Error('Errore nel recupero dei task');
        }
        const data = await response.json();
        console.log('Task ricevuti:', data);
        setTasks(data);
      } catch (error) {
        console.error('Errore:', error.message);
      }
    };

    fetchTasks();
  }, []);

  return (
    <GlobalContext.Provider value={{ tasks, setTasks, addTask, deleteTask }}>
      {children}
    </GlobalContext.Provider>
  );
}