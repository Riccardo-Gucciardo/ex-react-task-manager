import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import Modal from './Modal';
import EditTaskModal from './EditTaskModal';

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { removeTask, updateTask } = useContext(GlobalContext);
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then(res => res.json())
      .then(tasks => {
        const foundTask = tasks.find(t => String(t.id) === id);
        setTask(foundTask || null);
        setError(foundTask ? null : 'Task non trovato.');
        setLoading(false);
      });
  }, [id, API_URL]);

  const handleDeleteClick = async () => {
    await removeTask(id);
    navigate('/');
  };

  const handleUpdate = async updatedTask => {
    try {
      const newTask = await updateTask(updatedTask);
      setTask(newTask);
      setShowEditModal(false);
    } catch (err) {
      alert(`Errore aggiornamento task: ${err.message}`);
    }
  };

  if (loading) return <div className="container task-detail-container">Caricamento...</div>;
  if (error || !task) return <div className="container task-detail-container error-message">{error || 'Task non trovato.'}</div>;

  const formattedDate = task.createdAt
    ? new Date(task.createdAt).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : 'N/A';

  const statusClass = task.status?.toLowerCase().replace(' ', '-') || 'to-do';

  return (
    <div className="container task-detail-container">
      <h1 className="task-detail-title">Dettaglio Task: {task.title}</h1>
      <div className="task-detail-card">
        <p><strong>Nome:</strong> {task.title || 'Senza titolo'}</p>
        <p><strong>Descrizione:</strong> {task.description || 'Nessuna descrizione'}</p>
        <p><strong>Stato:</strong> <span className={`status-cell status-${statusClass}`}>{task.status || 'To do'}</span></p>
        <p><strong>Data di Creazione:</strong> {formattedDate}</p>
        <button className="green-button-large" onClick={() => setShowEditModal(true)}>Modifica Task</button>
        <button className="delete-button-large" onClick={() => setShowModal(true)}>Elimina Task</button>
        <Modal
          title="Conferma Eliminazione"
          content={<p>Sei sicuro di voler eliminare la task?</p>}
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleDeleteClick}
        />
        <EditTaskModal
          task={task}
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdate}
          modalClassName="edit-modal"
          overlayClassName="edit-modal-overlay"
        />
      </div>
    </div>
  );
}

export default TaskDetail;