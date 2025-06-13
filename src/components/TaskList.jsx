// src/TaskList.jsx
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import TaskRow from './TaskRow'

function TaskList() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('TaskList deve essere usato all\'interno di un GlobalContextProvider');
  }
  const { tasks } = context;

  return (
    <div className="container">
      <h1>Lista Task</h1>
      {tasks.length === 0 ? (
        <p>Nessun task disponibile. Aggiungine uno nuovo!</p>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Stato</th>
              <th>Data di Creazione</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TaskList;