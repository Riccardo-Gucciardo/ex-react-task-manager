import { useState, useContext, useRef } from 'react';
import { GlobalContext } from './context/GlobalContext';
import { useNavigate } from 'react-router-dom';

const symbols = "!@#$%^&*()-_=+[]{}|;:'\"\\,.<>?/`~";

function AddTask() {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const descriptionRef = useRef(null);
  const statusRef = useRef(null);

  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('AddTask deve essere usato all\'interno di un GlobalContextProvider');
  }

  const { addTask } = context; // Recupera addTask dal contesto
  const navigate = useNavigate();

  const validateTitle = (inputTitle) => {
    if (!inputTitle.trim()) {
      return 'Il nome del task non può essere vuoto.';
    }
    for (let i = 0; i < inputTitle.length; i++) {
      if (symbols.includes(inputTitle[i])) {
        return 'Il nome del task non può contenere simboli speciali.';
      }
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentTitle = title.trim();
    const validationMessage = validateTitle(currentTitle);

    if (validationMessage) {
      setTitleError(validationMessage);
      return;
    }

    setTitleError('');

    const description = descriptionRef.current ? descriptionRef.current.value : '';
    const status = statusRef.current ? statusRef.current.value : 'To do';

    // Crea l'oggetto task da inviare all'API
    const newTaskPayload = {
      title: currentTitle,
      description: description,
      status: status,
      createdAt: new Date().toISOString(),
    };

    try {
      await addTask(newTaskPayload); // Passa l'intero oggetto

      alert('Task aggiunto con successo!'); // Alert di conferma
      
      // Resetta il form
      setTitle('');
      if (descriptionRef.current) descriptionRef.current.value = '';
      if (statusRef.current) statusRef.current.value = 'To do';

      navigate('/'); // Naviga alla lista task
    } catch (error) {
      alert(`Errore nell'aggiunta del task: ${error.message}`);
      console.error('Errore nel handleSubmit di AddTask:', error);
    }
  };

  return (
    <div className="container">
      <h1>Aggiungi Task</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskTitle">
          Nome del task:
          <input
            id="taskTitle"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError('');
            }}
            onBlur={() => setTitleError(validateTitle(title))}
            placeholder="Inserisci il titolo del task"
            className={titleError ? 'input-error' : ''}
          />
        </label>
        {titleError && <p className="error-message">{titleError}</p>}

        <label htmlFor="taskDescription">
          Descrizione:
          <textarea
            id="taskDescription"
            ref={descriptionRef}
            placeholder="Aggiungi una descrizione (opzionale)"
            rows="4"
          ></textarea>
        </label>

        <label htmlFor="taskStatus">
          Stato:
          <select id="taskStatus" ref={statusRef} defaultValue="To do">
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </label>

        <button type="submit">Aggiungi Task</button>
      </form>
    </div>
  );
}

export default AddTask;