import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import Modal from './modal';

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false)

  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('TaskDetail deve essere usato all\'interno di un GlobalContextProvider');
  }
  const { removeTask } = context;

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAllTasksAndFindOne = async () => {
      setLoading(true);
      setError(null);
      try {
        // Recupera tutti i task dal backend (il backend non supporta il GET per singolo ID)
        const response = await fetch(`${API_URL}/tasks`);
        if (!response.ok) {
          throw new Error(`Errore nel recupero di tutti i task (Status: ${response.status})`);
        }
        const allTasks = await response.json();
        
        // Cerca il task specifico nell'array recuperato
        const foundTask = allTasks.find(t => String(t.id) === id);

        if (foundTask) {
          setTask(foundTask);
        } else {
          setError("Task non trovato nell'elenco disponibile.");
        }
      } catch (err) {
        setError(err.message);
        console.error("Errore nel recupero dei task per dettaglio:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAllTasksAndFindOne();
    }
  }, [id, API_URL]);

  const handleDeleteClick = async () => {
    try {
      await removeTask(id);
      alert('Task eliminato con successo!');
      navigate('/');
    } catch (err) {
      alert(`Errore durante l'eliminazione del task: ${err.message}`);
      console.error("Errore nell'eliminazione del task:", err);
    }
  };

  if (loading) {
    return <div className="container task-detail-container">Caricamento task...</div>;
  }

  if (error) {
    return <div className="container task-detail-container error-message">Errore: {error}</div>;
  }

  if (!task) {
    return <div className="container task-detail-container">Task non trovato.</div>;
  }

  const formattedDate = task.createdAt
    ? new Date(task.createdAt).toLocaleDateString('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'N/A';

  const statusClass = task.status
    ? task.status.toLowerCase().replace(' ', '-')
    : 'to-do';

  return (
    <div className="container task-detail-container">
      <h1 className="task-detail-title">Dettaglio Task: {task.title}</h1>
      <div className="task-detail-card">
        <p>
          <strong>Nome:</strong> {task.title || 'Senza titolo'}
        </p>
        <p>
          <strong>Descrizione:</strong> {task.description || 'Nessuna descrizione'}
        </p>
        <p>
          <strong>Stato:</strong>{' '}
          <span className={`status-cell status-${statusClass}`}>
            {task.status || 'To do'}
          </span>
        </p>
        <p>
          <strong>Data di Creazione:</strong> {formattedDate}
        </p>
        <button className="delete-button-large" onClick={ () =>setShowModal(true)}>
          Elimina Task
        </button>
        <Modal 
          title = "Conferma Eliminazione"
          contente = {<p>Sei sicuro di voler eliminare la task?</p>}
          show = {showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleDeleteClick}
          />
      </div>
    </div>
  );
}

export default TaskDetail;