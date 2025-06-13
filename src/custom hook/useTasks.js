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
      } catch (error) {
        console.error("Errore nel recupero dei task:", error);
      }
    };

    fetchTasks();
  }, [API_URL]);

  const addTask = async (taskData) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setTasks((prevTasks) => [...prevTasks, result.task]);
        return { success: true, task: result.task };
      } else {
        throw new Error(result.message || "Errore sconosciuto durante l'aggiunta del task.");
      }
    } catch (error) {
      console.error('Errore durante l\'aggiunta del task (useTasks):', error.message);
      throw error;
    }
  };

  const removeTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData = { message: 'Errore generico durante l\'eliminazione.' };
        try {
            errorData = JSON.parse(errorText);
        } catch (parseError) {
            // Se non è JSON, il testo stesso sarà il messaggio o un default
        }
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json().catch(() => ({ success: true }));

      if (result.success) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        return { success: true };
      } else {
        throw new Error(result.message || "Errore sconosciuto durante l'eliminazione del task.");
      }
    } catch (error) {
      console.error(`Errore durante l'eliminazione del task ${taskId}:`, error.message);
      throw error;
    }
  };

  const updateTask = (id, updatedFields) => {
    // Logica per aggiornare un task (da implementare con API PUT)
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