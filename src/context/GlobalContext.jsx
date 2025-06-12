import { createContext } from 'react'; // Non più useState e useEffect qui
import useTasks from '../custom hook/useTasks';

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  // Utilizza il custom hook useTasks per gestire lo stato e le funzioni
  const { tasks, addTask, removeTask, updateTask } = useTasks();

  return (
    <GlobalContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
      {children}
    </GlobalContext.Provider>
  );
}