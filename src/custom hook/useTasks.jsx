import { useState, useEffect } from 'react';

function useTasks() {
  const [tasks, setTasks] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL; // Recupera l'URL dall'ambiente

  // Funzione per il recupero iniziale dei task (GET)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_URL}/tasks`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTasks(data);
        console.log('Tasks recuperati con useTasks:', data);
      } catch (error) {
        console.error("Errore nel recupero dei task:", error);
        // Potresti voler impostare uno stato di errore qui
      }
    };

    fetchTasks();
  }, [API_URL]); 

  // Funzioni di gestione dei task (vuote per ora, come richiesto)
  const addTask = (title) => {
    // Logica per aggiungere un task (da implementare nel prossimo milestone)
    console.log('addTask chiamata con:', title);
    // Esempio temporaneo :
    setTasks(prevTasks => [
      ...prevTasks,
      { id: Date.now(), title, status: 'To do', createdAt: new Date().toISOString() }
    ]);
  };

  const removeTask = (id) => {
    // Logica per rimuovere un task (da implementare nel prossimo milestone)
    console.log('removeTask chiamata per ID:', id);
    // Esempio temporaneo:
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const updateTask = (id, updatedFields) => {
    // Logica per aggiornare un task (da implementare nel prossimo milestone)
    console.log('updateTask chiamata per ID:', id, 'con campi:', updatedFields);
    // Esempio temporaneo:
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );
  };

  return {
    tasks,
    addTask,
    removeTask,
    updateTask,
  };
}

export default useTasks;