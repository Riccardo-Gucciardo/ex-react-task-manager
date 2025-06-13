// src/components/TaskRow.jsx
import { memo } from 'react'; 
import { NavLink } from 'react-router-dom';

function TaskRow({ task }) {
  const { title, status = 'To do', createdAt } = task;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : 'N/A';

  const statusClass = status
    ? status.toLowerCase().replace(' ', '-')
    : 'to-do';

  return (
    <tr className="task-row">
      <td>
        <NavLink to={`/task/${task.id}`} className="task-title-link">
          {title || 'Senza titolo'}
        </NavLink>
      </td>
      <td className={`status-cell status-${statusClass}`}>
        {status || 'To do'}
      </td>
      <td>{formattedDate}</td>
    </tr>
  );
}

export default memo(TaskRow);