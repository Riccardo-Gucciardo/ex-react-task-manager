import { useState, useRef } from 'react';
import Modal from './Modal';

export default function EditTaskModal({ show, onClose, task, onSave }) {
  const [editedTask, setEditedTask] = useState(task || { title: '', description: '', status: 'To Do' });
  const editFormRef = useRef();

  const changeEditedTask = (key, event) => {
    setEditedTask(prev => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!editedTask.title.trim()) {
      alert('Il titolo del task è obbligatorio!');
      return;
    }
    onSave(editedTask);
    onClose();
  };

  return (
    <Modal
      title="Modifica Task"
      content={
        <form ref={editFormRef} onSubmit={handleSubmit}>
          <label>
            Nome Task:
            <input
              type="text"
              value={editedTask.title || ''}
              onChange={e => changeEditedTask('title', e)}
            />
          </label>
          <label>
            Descrizione:
            <textarea
              value={editedTask.description || ''}
              onChange={e => changeEditedTask('description', e)}
            />
          </label>
          <label>
            Stato:
            <select
              value={editedTask.status || 'To Do'}
              onChange={e => changeEditedTask('status', e)}
            >
              {['To Do', 'Doing', 'Done'].map((value, index) => (
                <option key={index} value={value}>{value}</option>
              ))}
            </select>
          </label>
        </form>
      }
      confirmText="Salva"
      show={show}
      onClose={onClose}
      onConfirm={() => editFormRef.current.requestSubmit()}
    />
  );
}