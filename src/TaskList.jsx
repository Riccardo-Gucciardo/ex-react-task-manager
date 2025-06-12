// src/components/TaskList.jsx
import { useContext } from 'react';
import { GlobalContext } from './context/GlobalContext';

function TaskList() {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('TaskList deve essere usato all\'interno di un GlobalContextProvider');
  }

  const { tasks, deleteTask } = context;

  return (
    <div className="container">
      <h1>Lista dei Task</h1>
      {tasks.length === 0 ? (
        <p>Nessun task disponibile.</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-item">
              <span>{task.title}</span>
              <button onClick={() => deleteTask(task.id)}>Elimina</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;