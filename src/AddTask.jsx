// src/components/AddTask.jsx
import { useState, useContext } from 'react';
import { TaskContext } from './context/TaskContext';
import { useNavigate } from 'react-router-dom';

function AddTask() {
  const [title, setTitle] = useState('');
  const { addTask } = useContext(TaskContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title);
      setTitle('');
      navigate('/'); // Reindirizza alla lista dopo l'aggiunta
    }
  };

  return (
    <div className="container">
      <h1>Aggiungi Task</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Titolo Task:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Inserisci il titolo del task"
          />
        </label>
        <button type="submit">Aggiungi</button>
      </form>
    </div>
  );
}

export default AddTask;