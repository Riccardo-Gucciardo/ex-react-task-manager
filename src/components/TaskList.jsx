// src/TaskList.jsx
import { useContext, useState, useMemo, useCallback, useRef } from 'react';
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


  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  

  const searchInputRef = useRef(null); 
  const debounceTimerRef = useRef(null);

  // Funzione di debounce per la ricerca
  const handleSearchChange = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const currentInputValue = searchInputRef.current ? searchInputRef.current.value : '';
      setDebouncedSearchQuery(currentInputValue);
    }, 500);
  }, []);

  // Gestore per l'ordinamento delle colonne
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(prevOrder => -prevOrder);
    } else {
      setSortBy(column);
      setSortOrder(1);
    }
  };


  const filteredAndSortedTasks = useMemo(() => {
    let processableTasks = [...tasks]; 

    // Filtraggio
    if (debouncedSearchQuery) {
      const lowerCaseQuery = debouncedSearchQuery.toLowerCase();
      processableTasks = processableTasks.filter(task =>
        task.title.toLowerCase().includes(lowerCaseQuery)
      );
    }

    // Ordinamento
    processableTasks.sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === 'status') {
        const statusOrder = { "To do": 1, "Doing": 2, "Done": 3 };
        comparison = statusOrder[a.status] - statusOrder[b.status];
      } else if (sortBy === 'createdAt') {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        comparison = dateA - dateB;
      }
      
      return comparison * sortOrder;
    });

    return processableTasks;
  }, [tasks, debouncedSearchQuery, sortBy, sortOrder]);

  return (
    <div className="container">
      <h1>Lista Task</h1>

      {/* Input di ricerca */}
      <div className="search-bar">
        <input
          type="text"
          ref={searchInputRef}
          placeholder="Cerca task per nome..."
          onChange={handleSearchChange}
        />
      </div>

      {tasks.length === 0 ? (
        <p>Nessun task disponibile. Aggiungine uno nuovo!</p>
      ) : (
        <>
          {/* Messaggio se la ricerca non trova risultati */}
          {filteredAndSortedTasks.length === 0 && debouncedSearchQuery !== '' ? (
            <p>Nessun task corrispondente a "{debouncedSearchQuery}" trovato.</p>
          ) : (
            <table className="task-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                    Nome 
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
                {/* Mappa i task filtrati e ordinati */}
                {filteredAndSortedTasks.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

export default TaskList;