// src/components/AddTask.jsx
import { useState, useContext } from 'react';
import { GlobalContext } from './context/GlobalContext';
import { useNavigate } from 'react-router-dom';

function AddTask() {
  const [title, setTitle] = useState('');
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('AddTask deve essere usato all\'interno di un GlobalContextProvider');
  }

  const { addTask } = context;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title);
      setTitle('');
      navigate('/');
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