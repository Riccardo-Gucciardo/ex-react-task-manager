import { useState, useEffect } from 'react';

function useTasks() {
  const [tasks, setTasks] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

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
      }
    };

    fetchTasks();
  }, [API_URL]);

  // Modifica la funzione addTask per accettare un oggetto taskData
  const addTask = async (taskData) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData), // Invia l'oggetto taskData come JSON
      });

      if (!response.ok) {
        // Se la risposta HTTP non è 2xx, prova a leggere l'errore dal body
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Se l'API restituisce successo, aggiungi la task ricevuta allo stato
        setTasks((prevTasks) => [...prevTasks, result.task]);
        console.log('Task aggiunto con successo (API):', result.task);
        return { success: true, task: result.task }; // Restituisce il successo
      } else {
        throw new Error(result.message || "Errore sconosciuto durante l'aggiunta del task.");
      }
    } catch (error) {
      console.error('Errore durante l\'aggiunta del task (useTasks):', error.message);
      throw error;
    }
  };


  const removeTask = (id) => {
    console.log('removeTask chiamata per ID (solo locale per ora):', id);
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const updateTask = (id, updatedFields) => {
    console.log('updateTask chiamata per ID (solo locale per ora):', id, 'con campi:', updatedFields);
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