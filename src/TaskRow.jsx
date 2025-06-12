import { memo, useContext } from 'react';
import { GlobalContext } from './context/GlobalContext';

function TaskRow({ task }) {
  const { title, status = 'To do', createdAt } = task;
  // Assicurati di destrutturare removeTask
  const { removeTask } = useContext(GlobalContext); 

  // Formatta la data di creazione
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : 'N/A';

  // Normalizza lo status per la classe CSS
  const statusClass = status
    ? status.toLowerCase().replace(' ', '-')
    : 'to-do';

  return (
    <tr className="task-row">
      <td>{title || 'Senza titolo'}</td>
      <td className={`status-cell status-${statusClass}`}>
        {status || 'To do'}
      </td>
      <td>{formattedDate}</td>
      <td>
        <button
          className="delete-button"
          onClick={() => removeTask(task.id)} 
        >
          Elimina
        </button>
      </td>
    </tr>
  );
}

export default memo(TaskRow);