// src/TaskList.jsx
import { useContext, useState, useMemo } from 'react'; 
import { GlobalContext } from '../context/GlobalContext';
import TaskRow from './TaskRow'; 

function TaskList() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('TaskList deve essere usato all\'interno di un GlobalContextProvider');
  }
  const { tasks } = context;

  const [sortBy, setSortBy] = useState('createdAt'); 
  const [sortOrder, setSortOrder] = useState(1);

  // Funzione per gestire il click sull'intestazione della colonna
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(prevOrder => -prevOrder);
    } else {
      setSortBy(column);
      setSortOrder(1);
    }
  };

  const sortedTasks = useMemo(() => {
    const sortableTasks = [...tasks]; 

    sortableTasks.sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'title') {
        // Ordinamento alfabetico 
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === 'status') {
        // Ordinamento per stato 
        const statusOrder = { "To do": 1, "Doing": 2, "Done": 3 };
        comparison = statusOrder[a.status] - statusOrder[b.status];
      } else if (sortBy === 'createdAt') {
        // Ordinamento per data di creazione 
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        comparison = dateA - dateB;
      }
      
      // (crescente o decrescente)
      return comparison * sortOrder;
    });

    return sortableTasks;
  }, [tasks, sortBy, sortOrder]); 

  return (
    <div className="container">
      <h1>Lista Task</h1>
      {tasks.length === 0 ? (
        <p>Nessun task disponibile. Aggiungine uno nuovo!</p>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              {/* Intestazioni delle colonne rese cliccabili */}
              <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                Nome 
                {/* Indicatore visivo della direzione di ordinamento */}
                {sortBy === 'title' && (sortOrder === 1 ? ' ↑' : ' ↓')}
              </th>
              <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                Stato
                {sortBy === 'status' && (sortOrder === 1 ? ' ↑' : ' ↓')}
              </th>
              <th onClick={() => handleSort('createdAt')} style={{ cursor: 'pointer' }}>
                Data di Creazione
                {sortBy === 'createdAt' && (sortOrder === 1 ? ' ↑' : ' ↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Mappiamo l'array di task ordinato */}
            {sortedTasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TaskList;